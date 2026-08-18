# Elmyra Digital — Sistem Template, Katalog, Customer & Masa Aktif

## 1. Template master
Template demo disimpan terpisah di folder `undangan/`, contoh:

- `undangan/template-02/`

Jangan ubah template master untuk setiap customer.

## 2. Katalog otomatis
Daftar katalog beranda dibaca dari:

- `assets/data/catalog.json`

Untuk menambah desain baru, tambahkan satu object baru ke file tersebut. `index.html` tidak perlu diedit lagi.

## 3. Customer terpisah
Setiap customer mempunyai data sendiri:

- `customers/nama-pria-nama-wanita/data.json`

Contoh link customer:

- `https://elmyradigital.my.id/invite/nama-pria-nama-wanita/`

Walaupun 10 customer memakai template yang sama, data mereka tidak bentrok karena setiap slug/folder berbeda.

## 4. Masa aktif
Di `data.json` customer:

```json
{
  "slug": "raka-alya",
  "template": "template-02",
  "permanent": false,
  "activeUntil": "2026-09-19T23:59:59+07:00"
}
```

Jika melewati `activeUntil`, `_worker.js` otomatis menampilkan halaman bahwa undangan sudah tidak aktif.

Untuk memperpanjang masa aktif, cukup ubah `activeUntil`. Link customer tetap sama.

Untuk demo katalog yang tidak kedaluwarsa, gunakan:

```json
"permanent": true
```

## 5. Data customer
Satu file customer dapat berisi nama pengantin, orang tua, tanggal, lokasi, rekening, foto, galeri, dan musik. File `assets/js/customer-loader.js` memasukkan data tersebut ke Template 02 saat link customer dibuka.

## 6. Deploy Cloudflare Direct Upload
ZIP produksi harus menyertakan semuanya:

```bash
cd ~/elmyra-digital
git pull origin main
rm -f elmyra-digital-full.zip
zip -r elmyra-digital-full.zip index.html _worker.js assets undangan customers
cp elmyra-digital-full.zip /storage/emulated/0/Download/
```

Upload ZIP terbaru melalui Cloudflare Pages Direct Upload.
