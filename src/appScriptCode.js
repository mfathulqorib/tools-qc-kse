const userProperties = PropertiesService.getUserProperties();
const pageMode = userProperties.getProperty("mode");
const activePage = listSheetInformation[pageMode];

// use regex to search sheet enum_list
const sheetEnumList = /enum_list/i;

const sheetName = getSheetsName(
  activePage.sheetId || listSheetInformation.Validasi1.sheetId
);
const index = (targetSheetName) =>
  sheetName.findIndex((name) => targetSheetName.test(name));
const sheet = ss(
  activePage.sheetId || listSheetInformation.Validasi1.sheetId
).getSheetByName(sheetName[index(sheetEnumList)]);

function doGet(e) {
  let page = e.parameter.mode || "validasi-1";
  let html = HtmlService.createTemplateFromFile(`src/page/${page}`)
    .evaluate()
    .setTitle("Tools QC KSE");
  let htmlOutput = HtmlService.createHtmlOutput(html);

  userProperties.setProperty("mode", page);

  // add metatag to html
  htmlOutput.addMetaTag(
    "viewport",
    "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0"
  );

  //Replace {{NAVBAR}} with the Navbar content
  htmlOutput.setContent(
    htmlOutput.getContent().replace("{{NAVBAR}}", getNavbar(page))
  );

  htmlOutput.setContent(
    htmlOutput
      .getContent()
      .replace("{{TITLE}}", `Form ${kebabToStartCase(page)}`)
  );

  return htmlOutput;
}

// Create Navigation Bar
function getNavbar(page) {
  const scriptURLValidasi1Page = getScriptURL("mode=validasi-1");
  const scriptURLValidasiMidwayPage = getScriptURL("mode=validasi-midway");
  const scriptURLValidasi2Page = getScriptURL("mode=validasi-2");
  const scriptURLMonitoringTebar = getScriptURL("mode=monitoring-tebar");
  const scriptURLMonitoringStokPakan = getScriptURL(
    "mode=monitoring-stok-pakan"
  );
  const scriptURLMonitoringBudidaya = getScriptURL("mode=monitoring-budidaya");
  const scriptURLMonitoringSampling = getScriptURL("mode=monitoring-sampling");
  const scriptURLMonitoringPanen = getScriptURL("mode=monitoring-panen");

  const navLinks = [
    {
      text: "Validasi 1",
      url: scriptURLValidasi1Page,
      isActive: page === "validasi-1",
    },
    {
      text: "Validasi Midway",
      url: scriptURLValidasiMidwayPage,
      isActive: page === "validasi-midway",
    },
    {
      text: "Validasi 2",
      url: scriptURLValidasi2Page,
      isActive: page === "validasi-2",
    },
    {
      text: "Monitoring Tebar",
      url: scriptURLMonitoringTebar,
      isActive: page === "monitoring-tebar",
    },
    {
      text: "Monitoring Stok Pakan",
      url: scriptURLMonitoringStokPakan,
      isActive: page === "monitoring-stok-pakan",
    },
    {
      text: "Monitoring Budidaya",
      url: scriptURLMonitoringBudidaya,
      isActive: page === "monitoring-budidaya",
    },
    {
      text: "Monitoring Sampling",
      url: scriptURLMonitoringSampling,
      isActive: page === "monitoring-sampling",
    },
    {
      text: "Monitoring Panen",
      url: scriptURLMonitoringPanen,
      isActive: page === "monitoring-panen",
    },
  ];

  const navbarTemplate = `
  <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand ps-3">Tools QC - 2024 🔥</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon" id="trigger-btn"></span>
      </button>
      <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel" data-bs-scroll="false" data-bs-backdrop="true">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3" id="nav-links">
            ${navLinks
              .map(
                (link) => `
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <a class="nav-item nav-link ${
                  link.isActive ? "active" : ""
                }" href="${link.url}">${link.text}</a>
              </li>
            `
              )
              .join("")}
          </ul>
        </div>
      </div>
    </div>
  </nav>
  `;

  return navbarTemplate;
}

// Returns the URL of the Google Apps Script web app
function getScriptURL(qs = null) {
  let url = ScriptApp.getService().getUrl();
  if (qs) {
    if (qs.indexOf("?") === -1) {
      qs = "?" + qs;
    }
    url = url + qs;
  }
  return url;
}

// INCLUDE HTML PARTS, EG. JAVASCRIPT, CSS, OTHER HTML FILES
function readFile(filePath) {
  return HtmlService.createHtmlOutputFromFile(filePath).getContent();
}

function include(filename) {
  return readFile(filename);
}

function includeComponent(filename) {
  return readFile(`src/components/${filename}`);
}

function includeTitle(filename) {
  return readFile(`src/components/titles/${filename}`);
}

function includeFormContent(filename) {
  return readFile(`src/components/form-contents/${filename}`);
}

function includeUtils(filename) {
  return readFile(`src/utils/${filename}`);
}

function includeService(filename) {
  return readFile(`src/services/${filename}`);
}

function includeStyle(filename) {
  return readFile(`src/styles/${filename}`);
}

// GET DATA from spreadsheet section
function getListArea() {
  const range = activePage.columnRanges["area"];
  const rawList = sheet.getRange(range).getValues();

  // Use the filter method to create a new array with only non-empty rows
  const list = rawList
    .filter((row) => row[0])
    .sort((a, b) => a[0].localeCompare(b[0]));

  return list;
}

function getListFarmers() {
  const range = activePage.columnRanges["list-petani"];
  const rawList = sheet.getRange(range).getValues();

  // Use the filter method to create a new array with only non-empty rows
  const list = rawList
    .filter((row) => row[0])
    .sort((a, b) => a[0].localeCompare(b[0]));

  return list;
}

function getListPonds() {
  const range = activePage.columnRanges["nomor-kolam"];
  const rawList = sheet.getRange(range).getValues();
  const filteredList = rawList
    .filter((row) => row[0] !== "")
    .map((row) => [row[0], row[2]]);

  return filteredList;
}

function getListSkuPakan() {
  const range = activePage.columnRanges["sku-pakan"];
  const rawList = sheet.getRange(range).getValues();
  const list = rawList.filter(String);

  return list;
}

function getEnumList(id) {
  const range = activePage.columnRanges[id];
  const rawList = sheet.getRange(range).getValues();
  const list = rawList.filter(String);

  return list;
}

// end of GET DATA from spreadsheet section

// SUBMIT FORM section

function uploadData(formData) {
  const assessmentId = Utilities.getUuid();
  const sheetAssessmentKolam = ss(activePage.sheetId).getSheetByName(
    activePage.sheetUploadData
  );
  const sheetDokumentasiAssessment = ss(activePage.sheetId).getSheetByName(
    activePage.sheetUploadImage
  );
  const lastRowSheetDokumentasi = sheetDokumentasiAssessment
    .getRange("B1:B")
    .getValues()
    .filter(String).length;
  const lastRowSheetAssessment = sheetAssessmentKolam.getLastRow();
  const lastColumnSheetAssessment = sheetAssessmentKolam.getLastColumn();
  const { "lead-id": leadId, "nomor-kolam": pondNumber } = formData;
  const pondId = `${leadId}${"0".repeat(
    Math.abs(4 - (pondNumber?.toString().length || 0))
  )}${pondNumber ?? ""}`;

  const dataForSheet = [
    [
      assessmentId,
      userEmail,
      timeStamp,
      ...activePage.orderedKeyUploadData.map((key) => {
        const isNumeric = key.match(/^numeric/i);
        const isPondId = key === "pond-id";
        const isSetFormula = key.match(/^setFormula/i);

        if (isNumeric) {
          return formData[key]?.toString().replace(",", "") || "-";
        } else if (isPondId) {
          return pondId || "-";
        } else if (isSetFormula) {
          return;
        } else {
          return formData[key] || "-";
        }
      }),
    ],
  ];

  sheetAssessmentKolam
    .getRange(lastRowSheetAssessment + 1, 1, 1, dataForSheet[0].length)
    .setValues(dataForSheet);
  sheetDokumentasiAssessment
    .getRange(lastRowSheetDokumentasi + 1, 1)
    .setValue(assessmentId);

  if (activePage.orderedKeyUploadData.some((key) => /^setFormula/.test(key))) {
    const setFormula = activePage.orderedKeyUploadData.filter((key) =>
      /^setFormula/.test(key)
    );

    setFormula.forEach((key, index) => {
      activePage[key](
        sheetAssessmentKolam,
        lastRowSheetAssessment + 1,
        lastColumnSheetAssessment + index
      );
    });
  }

  return dataForSheet;
}

function uploadImages(obj) {
  const documentationId = Utilities.getUuid();
  const rootFolder = DriveApp.getFolderById(activePage.folderUploadImage);
  const sheetDokumentasiValidasi = ss(activePage.sheetId).getSheetByName(
    activePage.sheetUploadImage
  );
  const lastActiveRow = sheetDokumentasiValidasi
    .getRange("B1:B")
    .getValues()
    .filter(String).length;
  const folder = rootFolder.createFolder(documentationId);

  sheetDokumentasiValidasi
    .getRange(lastActiveRow + 1, 2)
    .setValue(documentationId);
  sheetDokumentasiValidasi.getRange(lastActiveRow + 1, 3).setValue(userEmail);

  obj.forEach((e, index) => {
    const blob = Utilities.newBlob(
      Utilities.base64Decode(e.data),
      e.mimeType,
      e.fileName
    );
    const url = folder.createFile(blob).getUrl();
    const lastActiveCol = sheetDokumentasiValidasi
      .getRange(lastActiveRow + 1, 2, 1, 10)
      .getValues()[0]
      .filter(String).length;

    if (e.type === "dokumentasi") {
      sheetDokumentasiValidasi
        .getRange(lastActiveRow + 1, lastActiveCol + 2)
        .setValue(url || "-");
    }
  });

  return obj;
}

// end of SUBMIT FORM section
