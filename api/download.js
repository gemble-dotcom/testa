// api/download.js
const { exec } = require('child_process');

export default function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    // Call the Python script with the video URL
    exec(`python3 yt_dlp_script.py "${url}"`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: `Error: ${error.message}` });
        }
        if (stderr) {
            return res.status(500).json({ error: `Stderr: ${stderr}` });
        }
        // stdout will contain the direct URL of the media file
        res.status(200).json({ mediaUrl: stdout.trim() });
    });
}
