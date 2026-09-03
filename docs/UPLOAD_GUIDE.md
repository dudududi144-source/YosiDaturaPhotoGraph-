# העלאת התוכן האמיתי שלך לאתר / Uploading Your Originals

המערכת מוכנה לקלוט את התיקיות האמיתיות שלך ולפרסם אותן ברמה הגבוהה ביותר - אוטומטית.

## איך עובדים (5 דקות)

1. פתח בריפו את התיקייה `public/inbox/`.
2. העלה תת-תיקייה לכל סדרה, בשם שמכיל את מזהה הסדרה:
   - `public/inbox/azure/`  -> תמונות הסדרה AZURE VIBRANCE
   - `public/inbox/desert/` -> ETERNAL DESERT
   - `public/inbox/gilded/`, `eternity/`, `silent/`, `crimson/`, `urban/`, `wild/`
   - `public/inbox/artist/` -> פורטרט שלך
   - `public/inbox/studio/` -> תמונות סטודיו / BTS
   - `public/inbox/cover/`  -> תמונת השער (ה-Hero)
3. בתוך כל תיקייה - פשוט זרוק את הקבצים המקוריים מהמצלמה/Canva בכל שם.
   הסדר הסופי ייקבע לפי סדר אלפביתי של שמות הקבצים (IMG_001, IMG_002...).
4. בצע commit ל-main.

## מה קורה אוטומטית

- GitHub Actions מריץ את `scripts/ingest.mjs` (sharp):
  סיבוב לפי EXIF, הגבלת רוחב 1600, JPEG progressive באיכות 86, הסרת מטא-דאטה.
- התוצאה נשמרת ל-`public/assets/y/<series>-<n>.jpg` - בדיוק השמות שהאתר קורא.
- ה-inbox מתנקה, וה-commit חוזר ל-main אוטומטית.
- דיפלוי ל-Pages רץ מיד אחרי.

## למה זה נכון

- המקור נשאר שלך, באיכות מלאה, בלי עיבוד ידני.
- האתר מקבל גרסה ממוטבת ומהירה (משקל נמוך, חדות גבוהה).
- אפס שינויי קוד - רק זריקת קבצים.

---

The system auto-optimizes anything you drop in public/inbox/<series>/.
Folder name maps to series id; files sorted alphabetically become <series>-1.jpg, -2.jpg...
A GitHub Action (sharp) rotates by EXIF, caps width at 1600, exports progressive JPEG q86,
commits results back to main and clears the inbox. Zero code changes needed.
