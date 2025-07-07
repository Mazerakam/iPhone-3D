import http.server 
import socketserver 
import os 
import urllib.parse 
 
class CustomHandler(http.server.SimpleHTTPRequestHandler): 
    def do_GET(self): 
        # Decode URL 
        path = urllib.parse.unquote(self.path) 
        # Remove leading slash 
        if path.startswith('/'): 
            path = path[1:] 
        # Handle root 
        if path == '' or path == '/': 
            path = 'index.html' 
        # Add .html extension if no extension and file exists 
        elif '.' not in os.path.basename(path): 
            html_path = path + '.html' 
            if os.path.exists(html_path): 
                path = html_path 
        # Update the path 
        self.path = '/' + path 
        # Call parent method 
        return super().do_GET() 
 
PORT = 8000 
Handler = CustomHandler 
 
with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd: 
    print(f"Serveur demarre sur le port {PORT}") 
    httpd.serve_forever() 
