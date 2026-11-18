import { useState, useEffect } from "react";

const kosong = {
  kode_siswa: "",
  nama_siswa: "",
  alamat_siswa: "",
  tanggal_siswa: "",
  jurusan_siswa: "",
};

function FormSiswa({ siswaEdit, onSimpan, onBatal }) {
  const [form, setForm] = useState(kosong);

  useEffect(() => {
    setForm(siswaEdit || kosong);
  }, [siswaEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSimpan(form);
    setForm(kosong);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input name="kode_siswa" placeholder="Kode" value={form.kode_siswa} onChange={handleChange} required />
      <input name="nama_siswa" placeholder="Nama" value={form.nama_siswa} onChange={handleChange} required />
      <input name="alamat_siswa" placeholder="Alamat" value={form.alamat_siswa} onChange={handleChange} required />
      <input name="tanggal_siswa" type="date" value={form.tanggal_siswa} onChange={handleChange} required />
      <input name="jurusan_siswa" placeholder="Jurusan" value={form.jurusan_siswa} onChange={handleChange} required />
      <button type="submit">{siswaEdit ? "Update" : "Tambah"}</button>
      {siswaEdit && <button type="button" onClick={onBatal}>Batal</button>}
    </form>
  );
}

export default FormSiswa;