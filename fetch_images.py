import os
import re
import time
import shutil
from bing_image_downloader import downloader

MENU_FILE = "src/data/menu.ts"
IMAGE_DIR = "public/images/menu"
TEMP_DIR = "temp_images"

if not os.path.exists(IMAGE_DIR):
    os.makedirs(IMAGE_DIR)

with open(MENU_FILE, "r", encoding="utf-8") as f:
    content = f.read()

items_str_match = re.search(r"export const menuItems: MenuItem\[\] = \[(.*?)\];", content, re.DOTALL)
if not items_str_match:
    print("Could not find menuItems array.")
    exit(1)

items_str = items_str_match.group(1)

id_pattern = re.compile(r"id:\s*['\"]([^'\"]+)['\"]")
name_pattern = re.compile(r"nameRu:\s*['\"]([^'\"]+)['\"]")
img_pattern = re.compile(r"image:\s*['\"]([^'\"]+)['\"]")

modified_items_str = items_str
count = 0

print("Starting to fetch images via bing-image-downloader...")

blocks = re.finditer(r"\{[^{}]*\}", items_str)
for block_match in blocks:
    if count >= 30: # Limit for now to prevent long execution times
        break

    block = block_match.group(0)
    id_m = id_pattern.search(block)
    name_m = name_pattern.search(block)
    
    if id_m and name_m:
        item_id = id_m.group(1)
        name = name_m.group(1)
        
        has_image = img_pattern.search(block)
        
        if not has_image:
            image_path = f"/images/menu/{item_id}.jpg"
            local_path = f"{IMAGE_DIR}/{item_id}.jpg"
            
            if not os.path.exists(local_path):
                query = f"{name} еда ресторан фото высокое качество"
                print(f"Fetching for {name}...")
                try:
                    downloader.download(query, limit=1, output_dir=TEMP_DIR, adult_filter_off=True, force_replace=True, timeout=15)
                    # Find downloaded image
                    downloaded_folder = os.path.join(TEMP_DIR, query)
                    if os.path.exists(downloaded_folder):
                        files = os.listdir(downloaded_folder)
                        if files:
                            # Move and rename
                            src_file = os.path.join(downloaded_folder, files[0])
                            # Sometimes images are weird extensions, we'll just save as .jpg for simplicity
                            # or keep original extension. Better to keep original
                            ext = os.path.splitext(files[0])[1]
                            if not ext:
                                ext = '.jpg'
                            final_local_path = f"{IMAGE_DIR}/{item_id}{ext}"
                            image_path = f"/images/menu/{item_id}{ext}"
                            
                            shutil.copy(src_file, final_local_path)
                            success = True
                        else:
                            success = False
                    else:
                        success = False
                except Exception as e:
                    print(f"Failed to fetch {name}: {e}")
                    success = False
            else:
                success = True
                
            if success:
                # Add image property
                new_block = re.sub(r"\s*\}$", f",\n        image: '{image_path}'\n    }}", block)
                modified_items_str = modified_items_str.replace(block, new_block)
                count += 1

new_content = content.replace(items_str, modified_items_str)
with open(MENU_FILE, "w", encoding="utf-8") as f:
    f.write(new_content)

print(f"Finished. Updated {count} items.")
