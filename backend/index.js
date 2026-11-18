const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_siswa",
  dateStrings: true,
});


app.post("/api/siswa", async (req, res) => {
  try {
    const { kode_siswa, nama_siswa, alamat_siswa, tanggal_siswa, jurusan_siswa } = req.body;
    const [hasil] = await db.query(
      "INSERT INTO siswa (kode_siswa, nama_siswa, alamat_siswa, tanggal_siswa, jurusan_siswa) VALUES (?, ?, ?, ?, ?)",
      [kode_siswa, nama_siswa, alamat_siswa, tanggal_siswa, jurusan_siswa]
    );
    res.status(201).json({ id: hasil.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ pesan: err.message });
  }
});

app.put("/api/siswa/:id", async (req, res) => {
  try {
    const { kode_siswa, nama_siswa, alamat_siswa, tanggal_siswa, jurusan_siswa } = req.body;
    await db.query(
      "UPDATE siswa SET kode_siswa=?, nama_siswa=?, alamat_siswa=?, tanggal_siswa=?, jurusan_siswa=? WHERE id=?",
      [kode_siswa, nama_siswa, alamat_siswa, tanggal_siswa, jurusan_siswa, req.params.id]
    );
    res.json({ pesan: "Data diperbarui" });
  } catch (err) {
    res.status(500).json({ pesan: err.message });
  }
});

app.delete("/api/siswa/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM siswa WHERE id=?", [req.params.id]);
    res.json({ pesan: "Data dihapus" });
  } catch (err) {
    res.status(500).json({ pesan: err.message });
  }
});

app.get("/api/siswa", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM siswa");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ pesan: err.message });
  }
});

app.listen(3000, () => console.log("Server jalan di http://localhost:3000"));