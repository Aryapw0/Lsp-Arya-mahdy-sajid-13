import { useState, useEffect } from "react";
import TableSiswa from "./components/TableSiswa";
import FormSiswa from "./components/FormSiswa";
import { getSiswa, tambahSiswa, updateSiswa, hapusSiswa } from "./api";

function App() {
  const [siswa, setSiswa] = useState([]);
  const [editData, setEditData] = useState(null);

  const muatData = async () => {
    try {
      const res = await getSiswa();
      setSiswa(res.data);
    } catch (err) {
      console.error("Gagal memuat data:", err);
    }
  };

  useEffect(() => {
    muatData();
  }, []);

  const handleSimpan = async (data) => {
    try {
      if (editData) {
        await updateSiswa(editData.id, data);
        setEditData(null);
      } else {
        await tambahSiswa(data);
      }
      muatData();
    } catch (err) {
      console.error("Gagal menyimpan:", err);
    }
  };

  const handleHapus = async (id) => {
    if (!confirm("Hapus data ini?")) return;
    try {
      await hapusSiswa(id);
      muatData();
    } catch (err) {
      console.error("Gagal menghapus:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Daftar Siswa</h1>
      <FormSiswa
        siswaEdit={editData}
        onSimpan={handleSimpan}
        onBatal={() => setEditData(null)}
      />
      <TableSiswa siswa={siswa} onEdit={setEditData} onHapus={handleHapus} />
    </div>
  );
}

export default App;