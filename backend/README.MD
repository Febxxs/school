# 🚀 Belajar Express & Sequelize

Proyek ini dibuat sebagai bagian dari proses belajar saya untuk membangun backend menggunakan **Express.js** dan mengelola database MySQL dengan **Sequelize ORM**. Nantinya proyek ini juga akan terhubung ke frontend yang dibuat dengan React.

---

## 📋 Langkah-langkah Penggunaan

### 1. Clone repository

```bash
git clone https://github.com/username/nama-repo.git
cd nama-repo
```

---

### 2. Install dependencies

```bash
npm install
```

---

## ⚙️ Setup Sequelize

### 3. Install Sequelize CLI dan driver MySQL

```bash
npm install sequelize sequelize-cli mysql2
```

### 4. Inisialisasi Sequelize

```bash
npx sequelize-cli init
```

Ini akan membuat struktur direktori berikut:

```
config/
models/
migrations/
seeders/
```

---

### 5. Konfigurasi database

Edit file `config/config.js` sesuai pengaturan MySQL kamu:

```js
module.exports = {
  development: {
    username: "root",
    password: "yourpassword",
    database: "belajar_express_db",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
```

Lalu buat database-nya di MySQL:

```sql
CREATE DATABASE belajar_express_db;
```

---

### 6. Generate model dan migration

Sebagai contoh, kita buat model `Category`:

```bash
npx sequelize-cli model:generate --name Category --attributes name:string,description:text
```

---

### 7. Jalankan migrasi

```bash
npx sequelize-cli db:migrate
```

---

### 8. Menambahkan data awal (Seeder)

#### a. Generate seeder

```bash
npx sequelize-cli seed:generate --name demo-category
```

#### b. Edit file seeder

Contoh isi `seeders/[timestamp]-demo-category.js`:

```js
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Categories", [
      {
        name: "Elektronik",
        description: "Kategori untuk produk elektronik",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pakaian",
        description: "Kategori untuk produk pakaian",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
```

#### c. Jalankan seeder

```bash
npx sequelize-cli db:seed:all
```

---

### 9. Jalankan server

```bash
npm run dev
```

> Pastikan `package.json` kamu sudah memiliki script berikut:

```json
"scripts": {
  "dev": "nodemon index.js"
}
```

---

## 📌 Catatan

- Pastikan MySQL berjalan di komputer kamu.
- Gunakan file `.env` (opsional) untuk menyimpan variabel seperti `DB_USER`, `DB_PASS`, dll.
- Semua langkah di atas bisa kamu ulang untuk membuat model-model lainnya seperti `User`, `Product`, dll.

---

## 🙌 Kontribusi

Proyek ini dibuat untuk pembelajaran pribadi. Kamu bebas mengembangkan atau menyempurnakannya sesuai kebutuhan. Jika ingin berkontribusi, silakan buat pull request!

---

## 📝 Lisensi

MIT License © 2025 – Dibuat oleh \[Nama Kamu]
