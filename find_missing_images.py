import re

MENU_FILE = "src/data/menu.ts"

with open(MENU_FILE, "r", encoding="utf-8") as f:
    content = f.read()

# Pattern to find all menu item blocks
# { id: 'i1', nameKz: '...', nameRu: '...', price: ..., description: '...', category: '...', image: '...' }
# We need to handle blocks both with and without images

blocks = re.findall(r"(\{\s*id:\s*'i\d+',\s*nameKz:[^}]*\})", content)

missing = []
for block in blocks:
    if "image:" not in block:
        item_id = re.search(r"id:\s*'([^']+)'", block).group(1)
        name_ru = re.search(r"nameRu:\s*'([^']+)'", block).group(1)
        missing.append((item_id, name_ru))

print(f"Total missing: {len(missing)}")
for m in missing:
    print(f"{m[0]}: {m[1]}")
