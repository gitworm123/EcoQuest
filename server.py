#!/usr/bin/env python3
"""
EcoQuest – Gamified Environmental Education Platform for Schools and Colleges
College Environmental Project (CEP) Local Web Server
"""

import http.server
import socketserver
import os
import sys
import webbrowser
import threading
import time

PORT = 5000
HOST = "localhost"

class EcoQuestHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS and caching headers for optimal local presentation
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, format, *args):
        # Clean terminal logging
        sys.stdout.write(f"[{time.strftime('%H:%M:%S')}] {args[0]} {args[1]}\n")

def open_browser(url):
    time.sleep(1.2)
    print(f"\n🚀 Opening default browser at {url} ...\n")
    webbrowser.open(url)

def main():
    # Ensure working directory is the script folder
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)

    server_address = ("", PORT)
    socketserver.TCPServer.allow_reuse_address = True

    try:
        with socketserver.TCPServer(server_address, EcoQuestHTTPRequestHandler) as httpd:
            url = f"http://{HOST}:{PORT}"
            print("=" * 70)
            print("🌿 EcoQuest – Gamified Environmental Education Platform")
            print("   CEP Project Demonstration Server")
            print("=" * 70)
            print(f"Server successfully started at: {url}")
            print(f"Document Root: {script_dir}")
            print("Press Ctrl+C to terminate the server.\n")

            # Launch browser in separate thread
            threading.Thread(target=open_browser, args=(url,), daemon=True).start()

            httpd.serve_forever()
    except OSError as e:
        if e.errno == 98 or e.errno == 10048:
            alt_port = 8080
            print(f"Port {PORT} is busy, attempting alternative port {alt_port}...")
            server_address = ("", alt_port)
            with socketserver.TCPServer(server_address, EcoQuestHTTPRequestHandler) as httpd:
                url = f"http://{HOST}:{alt_port}"
                print(f"Server successfully started at: {url}")
                threading.Thread(target=open_browser, args=(url,), daemon=True).start()
                httpd.serve_forever()
        else:
            raise e
    except KeyboardInterrupt:
        print("\n🛑 EcoQuest server stopped gracefully. Thank you!")
        sys.exit(0)

if __name__ == "__main__":
    main()
