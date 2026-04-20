/**
 * =========================================================================
 * BACKEND PORTAL ABSENSI BIMBEL BEE (GOOGLE APPS SCRIPT)
 * Mode: Full In-Memory Array Processing (getValues) - Anti Timeout 6 Menit
 * =========================================================================
 */

const DB_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

/**
 * JALANKAN FUNGSI INI PERTAMA KALI (via Editor GAS)
 * Fungsi ini akan otomatis menyiapkan Sheet dan Header yang dibutuhkan.
 */
function setupDatabase() {
  const ss = SpreadsheetApp.openById(DB_ID);
  
  const sheetsDef = {
    'Siswa': ['id', 'nama', 'genderSiswa', 'wali', 'genderWali', 'hp', 'jenjang', 'pin'],
    'Tarif': ['nama', 'jenjang', 'hari', 'reg', 'over'],
    'Log': ['idLog', 'idSiswa', 'nama', 'hari', 'tgl', 'status', 'reg', 'over', 'bulan', 'tglObj'],
    'Admin': ['username', 'password', 'nama', 'role', 'privilege']
  };

  for (const [sheetName, headers] of Object.entries(sheetsDef)) {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#d9ead3");
      
      // Inject Akun Default SuperAdmin jika Sheet Admin baru dibuat
      if (sheetName === 'Admin') {
        sheet.appendRow(['admin_master', '123', 'Super Admin Default', 'SuperAdmin', 'all']);
      }
    }
  }
  
  // Hapus "Sheet1" bawaan jika masih ada
  const sheet1 = ss.getSheetByName('Sheet1');
  if (sheet1 && ss.getSheets().length > 1) {
    ss.deleteSheet(sheet1);
  }
}

/**
 * HANDLE HTTP GET REQUEST
 * Digunakan untuk menarik (Fetch) semua data saat halaman Vercel pertama dimuat.
 */
function doGet(e) {
  try {
    const action = e.parameter.action;
    if (action === 'getData') {
      const ss = SpreadsheetApp.openById(DB_ID);
      
      // Ambil data dalam bentuk JSON Object (Proses Full Memory)
      const resData = {
        siswa: sheetToArrayObject(ss.getSheetByName('Siswa')),
        tarif: sheetToArrayObject(ss.getSheetByName('Tarif')),
        log: sheetToArrayObject(ss.getSheetByName('Log')),
        admin: sheetToArrayObject(ss.getSheetByName('Admin'))
      };
      
      return buildJSONResponse("success", "Data berhasil ditarik", resData);
    }
    return buildJSONResponse("error", "Action tidak dikenali atau kosong", null);
  } catch (error) {
    return buildJSONResponse("error", error.toString(), null);
  }
}

/**
 * HANDLE HTTP POST REQUEST
 * Digunakan untuk fungsi CRUD (Tambah, Edit, Hapus) dari Vercel.
 */
function doPost(e) {
  // Lock service agar data tidak tumpang tindih jika banyak wali absen bersamaan (Concurrency Control)
  const lock = LockService.getScriptLock();
  lock.waitLock(10000); 

  try {
    const payload = JSON.parse(e.postData.contents);
    const action = payload.action;
    const data = payload.data;
    const ss = SpreadsheetApp.openById(DB_ID);
    
    let result = false;

    // --- SISWA CRUD ---
    if (action === 'tambahSiswa') result = addRowData(ss.getSheetByName('Siswa'), data, ['id', 'nama', 'genderSiswa', 'wali', 'genderWali', 'hp', 'jenjang', 'pin']);
    else if (action === 'editSiswa') result = editRowData(ss.getSheetByName('Siswa'), 'id', data.id, data, ['id', 'nama', 'genderSiswa', 'wali', 'genderWali', 'hp', 'jenjang', 'pin']);
    else if (action === 'hapusSiswa') result = deleteRowData(ss.getSheetByName('Siswa'), 'id', data.id);
    
    // --- TARIF CRUD ---
    else if (action === 'tambahTarif') result = addRowData(ss.getSheetByName('Tarif'), data, ['nama', 'jenjang', 'hari', 'reg', 'over']);
    else if (action === 'editTarif') result = editRowData(ss.getSheetByName('Tarif'), 'nama', data.oldNama, data, ['nama', 'jenjang', 'hari', 'reg', 'over']);
    else if (action === 'hapusTarif') result = deleteRowData(ss.getSheetByName('Tarif'), 'nama', data.nama);
    
    // --- ADMIN CRUD ---
    else if (action === 'tambahAdmin') result = addRowData(ss.getSheetByName('Admin'), data, ['username', 'password', 'nama', 'role', 'privilege']);
    else if (action === 'editAdmin') result = editRowData(ss.getSheetByName('Admin'), 'username', data.oldUsername, data, ['username', 'password', 'nama', 'role', 'privilege']);
    else if (action === 'hapusAdmin') result = deleteRowData(ss.getSheetByName('Admin'), 'username', data.username);
    
    // --- LOG CRUD ---
    else if (action === 'tambahLog') result = addRowData(ss.getSheetByName('Log'), data, ['idLog', 'idSiswa', 'nama', 'hari', 'tgl', 'status', 'reg', 'over', 'bulan', 'tglObj']);
    else if (action === 'editLog') result = editRowData(ss.getSheetByName('Log'), 'idLog', data.idLog, data, ['idLog', 'idSiswa', 'nama', 'hari', 'tgl', 'status', 'reg', 'over', 'bulan', 'tglObj']);
    else if (action === 'hapusLog') result = deleteRowData(ss.getSheetByName('Log'), 'idLog', data.idLog);
    
    else {
      return buildJSONResponse("error", "Action POST tidak dikenali", null);
    }

    return buildJSONResponse("success", "Operasi database berhasil", result);
  } catch (error) {
    return buildJSONResponse("error", error.toString(), null);
  } finally {
    lock.releaseLock();
  }
}

/**
 * ============================================================================
 * HELPER FUNCTIONS (IN-MEMORY PROCESSORS)
 * ============================================================================
 */

// Tarik data sheet dan jadikan Object JSON (Murni getValues, super cepat)
function sheetToArrayObject(sheet) {
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  
  const headers = data[0];
  const rows = data.slice(1);
  
  return rows.map(row => {
    let obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] !== undefined ? row[index] : "";
    });
    return obj;
  });
}

// Tambah baris data baru (1x I/O)
function addRowData(sheet, dataObj, headersArr) {
  const newRow = headersArr.map(h => dataObj[h] !== undefined ? dataObj[h] : "");
  sheet.appendRow(newRow);
  return true;
}

// Edit baris data menggunakan memori array untuk menemukan indeks
function editRowData(sheet, primaryKeyColName, primaryKeyValue, newDataObj, headersArr) {
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const pkIndex = headers.indexOf(primaryKeyColName);
  
  if (pkIndex === -1) return false;

  // Mencari index menggunakan Array Javascript di Memori (Bukan Loop sheet.getValue)
  const targetRowIndex = data.findIndex((row, idx) => idx > 0 && String(row[pkIndex]) === String(primaryKeyValue));
  
  if (targetRowIndex > -1) {
    const updatedRow = headersArr.map(h => newDataObj[h] !== undefined ? newDataObj[h] : "");
    // Menulis update (1x I/O)
    sheet.getRange(targetRowIndex + 1, 1, 1, headersArr.length).setValues([updatedRow]);
    return true;
  }
  return false;
}

// Hapus baris data menggunakan memori array untuk menemukan indeks
function deleteRowData(sheet, primaryKeyColName, primaryKeyValue) {
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const pkIndex = headers.indexOf(primaryKeyColName);
  
  if (pkIndex === -1) return false;

  const targetRowIndex = data.findIndex((row, idx) => idx > 0 && String(row[pkIndex]) === String(primaryKeyValue));
  
  if (targetRowIndex > -1) {
    // Hapus row (1x I/O)
    sheet.deleteRow(targetRowIndex + 1);
    return true;
  }
  return false;
}

// Kembalikan Response ke Vercel dengan format JSON + CORS Header
function buildJSONResponse(status, message, data) {
  const response = { status: status, message: message, data: data };
  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}
