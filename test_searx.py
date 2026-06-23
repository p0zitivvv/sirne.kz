import requests

url = "https://searx.be/search"
params = {
    "q": "Казахский завтрак блюдо еда",
    "format": "json",
    "categories": "images"
}
try:
    r = requests.get(url, params=params, timeout=10)
    data = r.json()
    if 'results' in data and len(data['results']) > 0:
        print("Success!", data['results'][0]['img_src'])
    else:
        print("No results")
except Exception as e:
    print("Error:", e)
