const ss = (sheetIdFromFunction) =>
  SpreadsheetApp.openById(sheetIdFromFunction);
const timeStamp = Utilities.formatDate(
  new Date(),
  "GMT+7",
  "yyyy-MM-dd' 'HH:mm:ss"
);
const userEmail = Session.getActiveUser().getEmail();
const getSheetsName = (sheetId) => {
  const data = ss(sheetId)
    .getSheets()
    .map((sheet) => sheet.getName())
    .sort((a, b) => {
      // Extract numerical parts from strings
      const numA = parseInt(a.match(/^\d+/)[0]);
      const numB = parseInt(b.match(/^\d+/)[0]);

      // Compare the numerical parts
      return numA - numB;
    });
  return data;
};

const listSheetInformation = {
  "validasi-1": {
    sheetId: "1-I9nYqxG9Gmv3YXjd1gXHBxF4RhBwNMSciG1TguVpuI",
    sheetUploadData: "0. Validasi 1",
    sheetUploadImage: "1. Dokumentasi Validasi 1",
    folderUploadImage: "1S7bMu9XpHAMi_A-Dy8V1ztz2zJRFazW7",
    orderedKeyUploadData: [
      "nama",
      "lead_id",
      "area",
      "komoditas",
      "nomor_kolam",
      "jenis_kolam",
      "suhu",
      "dissolved_oxygen",
      "ph",
      "tds",
      "lokasi_kolam",
      "luas",
      "kedalaman",
      "sumber_air",
      "debit_air",
      "padat_tebar",
      "hystorical_pond_cycle",
      "hystorical_pond_commodity",
      "numeric_historikal_tebaran",
      "satuan_tebaran",
      "numeric_historikal_panen",
      "historikal_doc",
      "farmer_status",
      "apakah_kolam_kosong",
      "apakah_koperatif",
      "apakah_ada_kandang_hewan",
      "apakah_dekat_jurang",
      "apakah_dekat_jalan",
      "apakah_dekat_pemukiman",
      "apakah_banyak_predator",
      "apakah_ada_listrik",
      "apakah_pasang_feeder",
      "pond_id",
      "sumber_benih",
    ],
    columnRanges: {
      area: "A2:A",
      "list-petani": "B2:C",
      "jenis-kolam": "F2:F",
      komoditas: "G2:G",
      "sumber-air": "H2:H",
      "debit-air": "I2:I",
      "sumber-benih": "M2:M",
      "historikal-siklus": "J2:J",
      "historikal-komoditas": "K2:K",
      "satuan-tebaran": "N2:N",
      "farmer-status": "L2:L",
    },
  },
  "validasi-midway": {
    sheetId: "1IvGa6UyquKiUCb75TiyKS6AlUTDnkMp3MBYC77sIjlM",
    sheetUploadData: "0. Validasi midway",
    sheetUploadImage: "1. Dokumentasi validasi midway",
    folderUploadImage: "1ZOpeW_R5wWI3cAHI84yoSJ5x20Ya3iZJ",
    orderedKeyUploadData: [
      "nama",
      "lead_id",
      "area",
      "nomor_kolam",
      "komoditas",
      "tanggal_tebar",
      "numeric_tebaran",
      "satuan_tebaran",
      "estimasi_siap_panen",
      "satuan_waktu",
      "numeric_estimasi_panen",
      "apakah_sedang_wabah",
      "apakah_ikan_kuntet",
      "apakah_ada_buyer",
      "numeric_harga_buyer",
      "kontak_buyer",
      "pond_id",
      "apakah_bisa_sampling",
      "bobot_sampling_ikan",
    ],
    columnRanges: {
      area: "A2:A",
      "list-petani": "B2:C",
      "nomor-kolam": "D2:F",
      komoditas: "G2:G",
    },
  },
  "validasi-2": {
    sheetId: "11rvPeZyTncgdfAWk8SnGmv7vYPm-yg5fy52Obpnsi-E",
    sheetUploadData: "2. Data validasi 2",
    sheetUploadImage: "3. Dokumentasi validasi 2",
    folderUploadImage: "1dn-aM6Wa53JlSWtoK2F2_YS9d3iRAaNV",
    orderedKeyUploadData: [
      "nama",
      "lead_id",
      "area",
      "nomor_kolam",
      "status_kesiapan_kolam",
      "status_kesiapan_kolam_lainnya",
      "estimasi_siap_tebar",
      "satuan_waktu",
      "setFormulaEstimasiTanggalSiapTebar",
    ],
    columnRanges: {
      area: "A2:A",
      "list-petani": "B2:C",
      "nomor-kolam": "D2:F",
      "status-kesiapan-kolam": "G2:G",
    },
    setFormulaEstimasiTanggalSiapTebar: function (sheet, row, col) {
      sheet.getRange(row, col).setFormula(
        `=if(A${row}="","",
        if(H${row}="Kolam cancel","",
        if(K${row}="-",C${row},INT(C${row}+if(K${row}="hari",J${row}*1,if(K${row}="minggu",J${row}*7,J${row}*30))))))`
      );
    },
  },
  "monitoring-tebar": {
    sheetId: "1qfKDhgIq7y4v6lsbdA24fLH3Ode9SjHED-rV9XDnAmQ",
    sheetUploadData: "0. Data monitoring tebar",
    sheetUploadImage: "1. Dokumentasi monitoring tebar",
    folderUploadImage: "1_-06NknaSxtiIvyb_TZat6RACxjIRIEX",
    orderedKeyUploadData: [
      "nama",
      "lead_id",
      "area",
      "komoditas",
      "nomor_kolam",
      "tanggal_tebar",
      "wadah_benih",
      "jumlah_wadah_benih",
      "total_benih_per_kolam",
      "sampling_benih",
      "apakah_midway",
      "apakah_benih_efishery",
    ],
    columnRanges: {
      area: "A2:A",
      "list-petani": "B2:C",
      "nomor-kolam": "D2:F",
      komoditas: "G2:G",
      "wadah-benih": "H2:H",
    },
  },
  "monitoring-stok-pakan": {
    sheetId: "1by32xo9MoACo8ZViAdidIRqYiBfUwXtJf1jnGowc8Gk",
    sheetUploadData: "0. Data Stok Pakan",
    sheetUploadImage: "1. Dokumentasi Stok Pakan",
    folderUploadImage: "1DaA8U4MQewkr-XtDautEFRPix8tlVHS7",
    orderedKeyUploadData: [
      "nama",
      "lead_id",
      "area",
      "tanggal_cek_pakan",
      "sku_pakan_1",
      "qty_pakan_1",
      "qty_pakan_1_open",
      "sku_pakan_2",
      "qty_pakan_2",
      "qty_pakan_2_open",
      "sku_pakan_3",
      "qty_pakan_3",
      "qty_pakan_3_open",
      "sku_pakan_4",
      "qty_pakan_4",
      "qty_pakan_4_open",
      "keterangan",
    ],
    columnRanges: {
      area: "A2:A",
      "list-petani": "B2:C",
      "sku-pakan": "I2:I",
    },
  },
  "monitoring-budidaya": {
    sheetId: "1g8O_p2w7bAgBHTtMjTy1x_mzyaUYA2IVgyeZk00XtlM",
    sheetUploadData: "0. Data monitoring budidaya",
    sheetUploadImage: "1. Dokumentasi monitoring budidaya",
    folderUploadImage: "1cd8J8OuTgNXdPKiB4avE5QCYju3APdFE",
    orderedKeyUploadData: [
      "nama",
      "lead_id",
      "area",
      "nomor_kolam",
      "tanggal_cek_budidaya",
      "kondisi_budidaya",
      "apakah_ada_kematian",
      "jumlah_kematian_ikan",
      "satuan_kuantitas",
      "apakah_mencatat_pakan",
      "keterangan",
    ],
    columnRanges: {
      area: "A2:A",
      "list-petani": "B2:C",
      "nomor-kolam": "D2:F",
      "kondisi-budidaya": "G2:G",
    },
  },
};
