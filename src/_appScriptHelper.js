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
      "lead-id",
      "area",
      "komoditas",
      "nomor-kolam",
      "jenis-kolam",
      "suhu",
      "dissolved-oxygen",
      "ph",
      "tds",
      "lokasi-kolam",
      "luas",
      "kedalaman",
      "sumber-air",
      "debit-air",
      "padat-tebar",
      "hystorical-pond-cycle",
      "hystorical-pond-commodity",
      "numeric-historikal-tebaran",
      "satuan-tebaran",
      "numeric-historikal-panen",
      "historikal-doc",
      "farmer-status",
      "apakah-kolam-kosong",
      "apakah-koperatif",
      "apakah-ada-kandang-hewan",
      "apakah-dekat-jurang",
      "apakah-dekat-jalan",
      "apakah-dekat-pemukiman",
      "apakah-banyak-predator",
      "apakah-ada-listrik",
      "apakah-pasang-feeder",
      "pond-id",
      "sumber-benih",
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
      "lead-id",
      "area",
      "nomor-kolam",
      "komoditas",
      "tanggal-tebar",
      "numeric-tebaran",
      "satuan-tebaran",
      "estimasi-siap-panen",
      "satuan-waktu",
      "numeric-estimasi-panen",
      "apakah-sedang-wabah",
      "apakah-ikan-kuntet",
      "apakah-ada-buyer",
      "numeric-harga-buyer",
      "kontak-buyer",
      "pond-id",
      "apakah-bisa-sampling",
      "bobot-sampling-ikan",
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
      "lead-id",
      "area",
      "nomor-kolam",
      "status-kesiapan-kolam",
      "status-kesiapan-kolam-lainnya",
      "estimasi-siap-tebar",
      "satuan-waktu",
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
      "lead-id",
      "area",
      "komoditas",
      "nomor-kolam",
      "tanggal-tebar",
      "wadah-benih",
      "jumlah-wadah-benih",
      "total-benih-per-kolam",
      "sampling-benih",
      "apakah-midway",
      "apakah-benih-efishery",
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
      "lead-id",
      "area",
      "tanggal-cek-pakan",
      "sku-pakan-1",
      "qty-pakan-1",
      "qty-pakan-1-open",
      "sku-pakan-2",
      "qty-pakan-2",
      "qty-pakan-2-open",
      "sku-pakan-3",
      "qty-pakan-3",
      "qty-pakan-3-open",
      "sku-pakan-4",
      "qty-pakan-4",
      "qty-pakan-4-open",
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
      "lead-id",
      "area",
      "nomor-kolam",
      "tanggal-cek-budidaya",
      "kondisi-budidaya",
      "apakah-ada-kematian",
      "jumlah-kematian-ikan",
      "satuan-kuantitas",
      "apakah-mencatat-pakan",
      "keterangan",
      "suhu",
      "dissolved-oxygen",
      "ph",
      "tds",
    ],
    columnRanges: {
      area: "A2:A",
      "list-petani": "B2:C",
      "nomor-kolam": "D2:F",
      "kondisi-budidaya": "G2:G",
    },
  },
  "monitoring-sampling": {
    sheetId: "1Un2r10nyPXQZbY89-5ORuAUsVL0AFi9HynK4vvXUquA",
    sheetUploadData: "0. Data monitoring sampling",
    sheetUploadImage: "1. Dokumentasi monitoring sampling",
    folderUploadImage: "1TU0B0k3WxvGpO7NkqmpZ2XqZWY82lV76",
    columnRanges: {
      area: "A2:A",
      "list-petani": "B2:C",
      "nomor-kolam": "D2:F",
    },
    orderedKeyUploadData: [
      "nama",
      "lead-id",
      "area",
      "nomor-kolam",
      "tanggal-cek-sampling",
      "bobot-sampling-ikan",
      "apakah-siap-panen",
      "estimasi-siap-panen",
      "satuan-waktu",
      "apakah-ada-buyer",
      "numeric-harga-buyer",
      "kontak-buyer",
      "keterangan",
    ],
  },
  "monitoring-panen": {
    sheetId: "1QH7YS1aRLwLyro1Wh8RwmOVJU19MpW1Cd0R0cz78eBI",
    sheetUploadData: "0. Data monitoring panen",
    sheetUploadImage: "1. Dokumentasi monitoring panen",
    folderUploadImage: "1RBpPmbnQpfbzXtr60zDtyMn_tkfgjdzw",
    columnRanges: {},
    adData: ["nama", "lead-id", "area"],
  },
};

function kebabToStartCase(str) {
  return str
    .split("-") // Split the string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words with a space in between
}
