import traceback
import io
import sys
sys.stdout.reconfigure(encoding='utf-8')
try:
    import docx
    doc = docx.Document(r'c:\Users\kuany\Desktop\сайт меню\Sirne_Menu_full.docx')
    text = '\n'.join([para.text for para in doc.paragraphs if para.text.strip()])
    open(r'c:\Users\kuany\Desktop\сайт меню\sirne-kz\menu-text.txt', 'w', encoding='utf-8').write(text)
    print('SUCCESS')
except Exception as e:
    traceback.print_exc()
