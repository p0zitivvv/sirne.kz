import re

MENU_FILE = "src/data/menu.ts"

CATEGORY_IMAGES = {
    'breakfasts': 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=600&auto=format&fit=crop',
    'salads': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop',
    'pastry': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop',
    'soups': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=600&auto=format&fit=crop',
    'signature': 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
    'cat_6': 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=600&auto=format&fit=crop',
    'steaks': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=600&auto=format&fit=crop',
    'pasta': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=600&auto=format&fit=crop',
    'lagman': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600&auto=format&fit=crop',
    'hot': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=600&auto=format&fit=crop',
    'garnish': 'https://images.unsplash.com/photo-1585692015091-6e4c76d299d6?q=80&w=600&auto=format&fit=crop',
    'kids': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop',
    'fastfood': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop',
    'grill': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop',
    'grill_assorti': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop',
    'desserts': 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600&auto=format&fit=crop',
    'national_drinks': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop',
    'tea_coffee': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop',
    'lemonades': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop',
    'cold_drinks': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=600&auto=format&fit=crop',
    'company': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop',
    'assorti': 'https://images.unsplash.com/photo-1590412200988-a436970781fa?q=80&w=600&auto=format&fit=crop'
}

DEFAULT_FOOD_IMAGE = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop"

with open(MENU_FILE, "r", encoding="utf-8") as f:
    content = f.read()

items_str_match = re.search(r"export const menuItems: MenuItem\[\] = \[(.*?)\];", content, re.DOTALL)
if not items_str_match:
    print("Could not find menuItems array.")
    exit(1)

items_str = items_str_match.group(1)

cat_pattern = re.compile(r"category:\s*['\"]([^'\"]+)['\"]")
img_pattern = re.compile(r",\s*image:\s*['\"][^'\"]*?['\"]")

modified_items_str = items_str
count = 0

blocks = re.finditer(r"\{[^{}]*\}", items_str)
for block_match in blocks:
    block = block_match.group(0)
    
    # Check category
    cat_m = cat_pattern.search(block)
    if cat_m:
        cat_id = cat_m.group(1)
        image_url = CATEGORY_IMAGES.get(cat_id, DEFAULT_FOOD_IMAGE)
        
        # Remove old image property if it exists
        new_block = img_pattern.sub("", block)
        
        # Add new image property
        new_block = new_block.replace(" }", f", image: '{image_url}' }}")
        
        modified_items_str = modified_items_str.replace(block, new_block)
        count += 1

new_content = content.replace(items_str, modified_items_str)
with open(MENU_FILE, "w", encoding="utf-8") as f:
    f.write(new_content)

print(f"Finished. Curated images assigned to {count} items.")
