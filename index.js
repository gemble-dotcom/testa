const express = require('express');
const { exec } = require('child_process');

const app = express();

// Example endpoint for getting the media URL from a YouTube video
app.get('/get-url', (req, res) => {
    const videoUrl = req.query.url;

    if (!videoUrl) {
        return res.status(400).send('No video URL provided');
    }

    // Use youtube-dl to fetch the media URL
    exec(`youtube-dl --get-url ${videoUrl}`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send(`Error: ${error.message}`);
        }
        if (stderr) {
            return res.status(500).send(`Error: ${stderr}`);
        }

        // Send the media URL as the response
        res.send({ mediaUrl: stdout.trim() });
    });
});

// Start the server (for local testing)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app; // Export for Vercel serverless function
