# BMG Materials Catalog

This document tracks all materials available in the BMG materials showcase. Update this file when adding new materials.

## Categories

Materials are organized by grade/tier:

| Grade | Tier | Description | Count |
|-------|------|-------------|-------|
| A++ | Premium | Premium Italian Marble | 7 |
| A+ | Luxury | Luxury Stone | 18 |
| A | Classic | Classic Stone | 10 |

**Total Materials: 35**

---

## A++ Grade (Premium Italian Marble)

| ID | Name | Folder | Image | Status |
|----|------|--------|-------|--------|
| calacatta | Calacatta | `Calacatta` | `689418096371ce8c1c2a1a10_Statuario-Bettogli.jpeg` | Active |
| calacatta-gold | Calacatta Gold | `Calacatta Gold` | `88FEkPwdgIzKKZb9XdqhZbmqwMnczooj5DCD5MbW.jpg` | Active |
| calacatta-borghini | Calacatta Borghini | `Calacatta Borghini` | `S__5488657.jpg` | Active |
| statuario | Statuario | `Statuario` | `b_Statuary_in_slab_gallery_2000x.webp` | Active |
| paonazzo | Paonazzo | `Paonazzo` | `Calacatta-Paonazzo-1600x3200-2_R_12_20.jpg` | Active |
| arabescato | Arabescato | `Arabescat` | `S__5496835.jpg` | Active |
| arabescato-corchia | Arabescato Corchia | `Arabescato Corchia` | `S__5496834.jpg` | Active |

## A+ Grade (Luxury Stone)

| ID | Name | Folder | Image | Status |
|----|------|--------|-------|--------|
| bianco-dolomiti | Bianco Dolomiti | `Bianco Dolomiti` | `5fecbb5362e9eac5956ea398_BIANCO DOLOMITI_1.jpg` | Active |
| thassos | Thassos | `thassos` | `marmo-bianco-Thassos.jpg` | Active |
| white-venus | White Venus | `white venus` | `venus-white-512x299.jpg` | Active |
| volakas | Volakas | `volakas` | `Volakas-slider-1024x547.jpg` | Active |
| sky-white | Sky White | `sky white` | `S__5505057.jpg` | Active |
| super-white | Super White | `super white` | `TVinzmeunu7BbY8YZtjzJLppl7qG5GivAJ0l34gu.jpg` | Active |
| panda-white | Panda White | `panda white` | `649a9e28ec96ee57105ccca2_PandaWhite.jpeg` | Active |
| lilac-marble | Lilac Marble | `lilac marble` | `S__5505058.jpg` | Active |
| pietra-grey | Pietra Grey | `Pietra Grey` | `pietra-grey.jpg` | Active |
| silver-shadow | Silver Shadow | `Silver Shadow` | `S__5505062.jpg` | Active |
| grigio-carnico | Grigio Carnico | `Grigio Carnico` | `slabs_GRIGIO_CARNICO_SLAB.jpg` | Active |
| cat-eye | Cat Eye | `cat eye` | `S__5505081.jpg` | Active |
| verde-alpi | Verde Alpi | `Verde Alpi` | `verde-alpi.jpeg` | Active |
| verde-guatemala | Verde Guatemala | `Verde Guatemala` | `images (5).jpeg` | Active |
| nero-marquina | Nero Marquina | `Nero Marquina` | `nero-marquinia-e1691662409680.jpg` | Active |
| black-marquina | Black Marquina | `Black Marquina` | `654465babddb25762b1d8692_MQB.jpg` | Active |
| black-forest | Black Forest | `Black Forest` | `S__5505093.jpg` | Active |
| titanium-black | Titanium Black | `Titanium Black ` | `S__5513242.jpg` | Active |

## A Grade (Classic Stone)

| ID | Name | Folder | Image | Status |
|----|------|--------|-------|--------|
| white-carrara | White Carrara | `white carrara ` | `close-up-white-marble-background.jpg` | Active |
| crema-marfil | Crema Marfil | `Crema Marfil` | `S__5505083.jpg` | Active |
| botticino | Botticino | `Botticino` | `botticino-classico-e1693303250808.jpg` | Active |
| daino-reale | Daino Reale | `Daino Reale` | `images (4).jpeg` | Active |
| perlato-sicilia | Perlato Sicilia | `Perlato Sicilia` | `S__5505085.jpg` | Active |
| emperador-light | Emperador Light | `Emperador Light` | `67dcfa200ce1a503421df590_LED.jpg` | Active |
| emperador-dark | Emperador Dark | `Emperador Dark` | `1662449233.jpg` | Active |
| tobacco-brown | Tobacco Brown | `Tobacco Brown` | `S__5505088.jpg` | Active |
| rosa-portogallo | Rosa Portogallo | `Rosa Portogallo` | `Roso-Portogalo.png` | Active |
| alaska-white | Alaska White | `Alaska White` | `S__5513259.jpg` | Active |

---

## Adding New Materials

To add a new material:

1. **Create image folder**: Add a new folder in `/public/Materials/` with the material name
2. **Add images**: Place material images in the folder (main image + gallery images)
3. **Update materials.json**: Add entry in `src/data/materials.json` under the appropriate category
4. **Add translations**: Update all translation files in `src/i18n/translations/{en,ar,th}.json`
5. **Update this document**: Add the new material to the appropriate grade section

### Required JSON structure in `materials.json`:

```json
{
  "id": "material-id",
  "image": "/Materials/Folder Name/main-image.jpg",
  "folder": "Folder Name"
}
```

### Required translation keys in each language file:

```json
"materials": {
  "items": {
    "material-id": {
      "name": "Material Name",
      "description": "Brief description of the material characteristics and uses."
    }
  }
}
```

---

## Color Reference

Materials by color family:

### White/Light
- Calacatta, Calacatta Gold, Calacatta Borghini, Statuario, Paonazzo
- Arabescato, Arabescato Corchia, Bianco Dolomiti, Thassos
- White Venus, Volakas, Sky White, Super White, Panda White
- White Carrara, Alaska White

### Beige/Cream
- Crema Marfil, Botticino, Daino Reale, Perlato Sicilia

### Brown
- Emperador Light, Emperador Dark, Tobacco Brown

### Grey
- Pietra Grey, Silver Shadow, Grigio Carnico, Cat Eye

### Green
- Verde Alpi, Verde Guatemala

### Black
- Nero Marquina, Black Marquina, Black Forest, Titanium Black

### Pink/Special
- Rosa Portogallo, Lilac Marble
