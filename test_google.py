import requests
from bs4 import BeautifulSoup
import re

query = "Казахский завтрак"
url = f"https://www.google.com/search?tbm=isch&q={query}"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}
try:
    r = requests.get(url, headers=headers)
    soup = BeautifulSoup(r.text, 'html.parser')
    imgs = soup.find_all('img')
    found = False
    for img in imgs:
        src = img.get('src') or img.get('data-src')
        if src and src.startswith('http'):
            print("Found image:", src)
            found = True
            break
    if not found:
        print("No image found.")
except Exception as e:
    print("Error:", e)
