import os
import shutil
import re

# Paths
SOURCE_DIR = r'c:\Users\kuany\Desktop\сайт меню\фотки еды'
TARGET_DIR = r'c:\Users\kuany\Desktop\сайт меню\sirne-kz\public\images\menu'
MENU_FILE = r'c:\Users\kuany\Desktop\сайт меню\sirne-kz\src\data\menu.ts'

# Ensure target directory exists
if not os.path.exists(TARGET_DIR):
    os.makedirs(TARGET_DIR)

# Get all images from source
source_files = os.listdir(SOURCE_DIR)
images = [f for f in source_files if f.lower().endswith(('.png', '.jpg', '.jpeg'))]

# Read menu file
with open(MENU_FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# Define mapping logic
# We'll try to match nameRu or nameKz with the filename
def clean_name(name):
    # Remove special chars and lowercase for better matching
    return re.sub(r'[^a-zA-Zа-яА-Я0-9\s]', '', name.lower()).strip()

# Manual mapping overrides or fuzzy matches
manual_matches = {
    'i1': 'Казахский завтрак.png',
    'i2': 'Шакшука.png',
    'i3': 'Английский завтрак.png',
    'i4': 'Омлет с шампиньонами.png',
    'i5': 'Рисовая каша.png',
    'i6': 'Пшённая каша.png',
    'i7': 'Овсяная каша.png',
    'i8': 'Блины.png',
    'i12': 'Ақ жүрек.png',
    'i19': 'салат с морепродуктами.png',
    'i20': 'Фруктовый салат от Шефа с авторским соусом.png',
    'i24': 'Брокколи с овощами.png',
    'i26': 'Руккола с креветками.png',
    'i31': 'Цезарь с курицей.png',
    'i32': 'Цезарь с семгой.png',
    'i33': 'Цезарь с креветками.png',
    'i34': 'рулет из баклажана и кабачка.png',
    'i35': 'Брокколи в кляре.png',
    'i36': 'Греческий салат.png',
    'i37': 'Гнездо Глухаря.png',
    'i40': 'Ачичук.png',
    'i41': 'Малибу.png',
    'i42': 'Свежий салат.png',
    'i43': 'Кавказ салаты.png',
    'i53': 'Мини самса с мясом.png',
    'i59': 'Домашние пельмени.png',
    'i60': 'Борщ.png',
    'i61': 'Уха по Финский.png',
    'i62': 'Уха по Царский.png',
    'i64': 'Шорпа.png',
    'i67': 'Суп лапша по-домашнему.png',
    'i68': 'Грибной крем суп.png',
    'i70': 'Мампар.png',
    'i71': 'Чечевичный крем суп.png',
    'i72': 'Суп из перепелки.png',
    'i73': 'Суп Номад.png',
    'i74': 'Нарын.png',
    'i79': 'Бешбармак.png',
    'i80': 'баранина в горшочке со сливками.png',
    'i81': 'Тесто, мясо, овощи.png',
    'i82': 'Куырдак из конины с картошкой.png',
    'i87': 'Костный мозг.png',
    'i88': 'Ми палау.png',
    'i89': '(Домашние колбаски из печени).png',
    'i91': 'Жаренных манты.png',
    'i92': 'Целебное блюдо из говяжьих ножек (лытки).png',
    'i94': 'Рибай.png',
    'i95': 'Стейк из семги.png',
    'i96': 'Хрустящий судак в икорном соусе.png',
    'i97': 'Томленные говяжьи ребрышки.png',
    'i98': 'Ассорти из домашних нолбасок с горчичным соусом.png',
    'i101': 'казахская паста с казы.png',
    'i103': 'Болоньезе.png',
    'i107': 'Гуйру ганфан.png',
    'i108': 'гуйру.png',
    'i109': 'Могуру.png',
    'i110': 'Бефстроганов.png',
    'i111': 'Курица в сливочном соусе.png',
    'i112': 'в горшочке с грибным соусом на сливках.png',
    'i113': 'колета с нежным расплавленным сыром и пюре.png',
    'i115': 'Казан кебаб.png',
    'i116': 'Фри с мясом.png',
    'i117': 'Бризоль.png',
    'i119': 'жаренный рамен.png',
    'i120': 'Езбе (Пюре).png',
    'i122': 'Фри.png',
    'i138': 'Пепперони.png',
    'i139': '4 ет  4 мясо.png',
    'i140': '4 сезона.png',
    'i174': 'Сникерс.png',
    'i175': 'Испанский чизкейк.png',
    'i178': 'Кымыз.png',
    'i179': 'Шубат.png',
    'i182': 'Кара шэй (Черный чай).png',
    'i183': 'Кек шэй (Зеленый чай).png',
    'i184': 'Сутпен шай 1л. (Чай с молоком 1л.).png',
    'i185': 'Шей сутпен 2л. (Чай с молоком 2л.).png',
    'i206': 'Мохито.png',
    'i207': 'Кулпынай мохитосы.png',
    'i232': 'Алма.png',
    'i233': 'Алма - Ca6i3.png',
    'i264': '(рыбное ассорти).png',
}

# Process each manual match
for item_id, filename in manual_matches.items():
    source_path = os.path.join(SOURCE_DIR, filename)
    if os.path.exists(source_path):
        target_filename = f"{item_id}.png"
        target_path = os.path.join(TARGET_DIR, target_filename)
        shutil.copy(source_path, target_path)
        
        # Update menu.ts
        # Pattern to find the item by id and update or add image property
        # Example line: { id: 'i1', ... }
        # Let's use a more robust regex to find the block for the specific id
        pattern = re.compile(rf"({{ id: '{item_id}',[^}}]*}})")
        match = pattern.search(content)
        if match:
            block = match.group(1)
            # Check if image property already exists
            if 'image:' in block:
                new_block = re.sub(r"image: '[^']*'", f"image: '/images/menu/{target_filename}'", block)
            else:
                new_block = block.replace(" }", f", image: '/images/menu/{target_filename}' }}")
            content = content.replace(block, new_block)

# Write updated menu file
with open(MENU_FILE, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")
