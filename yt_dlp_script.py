# yt_dlp_script.py
import sys
import subprocess

def main(video_url):
    try:
        # Run yt-dlp to get the media URL
        result = subprocess.run(['yt-dlp', '--get-url', video_url], capture_output=True, text=True)
        print(result.stdout.strip())  # Print the media URL
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python yt_dlp_script.py <video_url>")
        sys.exit(1)
    main(sys.argv[1])
