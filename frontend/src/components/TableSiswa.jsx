function TableSiswa({ siswa, onEdit, onHapus }) {
    return (
        <table border="1" cellPadding="8" style={{margin: "auto"}}>
            <thead>
                <tr>
                    <th>kode</th>
                    <th>nama</th>
                    <th>alamat</th>
                    <th>tanggal</th>
                    <th>jurusan</th>
                    <th>aksi</th>
                </tr>
            </thead>
            <tbody>
                {siswa.length  === 0 ? (
                    <tr>
                        <td colSpan="6" align="center">
                            Tidak ada data siswa
                        </td>
                    </tr>

                ) : (
                    siswa.map((s) => (
                        <tr key={s.id_siswa}>
                            <td>{s.kode_siswa}</td>
                            <td>{s.nama_siswa}</td>
                            <td>{s.alamat_siswa}</td>
                            <td>{s.tanggal_siswa}</td>
                            <td>{s.jurusan_siswa}</td>
                            <td>
                                <button onClick={() => onEdit(s)}>Edit</button>
                                <button onClick={() => onHapus(s.id)}>Hapus</button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}

export  default TableSiswa;