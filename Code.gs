<!doctype html>

<html lang="id" data-bs-theme="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Portal Absensi Les - Bimbel Bee ✨</title>

    <!-- Eksekusi Theme Paling Awal agar tidak Flash Putih saat Refresh -->
    <script>
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute("data-bs-theme", savedTheme);
    </script>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://unpkg.com/html5-qrcode"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>

    <script>
      // =========================================================================
      // PENGATURAN DATABASE GOOGLE APPS SCRIPT (GAS)
      // =========================================================================
      const GAS_URL = 'https://script.google.com/macros/s/AKfycbyR1p03wBZZcniciW-vP-Tb7Lz__v6eM_mpRqDjQAjjvM8WwffVtUdL_NV8lHgnyAMY/exec'; 
    </script>

    <style>
      html { font-size: 14px; }
      :root {
        --primary-color: #0084ff; --primary-hover: #0070d9;
        --bg-color: #f8fafd; --card-bg: #ffffff;
        --text-main: #1e293b; --text-muted: #64748b;
        --border-color: #e2e8f0; --sidebar-width: 240px;
        --success-color: #10b981; --warning-color: #f59e0b; --danger-color: #ef4444;
      }
      [data-bs-theme="dark"] {
        --bg-color: #0f172a; --card-bg: #1e293b;
        --text-main: #f8fafc; --text-muted: #94a3b8; --border-color: #334155;
      }

      body {
        font-family: "Nunito", sans-serif;
        background-color: var(--bg-color); color: var(--text-main);
        transition: background-color 0.3s, color 0.3s;
        overflow-x: hidden;
      }

      /* Sistem Loading API Terpadu */
      #api-loader {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: var(--bg-color); z-index: 9999;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        transition: opacity 0.5s;
      }
      .loader-spinner {
        width: 50px; height: 50px; border: 5px solid var(--border-color);
        border-top-color: var(--primary-color); border-radius: 50%;
        animation: spin 1s linear infinite; margin-bottom: 20px;
      }
      @keyframes spin { to { transform: rotate(360deg); } }

      /* Sidebar Styles */
      #sidebar { width: var(--sidebar-width); position: fixed; top: 0; left: 0; height: 100vh; background-color: var(--card-bg); border-right: 1px solid var(--border-color); z-index: 1040; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); display: flex; flex-direction: column; }
      .sidebar-header { padding: 1.25rem; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; gap: 10px; }
      .brand-icon { width: 32px; height: 32px; background: linear-gradient(135deg, var(--primary-color), #3b82f6); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.1rem; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3); }
      .nav-menu { padding: 1rem 0.75rem; flex-grow: 1; overflow-y: auto; }
      .nav-item { margin-bottom: 0.25rem; }
      .nav-link { color: var(--text-muted); padding: 0.65rem 1rem; border-radius: 8px; display: flex; align-items: center; gap: 12px; font-weight: 600; transition: all 0.2s; text-decoration: none; }
      .nav-link:hover { background-color: rgba(0, 132, 255, 0.05); color: var(--primary-color); }
      .nav-link.active { background-color: var(--primary-color); color: white; box-shadow: 0 4px 6px -1px rgba(0, 132, 255, 0.3); }

      /* Main Content Styles */
      #main-content { margin-left: var(--sidebar-width); min-height: 100vh; display: flex; flex-direction: column; transition: margin-left 0.3s; }
      .top-header { background-color: var(--card-bg); border-bottom: 1px solid var(--border-color); padding: 0.8rem 1.25rem; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 1030; backdrop-filter: blur(10px); background-color: rgba(var(--card-bg-rgb), 0.9); }
      .content-area { padding: 1.25rem; flex-grow: 1; padding-bottom: 80px; }

      /* Card & Element Styles */
      .custom-card { background-color: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.05); margin-bottom: 1.25rem; overflow: hidden; }
      .card-header-custom { padding: 1rem 1.25rem; border-bottom: 1px solid var(--border-color); background-color: rgba(0, 0, 0, 0.02); font-weight: 700; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
      .stat-card { padding: 1.25rem; border-radius: 12px; color: white; position: relative; overflow: hidden; }
      .stat-card.blue { background: linear-gradient(135deg, #0084ff, #3b82f6); }
      .stat-card.green { background: linear-gradient(135deg, #10b981, #059669); }
      .stat-card.orange { background: linear-gradient(135deg, #f59e0b, #d97706); }
      .stat-card.purple { background: linear-gradient(135deg, #8b5cf6, #6d28d9); }
      .stat-icon { position: absolute; right: -10px; bottom: -15px; font-size: 4.5rem; opacity: 0.15; }

      /* Tombol Atas Seragam (ThemeBar) */
      .btn-themebar {
        background-color: var(--bg-color); color: var(--text-main); border: 1px solid var(--border-color); box-shadow: 0 2px 4px rgba(0,0,0,0.02); transition: all 0.3s;
      }
      .btn-themebar:hover { background-color: rgba(0, 132, 255, 0.1); color: var(--primary-color); border-color: var(--primary-color); }
      [data-bs-theme="dark"] .btn-themebar { background-color: var(--card-bg); color: var(--text-main); border-color: var(--border-color); }
      [data-bs-theme="dark"] .btn-themebar:hover { background-color: #334155; }

      /* Form Controls - Peningkatan Jarak Padding Ikon agar tidak nabrak teks & Ikon Mata Pw */
      .form-control, .form-select { background-color: var(--bg-color); border: 1px solid var(--border-color); color: var(--text-main); border-radius: 8px; padding: 0.5rem 0.75rem; }
      .form-control:focus, .form-select:focus { background-color: var(--bg-color); color: var(--text-main); border-color: var(--primary-color); box-shadow: 0 0 0 0.25rem rgba(0, 132, 255, 0.25); }
      .input-icon-wrapper { position: relative; width: 100%; }
      .input-icon-wrapper i:not(.toggle-pw) { position: absolute; top: 50%; transform: translateY(-50%); left: 0.85rem; color: var(--text-muted); pointer-events: none; z-index: 5; }
      .input-icon-wrapper i.toggle-pw { left: auto; right: 0.85rem; pointer-events: auto; z-index: 10; cursor: pointer; color: var(--text-muted); position: absolute; top: 50%; transform: translateY(-50%); }
      .input-icon-wrapper .form-control, .input-icon-wrapper .form-select { padding-left: 2.8rem !important; }
      .input-icon-wrapper .form-control.pe-5 { padding-right: 2.8rem !important; }
      
      input[type="date"], input[type="month"], input[type="time"] { position: relative; color: var(--text-main) !important; }
      input[type="date"]::-webkit-calendar-picker-indicator, input[type="month"]::-webkit-calendar-picker-indicator, input[type="time"]::-webkit-calendar-picker-indicator { position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: auto; height: auto; color: transparent; background: transparent; cursor: pointer; }

      /* Modifikasi Khusus Tema Dark (SWAL & Table) */
      [data-bs-theme="dark"] .swal2-popup { background-color: var(--card-bg) !important; color: var(--text-main) !important; }
      [data-bs-theme="dark"] .swal2-title, [data-bs-theme="dark"] .swal2-html-container { color: var(--text-main) !important; }
      [data-bs-theme="dark"] .swal2-input, [data-bs-theme="dark"] .form-control { background-color: var(--bg-color) !important; color: var(--text-main) !important; border-color: var(--border-color) !important; }
      [data-bs-theme="dark"] .swal2-input::placeholder { color: var(--text-muted); }
      .table { --bs-table-bg: transparent; --bs-table-striped-bg: transparent; --bs-table-hover-bg: transparent; }
      .table td, .table th { background-color: transparent !important; color: var(--text-main) !important; }

      /* Table Styles */
      .table-responsive { border-radius: 0 0 12px 12px; width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; } 
      .table { margin-bottom: 0; width: 100%; min-width: 600px; } 
      .table th { border-bottom-width: 2px; border-color: var(--border-color); font-weight: 600; padding: 0.75rem 1rem; }
      .table td { border-color: var(--border-color); padding: 0.75rem 1rem; vertical-align: middle; }
      .editable-cell { cursor: pointer; border-bottom: 1px dashed var(--primary-color); transition: background-color 0.2s; }
      .editable-cell:hover { background-color: rgba(0, 132, 255, 0.1); }
      .editable-cell:focus { outline: 2px solid var(--primary-color); background-color: var(--card-bg); }

      .dropdown-menu-checkboxes { max-height: 250px; overflow-y: auto; }
      .dropdown-menu-checkboxes .form-check { margin: 0; padding: 0.4rem 1rem 0.4rem 2rem; cursor: pointer; }
      .dropdown-menu-checkboxes .form-check:hover { background-color: rgba(0, 132, 255, 0.05); }

      .fade-transition { transition: opacity 0.5s ease, transform 0.5s ease; opacity: 1; transform: translateY(0); }
      .fade-out { opacity: 0; transform: translateY(-20px); pointer-events: none; position: absolute; top: 0; left: 0; width: 100%; visibility: hidden; }

      /* Modals ID Card */
      #modalIDCard .modal-body { overflow-x: auto; }
      .id-card-container { width: 85.6mm; height: 53.98mm; background: linear-gradient(135deg, var(--card-bg), var(--bg-color)); border: 2px solid var(--primary-color); border-radius: 10px; position: relative; padding: 12px; display: flex; align-items: center; gap: 12px; margin: 0 auto; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); overflow: hidden; flex-shrink: 0; }
      .id-card-qr { width: 95px; height: 95px; background: white; padding: 4px; border-radius: 8px; border: 1px solid var(--border-color); flex-shrink: 0; }
      .id-card-details { flex: 1; text-align: left; z-index: 2; }
      .id-card-bg-icon { position: absolute; right: -15px; bottom: -20px; font-size: 80px; opacity: 0.05; color: var(--primary-color); z-index: 1; }

      .bottom-nav { display: none; }

      /* =========================================================================
         PENYESUAIAN MOBILE NATIVE APP EXPERIENCE
         ========================================================================= */
      @media (max-width: 768px) {
        #sidebar { transform: translateX(-100%); z-index: 1060; }
        #sidebar.show { transform: translateX(0); box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); }
        #main-content { margin-left: 0; }
        
        /* Panel Bar Transparan Elegan */
        .bottom-nav { 
          display: flex; position: fixed; bottom: 0; left: 0; right: 0; height: 60px; 
          background-color: rgba(255, 255, 255, 0.85); 
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border-top: 1px solid rgba(0, 0, 0, 0.08); z-index: 1050; justify-content: space-around; align-items: center; 
          box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.05); padding: 0 5px; 
        }
        [data-bs-theme="dark"] .bottom-nav { 
          background-color: rgba(30, 41, 59, 0.85); 
          border-top: 1px solid rgba(255, 255, 255, 0.05); 
        }

        .nav-item-bottom { display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-muted); text-decoration: none; font-size: 0.65rem; font-weight: 600; flex: 1; transition: color 0.3s; background: none; border: none; padding: 0; }
        .nav-item-bottom.active { color: var(--primary-color); }
        .nav-item-bottom i { font-size: 1.1rem; margin-bottom: 2px; }
        .nav-scanner-center { width: 55px; height: 55px; background: linear-gradient(135deg, var(--primary-color), #3b82f6); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; position: relative; top: -20px; box-shadow: 0 4px 10px rgba(0, 132, 255, 0.4); border: 4px solid var(--bg-color); transition: transform 0.2s; flex-shrink: 0; }
        .nav-scanner-center:active { transform: scale(0.95); }
        .mobile-overlay { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); z-index: 1055; backdrop-filter: blur(3px); }
        .mobile-overlay.show { display: block; }
        
        .input-icon-wrapper .form-control, .input-icon-wrapper .form-select { padding-left: 2.8rem !important; }

        /* TRANSFORMASI TABEL MENJADI MOBILE CARDS (Pemisahan Jelas) */
        .table-responsive { overflow: visible; padding: 0 5px 10px 5px; } /* Ruang untuk shadow */
        .table-responsive .table { border-collapse: separate; border-spacing: 0; margin-top: -12px; min-width: 100%; border: none; }
        .table-responsive thead { display: none; }
        
        .table-responsive tbody tr {
            display: block;
            background: var(--bg-color); /* Kontras agar tampak terpisah dari wadah custom-card */
            border: 1px solid var(--border-color);
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05) !important; /* Shadow diperkuat */
            padding: 0.75rem;
            margin-bottom: 1.25rem !important; /* Jarak antar siswa diperlebar */
        }
        
        .table-responsive tbody td {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 1px solid var(--border-color) !important;
            padding: 0.6rem 0.5rem !important;
            font-size: 0.9rem !important;
            white-space: normal !important;
            word-break: break-word;
            text-align: right;
            gap: 0.5rem;
            border-top: none;
            border-left: none;
            border-right: none;
        }
        
        .table-responsive tbody td:last-child { border-bottom: none !important; padding-bottom: 0.25rem !important; }
        .table-responsive tbody td:first-child { padding-top: 0.25rem !important; }
        
        .table-responsive tbody td::before {
            content: attr(data-label);
            font-weight: 700;
            color: var(--text-muted);
            text-align: left;
            flex-shrink: 0;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            width: 35%;
        }
        
        .table-responsive tbody td > div, .table-responsive tbody td > button, .table-responsive tbody td > small { text-align: right; }
        .table-responsive tbody td .d-flex { justify-content: flex-end; width: 100%; flex-wrap: wrap; }

        /* Pengecualian Dashboard & Log Scanner (Sederhana) */
        #menu-dashboard .table-responsive .table, #menu-absen .table-responsive .table { border-spacing: 0; margin-top: 0; }
        #menu-dashboard .table-responsive tbody tr, #menu-absen .table-responsive tbody tr { display: flex; justify-content: space-between; align-items: center; border-radius: 8px; padding: 0.6rem; margin-bottom: 0.5rem !important; box-shadow: none !important; border: 1px solid var(--border-color); }
        #menu-dashboard .table-responsive tbody td, #menu-absen .table-responsive tbody td { display: block; border: none !important; padding: 0 !important; text-align: left; width: auto; }
        #menu-dashboard .table-responsive tbody td::before, #menu-absen .table-responsive tbody td::before { display: none; }
        #menu-dashboard .table-responsive tbody td:last-child, #menu-absen .table-responsive tbody td:last-child { text-align: right; }

        /* PERBAIKAN MASTER: Mencegah Rincian Invoice & Log (Nested Table) ikutan tergencet layout card mobile */
        .table-responsive tbody tr.collapse.show { display: block; }
        .table-responsive tbody tr.collapse:not(.show) { display: none !important; }
        .table-responsive tbody tr.collapse { border: none; background: transparent; box-shadow: none !important; padding: 0; margin: 0; margin-top: -1.25rem !important; margin-bottom: 1.25rem !important; }
        
        /* Hilangkan display flex & width 35% pseudo dari TD pembungkus rincian collapse */
        .table-responsive tbody tr.collapse td { 
            display: block !important; 
            text-align: left !important; 
            width: 100% !important; 
            padding: 0 !important; 
            border: none !important; 
        }
        .table-responsive tbody tr.collapse td::before { display: none !important; }

        .badge { font-size: 0.75rem !important; padding: 0.4em 0.6em !important; }
        .btn-sm { font-size: 0.85rem !important; padding: 0.35rem 0.6rem !important; }
        .form-control, .form-select { font-size: 0.95rem !important; padding: 0.5rem 0.75rem !important; }
        .card-header-custom { padding: 0.85rem 1rem !important; font-size: 1rem !important; }
        .content-area { padding: 0.85rem; padding-bottom: 80px; }
      }
    </style>
  </head>
  <body>
    <!-- KANVAS STRUK INVOICE (Disembunyikan, untuk fitur share gambar) -->
    <div id="receipt-container-wrapper" style="position: absolute; top: -9999px; left: -9999px; z-index: -99;">
        <div id="receipt-template" style="width: 400px; background: #ffffff; color: #1e293b; padding: 25px; font-family: 'Nunito', sans-serif; border-radius: 16px; border: 1px solid #e2e8f0; box-sizing: border-box;">
            <!-- Render Struk Dinamis di sini -->
        </div>
    </div>

    <!-- LOADING OVERLAY -->
    <div id="api-loader">
        <div class="loader-spinner"></div>
        <h5 class="fw-bold m-0">Menyinkronkan Database...</h5>
        <p class="text-muted small">Menghubungkan Server & Spreadsheet</p>
    </div>

    <datalist id="listSiswaSuggestion"></datalist>

    <!-- PORTAL WALI (LANDING PAGE) -->
    <div id="portal-wali" class="min-vh-100 position-relative d-none" style="background: var(--bg-color)">
      <div class="p-3 d-flex justify-content-between align-items-center bg-transparent position-absolute w-100 z-3">
        <div class="d-flex align-items-center gap-2">
          <div class="brand-icon" style="width: 30px; height: 30px"><i class="bi bi-book-half"></i></div>
          <h5 class="m-0 fw-bold">Bimbel<span class="text-primary">Bee</span> <small class="text-muted fw-normal d-none d-sm-inline">| Portal Wali</small></h5>
        </div>
        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-sm btn-themebar rounded-circle d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;" onclick="refreshDataBtn()" title="Refresh Data"><i class="bi bi-arrow-clockwise"></i></button>
          <button class="btn btn-sm btn-themebar rounded-circle d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;" onclick="toggleTheme()" id="themeToggleBtnWali"><i class="bi bi-moon-fill"></i></button>
          <button class="btn btn-outline-primary btn-themebar rounded-pill px-3 py-1 fw-bold" onclick="showAdminPortal()"><i class="bi bi-person-lock"></i> <span class="d-none d-sm-inline">Login Admin</span><span class="d-inline d-sm-none">Admin</span></button>
        </div>
      </div>

      <div id="pw-search-view" class="fade-transition min-vh-100 d-flex align-items-center justify-content-center flex-column px-3">
        <div class="text-center mb-4 mt-4">
          <svg width="100" height="100" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="mb-4" style="filter: drop-shadow(0 10px 15px rgba(0, 132, 255, 0.2));">
            <path d="M10 90 L 60 100 L 60 30 L 10 20 Z" fill="#e2e8f0"/><path d="M10 85 L 60 95 L 60 25 L 10 15 Z" fill="#cbd5e1"/><path d="M10 80 L 60 90 L 60 20 L 10 10 Z" fill="#ffffff"/><path d="M110 90 L 60 100 L 60 30 L 110 20 Z" fill="#e2e8f0"/><path d="M110 85 L 60 95 L 60 25 L 110 15 Z" fill="#cbd5e1"/><path d="M110 80 L 60 90 L 60 20 L 110 10 Z" fill="#f8fafc"/><path d="M60 20 L 60 100" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/><path d="M 25 35 L 45 39 M 20 50 L 45 55 M 25 65 L 45 69 M 20 80 L 35 83" stroke="#0084ff" stroke-width="3" stroke-linecap="round"/><path d="M 95 35 L 75 39 M 100 50 L 75 55 M 95 65 L 75 69 M 100 80 L 85 83" stroke="#0084ff" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
          </svg>
          <h3 class="fw-bold">Pantau Kehadiran Anak Anda</h3>
          <p class="text-muted small">Masukkan Nama Siswa untuk melihat rincian kehadiran dan tagihan Bimbel Bee.</p>
        </div>

        <div class="custom-card p-4 shadow-sm" style="max-width: 450px; width: 100%">
          <div class="input-icon-wrapper mb-3"><i class="bi bi-search"></i><input type="text" id="inputCariWali" list="listSiswaSuggestion" class="form-control" placeholder="Ketik nama siswa..." onkeydown="if (event.key === 'Enter') cariDataWali();" /></div>
          <button class="btn btn-primary w-100 py-2 fw-bold" onclick="cariDataWali()">Lihat Data Kehadiran</button>
        </div>
      </div>

      <div id="pw-detail-view" class="fade-transition fade-out d-none min-vh-100 w-100 pt-5 px-3 pb-5" style="max-width: 900px; margin: 0 auto; padding-top: 70px !important">
        <button class="btn btn-sm btn-themebar mb-3" onclick="kembaliKeSearch()"><i class="bi bi-arrow-left"></i> Kembali ke Pencarian</button>
        <div class="row g-3 mb-4">
          <div class="col-md-7">
            <div class="custom-card p-3 h-100 d-flex align-items-center gap-3">
              <img src="" alt="QR" class="rounded border p-1" width="70" id="pw-qr" />
              <div><h4 class="fw-bold m-0" id="pw-nama">-</h4><p class="text-muted m-0 small"><i class="bi bi-person-badge"></i> ID: <span id="pw-id">-</span> | Jenjang: <span id="pw-jenjang">-</span></p></div>
            </div>
          </div>
          <div class="col-md-5">
            <div class="custom-card p-3 h-100 d-flex flex-column justify-content-center">
              <label class="fw-bold mb-2 small">Pilih Bulan Kehadiran</label>
              <div class="input-icon-wrapper"><i class="bi bi-calendar-month"></i><input type="month" class="form-control" id="pw-filter-bulan" onchange="renderDataWali()" /></div>
            </div>
          </div>
        </div>

        <div class="row g-3 mb-4">
          <div class="col-md-4"><div class="custom-card p-3 border-start border-4 border-primary"><p class="text-muted mb-1 small fw-bold text-uppercase" style="font-size:0.75rem;">Total Reguler (Nominal)</p><h4 class="m-0 fw-bold" id="pw-sum-reguler">Rp 0</h4></div></div>
          <div class="col-md-4"><div class="custom-card p-3 border-start border-4 border-warning"><p class="text-muted mb-1 small fw-bold text-uppercase" style="font-size:0.75rem;">Total Overtime (Nominal)</p><h4 class="m-0 fw-bold" id="pw-sum-overtime">Rp 0</h4></div></div>
          <div class="col-md-4"><div class="custom-card p-3 border-start border-4 border-danger bg-danger-subtle"><p class="text-danger mb-1 small fw-bold text-uppercase" style="font-size:0.75rem;">Estimasi Tagihan Total</p><h4 class="m-0 fw-bold text-danger" id="pw-sum-total">Rp 0</h4></div></div>
        </div>

        <div class="custom-card">
          <div class="card-header-custom">Rincian Kehadiran Anak</div>
          <div class="p-3" id="pw-tabel-rincian">
            <!-- Render Flex List Here -->
          </div>
        </div>
      </div>
    </div>

    <!-- PORTAL ADMIN (DASHBOARD UTAMA) -->
    <div id="portal-admin" class="d-none">
      <div class="mobile-overlay" id="mobileOverlay" onclick="toggleSidebar()"></div>
      <aside id="sidebar">
        <div class="sidebar-header"><div class="brand-icon"><i class="bi bi-book-half"></i></div><h5 class="m-0 fw-bold">Bimbel<span class="text-primary">Bee</span></h5><button class="btn btn-sm btn-themebar d-md-none ms-auto" onclick="toggleSidebar()"><i class="bi bi-x-lg"></i></button></div>
        <div class="nav-menu" id="admin-nav-menu">
          <div class="small text-muted fw-bold mb-2 px-2 text-uppercase" style="font-size:0.75rem;">Menu Utama</div>
          <div class="nav-item" data-access="dashboard"><a href="#" class="nav-link active" onclick="switchMenu('menu-dashboard', this)"><i class="bi bi-grid-1x2-fill"></i> Dashboard</a></div>
          <div class="nav-item" data-access="absen"><a href="#" class="nav-link" onclick="switchMenu('menu-absen', this)"><i class="bi bi-qr-code-scan"></i> Absensi Scanner</a></div>
          <div class="small text-muted fw-bold mt-3 mb-2 px-2 text-uppercase" style="font-size:0.75rem;">Manajemen Data</div>
          <div class="nav-item" data-access="siswa"><a href="#" class="nav-link" onclick="switchMenu('menu-siswa', this)"><i class="bi bi-people-fill"></i> Data Siswa</a></div>
          <div class="nav-item" data-access="tarif"><a href="#" class="nav-link" onclick="switchMenu('menu-tarif', this)"><i class="bi bi-tags-fill"></i> Pengaturan Tarif</a></div>
          <div class="small text-muted fw-bold mt-3 mb-2 px-2 text-uppercase" style="font-size:0.75rem;">Laporan & Riwayat</div>
          <div class="nav-item" data-access="log"><a href="#" class="nav-link" onclick="switchMenu('menu-log', this)"><i class="bi bi-clock-history"></i> Log Kehadiran</a></div>
          <div class="nav-item" data-access="laporan"><a href="#" class="nav-link" onclick="switchMenu('menu-laporan', this)"><i class="bi bi-receipt"></i> Laporan & Invoice</a></div>
          <div class="small text-muted fw-bold mt-3 mb-2 px-2 text-uppercase" style="font-size:0.75rem;">Sistem</div>
          <div class="nav-item" data-access="role"><a href="#" class="nav-link" onclick="switchMenu('menu-role', this)"><i class="bi bi-shield-lock-fill"></i> Manajemen Role</a></div>
          <div class="nav-item"><a href="#" class="nav-link text-danger" onclick="logoutAdmin()"><i class="bi bi-box-arrow-left"></i> Logout ke Wali</a></div>
        </div>
        <div class="p-3 border-top border-secondary-subtle">
          <div class="d-flex align-items-center gap-2"><div class="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center" style="width: 32px; height: 32px"><i class="bi bi-person-fill"></i></div><div><div class="fw-bold" style="font-size: 0.85rem" id="current-user-name">-</div><div class="text-muted" style="font-size: 0.75rem" id="current-user-role">-</div></div></div>
        </div>
      </aside>

      <main id="main-content">
        <header class="top-header">
          <div class="d-flex align-items-center gap-3"><button class="btn btn-sm btn-themebar d-md-none" onclick="toggleSidebar()"><i class="bi bi-list"></i></button><h5 class="m-0 fw-bold d-none d-sm-block" id="pageTitle">Dashboard</h5></div>
          <div class="d-flex align-items-center gap-2">
            <div id="realtime-clock" class="fw-bold text-primary small d-none d-sm-block px-2"></div>
            <button class="btn btn-sm btn-themebar rounded-circle" onclick="refreshDataBtn()" title="Sinkronkan/Refresh Data Terbaru"><i class="bi bi-arrow-clockwise text-primary"></i></button>
            <button class="btn btn-sm btn-themebar rounded-circle" onclick="toggleTheme()" id="themeToggleBtn"><i class="bi bi-moon-fill"></i></button>
          </div>
        </header>

        <div class="content-area">
          <div id="menu-dashboard" class="menu-section">
            <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <h6 class="fw-bold m-0">Ringkasan Sistem</h6>
              <div class="d-flex align-items-center px-3 py-1 rounded-pill border" style="background-color: var(--card-bg);">
                <i class="bi bi-calendar-event text-primary me-2 small"></i>
                <input type="month" class="form-control form-control-sm border-0 bg-transparent shadow-none px-0" style="width: 110px" id="dashBulan" onchange="updateDashboardStats();" />
              </div>
            </div>
            <div class="row g-3 mb-4">
              <div class="col-md-3 col-6"><div class="stat-card blue"><i class="bi bi-people-fill stat-icon"></i><h6 class="fw-bold mb-1 small">Total Siswa</h6><h4 class="m-0 fw-bold" id="stat-total-siswa">0</h4></div></div>
              <div class="col-md-3 col-6"><div class="stat-card green"><i class="bi bi-check-circle-fill stat-icon"></i><h6 class="fw-bold mb-1 small">Total Hadir (Bulan Ini)</h6><h4 class="m-0 fw-bold" id="stat-hadir">0</h4></div></div>
              <div class="col-md-3 col-6"><div class="stat-card orange"><i class="bi bi-clock-fill stat-icon"></i><h6 class="fw-bold mb-1 small">Total Overtime</h6><h4 class="m-0 fw-bold" id="stat-overtime">0</h4></div></div>
              <div class="col-md-3 col-6"><div class="stat-card purple"><i class="bi bi-cash-stack stat-icon"></i><h6 class="fw-bold mb-1 small">Est. Pemasukan</h6><h4 class="m-0 fw-bold" id="stat-pemasukan">Rp 0</h4></div></div>
            </div>
            
            <div class="row g-3">
              <div class="col-lg-7 col-md-12">
                <div class="custom-card w-100 mb-0">
                  <div class="card-header-custom">Aktivitas Kehadiran Terakhir</div>
                  <div class="table-responsive">
                    <table class="table m-0" style="min-width: auto;">
                      <tbody id="body-aktivitas-terakhir"></tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="col-lg-5 col-md-12">
                <div class="custom-card p-4 text-center w-100 h-100 d-flex flex-column justify-content-center mb-0">
                  <h5 class="fw-bold">Jalankan Scanner</h5>
                  <p class="text-muted mb-3 small">Mulai pencatatan absensi siswa via kamera.</p>
                  <div><button class="btn btn-primary rounded-pill px-4 shadow-sm" onclick="switchMenu('menu-absen'); setTimeout(initScanner, 500);"><i class="bi bi-qr-code-scan"></i> Buka Kamera</button></div>
                </div>
              </div>
            </div>
          </div>

          <div id="menu-absen" class="menu-section d-none">
            <div class="row g-3">
              <!-- Kolom Scanner -->
              <div class="col-lg-7">
                <div class="custom-card p-3 h-100">
                  <ul class="nav nav-pills nav-fill mb-3" role="tablist">
                    <li class="nav-item"><button class="nav-link active py-2" data-bs-toggle="pill" data-bs-target="#nav-qr" onclick="initScanner()"><i class="bi bi-qr-code"></i> Scan QR</button></li>
                    <li class="nav-item"><button class="nav-link py-2" data-bs-toggle="pill" data-bs-target="#nav-manual" onclick="stopScanner()"><i class="bi bi-keyboard"></i> Manual</button></li>
                  </ul>
                  <div class="tab-content">
                    <div class="tab-pane fade show active text-center" id="nav-qr"><button class="btn btn-sm btn-outline-primary mb-3" onclick="initScanner()" id="btnMulaiKamera"><i class="bi bi-camera-video"></i> Mulai Kamera Scanner</button><div id="reader" style="width: 100%; min-height: 250px; margin: auto"></div></div>
                    <div class="tab-pane fade p-3" id="nav-manual">
                      <div class="mb-3">
                        <label class="form-label fw-bold small">Nama Siswa</label><div class="input-icon-wrapper mb-3"><i class="bi bi-person"></i><input type="text" class="form-control" list="listSiswaSuggestion" id="manualSiswa" placeholder="Ketik nama siswa..." /></div>
                        <label class="form-label fw-bold small">Tipe Kehadiran</label><select class="form-select" id="manualTipe"><option value="Hadir">Reguler (Hadir)</option><option value="Overtime">Khusus / Overtime</option></select>
                      </div>
                      <button class="btn btn-primary w-100 py-2 fw-bold" onclick="simpanManual()"><i class="bi bi-check-circle"></i> Catat Kehadiran</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Kolom Daftar Hadir Instan -->
              <div class="col-lg-5">
                <div class="custom-card p-3 h-100">
                  <h6 class="fw-bold mb-3 border-bottom pb-2"><i class="bi bi-clock-history text-primary"></i> Scan Berhasil (Hari Ini)</h6>
                  <div class="table-responsive" style="max-height: 350px; overflow-y: auto;">
                    <table class="table table-hover table-sm" style="min-width: auto;">
                      <tbody id="scanner-log-body">
                         <!-- Auto Populated by JS -->
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="menu-siswa" class="menu-section d-none">
            <div class="custom-card">
              <div class="card-header-custom"><span>Daftar Siswa Les</span>
                <div class="d-flex flex-wrap gap-2 justify-content-end">
                  <div class="dropdown">
                    <button class="btn btn-success btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown"><i class="bi bi-printer-fill"></i> <span class="d-none d-sm-inline">Cetak Massal</span></button>
                    <ul class="dropdown-menu dropdown-menu-end shadow-sm"><li><a class="dropdown-item" href="#" onclick="cetakMassalIDCard('semua')"><i class="bi bi-files"></i> Cetak Semua Siswa</a></li><li><a class="dropdown-item" href="#" onclick="cetakMassalIDCard('terpilih')"><i class="bi bi-ui-checks"></i> Cetak Terpilih Saja</a></li></ul>
                  </div>
                  <button class="btn btn-primary btn-sm" onclick="bukaModalSiswa()"><i class="bi bi-person-plus-fill"></i> <span class="d-none d-sm-inline">Tambah</span></button>
                </div>
              </div>
              <div class="p-3"><div class="input-icon-wrapper"><i class="bi bi-search"></i><input type="text" id="searchSiswa" class="form-control" list="listSiswaSuggestion" placeholder="Cari berdasarkan Nama atau Jenjang..." oninput="filterTabel('searchSiswa', 'tabelSiswa', [1, 2, 3, 4])" /></div></div>
              <div class="table-responsive"><table class="table table-hover" id="tabelSiswa"><thead><tr><th style="width: 40px"><input class="form-check-input" type="checkbox" onchange="toggleSemuaSiswa(this)" title="Pilih Semua"></th><th>ID</th><th>Nama Siswa</th><th>Wali / HP</th><th>Jenjang</th><th>Aksi</th></tr></thead><tbody id="body-tabel-siswa"></tbody></table></div>
            </div>
          </div>

          <div id="menu-tarif" class="menu-section d-none">
            <div class="custom-card">
              <div class="card-header-custom"><span>Daftar Grup Tarif Otomatis</span><button class="btn btn-primary btn-sm" onclick="openTarifModal()"><i class="bi bi-plus-lg"></i> <span class="d-none d-sm-inline">Tambah</span></button></div>
              <div class="table-responsive"><table class="table table-hover" id="tabelTarif"><thead><tr><th>Nama Grup Tarif</th><th>Jenjang Berlaku</th><th>Hari Berlaku</th><th>Tarif Reguler</th><th>Tarif Overtime</th><th>Aksi</th></tr></thead><tbody id="body-tabel-tarif"></tbody></table></div>
            </div>
          </div>

          <div id="menu-log" class="menu-section d-none">
            <div class="custom-card">
              <div class="card-header-custom">Riwayat Presensi & Nominal Lembur</div>
              <div class="p-3 border-bottom"><div class="row g-2"><div class="col-md-6"><div class="input-icon-wrapper"><i class="bi bi-search"></i><input type="text" id="searchLogName" list="listSiswaSuggestion" class="form-control" placeholder="Cari Nama Siswa..." oninput="filterLog()" /></div></div><div class="col-md-6"><div class="input-icon-wrapper"><i class="bi bi-calendar-month"></i><input type="month" id="searchLogBulan" class="form-control" onchange="filterLog()" /></div></div></div></div>
              <div class="table-responsive"><table class="table table-hover" id="tabelLog"><thead><tr><th>Nama Siswa</th><th>Total Sesi</th><th>Total Reguler</th><th>Total Overtime</th><th>Aksi</th></tr></thead><tbody id="body-tabel-log"></tbody></table></div>
            </div>
          </div>

          <div id="menu-laporan" class="menu-section d-none">
            <div class="custom-card">
              <div class="card-header-custom">
                <span>Rekapitulasi & Tagihan</span>
                <div class="d-flex flex-wrap gap-2">
                  <button class="btn btn-warning btn-sm" onclick="bukaModalTemplateWA()"><i class="bi bi-chat-left-text"></i> <span class="d-none d-sm-inline">Teks WA</span></button>
                  <button class="btn btn-info btn-sm text-white" onclick="bukaModalTemplateStruk()"><i class="bi bi-image"></i> <span class="d-none d-sm-inline">Teks Struk</span></button>
                  <button class="btn btn-success btn-sm" onclick="exportExcel('tabelInvoice', 'Laporan')"><i class="bi bi-file-earmark-excel"></i> <span class="d-none d-sm-inline">Export Excel</span></button>
                </div>
              </div>
              <div class="p-3 border-bottom" style="background-color: rgba(0, 0, 0, 0.02);">
                <div class="row g-2">
                  <div class="col-md-4"><div class="input-icon-wrapper"><i class="bi bi-search"></i><input type="text" id="searchLapName" list="listSiswaSuggestion" class="form-control" placeholder="Cari Nama Siswa..." oninput="filterLaporan()" /></div></div>
                  <div class="col-md-4"><div class="input-icon-wrapper"><i class="bi bi-calendar-month"></i><input type="month" id="searchLapBulan" class="form-control" onchange="filterLaporan()" /></div></div>
                  <div class="col-md-4">
                    <div class="input-icon-wrapper">
                      <i class="bi bi-funnel"></i>
                      <select id="searchLapStatus" class="form-select" onchange="filterLaporan()">
                        <option value="all">Semua Status</option>
                        <option value="Lunas">Sudah Lunas</option>
                        <option value="Belum">Belum Lunas</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="table-responsive"><table class="table table-hover" id="tabelInvoice"><thead><tr><th>Siswa</th><th>Nominal Reguler</th><th>Nominal Overtime</th><th>Total Tagihan</th><th>Status</th><th>Aksi</th></tr></thead><tbody id="body-tabel-laporan"></tbody></table></div>
            </div>
          </div>

          <div id="menu-role" class="menu-section d-none">
            <div class="custom-card p-4 text-center border-bottom-0 rounded-bottom-0 bg-primary-subtle text-primary"><h5 class="fw-bold m-0"><i class="bi bi-shield-lock"></i> Manajemen Hak Akses</h5></div>
            <div class="custom-card rounded-top-0">
              <div class="p-3 border-bottom text-end"><button class="btn btn-primary btn-sm" onclick="bukaModalRole('', '', true)"><i class="bi bi-plus-lg"></i> <span class="d-none d-sm-inline">Tambah User</span></button></div>
              <div class="table-responsive">
                <table class="table table-hover align-middle" id="tabelRole">
                  <thead><tr><th>Username</th><th>Nama Admin</th><th>Role Saat Ini</th><th>Aksi</th></tr></thead>
                  <tbody id="body-tabel-admin">
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <nav class="bottom-nav d-md-none" id="mobile-bottom-nav">
        <button class="nav-item-bottom active" onclick="switchMenu('menu-dashboard', this); setActiveBottomNav(this);"><i class="bi bi-grid-1x2-fill"></i><span>Home</span></button>
        <button class="nav-item-bottom" onclick="switchMenu('menu-siswa', this); setActiveBottomNav(this);"><i class="bi bi-people-fill"></i><span>Siswa</span></button>
        <button class="nav-scanner-center" onclick="switchMenu('menu-absen'); setTimeout(initScanner, 500); setActiveBottomNav(null);"><i class="bi bi-qr-code-scan"></i></button>
        <button class="nav-item-bottom" onclick="switchMenu('menu-laporan', this); setActiveBottomNav(this);"><i class="bi bi-receipt"></i><span>Invoice</span></button>
        <button class="nav-item-bottom" onclick="toggleSidebar()"><i class="bi bi-list"></i><span>Menu</span></button>
      </nav>
    </div>

    <!-- MODALS AREA -->
    <div class="modal fade" id="modalIDCard" tabindex="-1"><div class="modal-dialog modal-dialog-centered"><div class="modal-content" style="background-color: var(--card-bg)"><div class="modal-header border-0 pb-0"><h6 class="modal-title fw-bold">Kartu Tanda Siswa</h6><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body text-center pb-4"><div class="id-card-container" id="printable-id-card"><i class="bi bi-book-half id-card-bg-icon"></i><div class="id-card-details"><h5 class="fw-bold m-0" style="color: var(--primary-color)">Bimbel Bee</h5><div style="font-size: 0.65rem; color: var(--text-muted); margin-bottom: 6px;">Kartu Identitas Siswa Les</div><div class="fw-bold m-0" id="idcard-nama" style="font-size: 1.15rem; color: var(--text-main)">-</div><div style="font-size: 0.85rem; color: var(--text-main)"><strong id="idcard-id">-</strong></div><div style="font-size: 0.75rem; margin-top: 5px; color: var(--text-main)" id="idcard-jenjang">-</div><div style="font-size: 0.7rem; margin-top: 2px; color: var(--text-main)"><i class="bi bi-person"></i> <span id="idcard-wali">-</span></div><div style="font-size: 0.7rem; margin-top: 2px; color: var(--text-main)"><i class="bi bi-telephone"></i> <span id="idcard-hp">-</span></div></div><div class="id-card-qr"><img id="idcard-qr-img" src="" width="100%" height="100%" alt="QR" /></div></div><button class="btn btn-primary btn-sm w-100 mt-4" onclick="cetakIDCard()"><i class="bi bi-printer"></i> Cetak Layout Presisi (A4)</button></div></div></div></div>

    <div class="modal fade" id="modalSiswa" tabindex="-1"><div class="modal-dialog"><div class="modal-content" style="background-color: var(--card-bg)"><div class="modal-header border-bottom border-secondary-subtle"><h6 class="modal-title fw-bold">Form Data Siswa</h6><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body">
      <div class="input-icon-wrapper mb-3"><i class="bi bi-person"></i><input type="text" class="form-control" id="formNama" placeholder="Nama Lengkap Siswa" /></div>
      <div class="mb-3 ps-1"><label class="form-label small fw-bold text-muted mb-1">Jenis Kelamin Siswa</label><div class="d-flex gap-3"><div class="form-check"><input class="form-check-input" type="radio" name="genderSiswa" id="siswaL" value="L" checked><label class="form-check-label" for="siswaL">Laki-laki</label></div><div class="form-check"><input class="form-check-input" type="radio" name="genderSiswa" id="siswaP" value="P"><label class="form-check-label" for="siswaP">Perempuan</label></div></div></div>
      <div class="input-icon-wrapper mb-3"><i class="bi bi-mortarboard"></i><select class="form-select" id="selectJenjangSiswa" onchange="toggleInputLainnya(this.value)"></select></div><div class="input-icon-wrapper mb-3 d-none" id="inputJenjangLainnyaWrapper"><i class="bi bi-pencil"></i><input type="text" class="form-control" id="inputJenjangLainnya" placeholder="Ketik Jenjang Lainnya..." /></div>
      <hr class="text-muted opacity-25">
      <div class="input-icon-wrapper mb-3"><i class="bi bi-people"></i><input type="text" class="form-control" id="formWali" placeholder="Nama Lengkap Wali" /></div>
      <div class="mb-3 ps-1"><label class="form-label small fw-bold text-muted mb-1">Jenis Kelamin Wali</label><div class="d-flex gap-3"><div class="form-check"><input class="form-check-input" type="radio" name="genderWali" id="waliL" value="L" checked><label class="form-check-label" for="waliL">Laki-laki</label></div><div class="form-check"><input class="form-check-input" type="radio" name="genderWali" id="waliP" value="P"><label class="form-check-label" for="waliP">Perempuan</label></div></div></div>
      <div class="input-icon-wrapper mb-3"><i class="bi bi-whatsapp"></i><input type="text" class="form-control" id="formHP" placeholder="No WA Wali (0812...)" /></div>
      <div class="input-icon-wrapper position-relative"><i class="bi bi-key"></i><input type="password" class="form-control pe-5" id="formPin" placeholder="PIN Akses Wali (Angka)" /><i class="bi bi-eye-slash toggle-pw" id="togglePin" onclick="togglePassword('formPin', 'togglePin')"></i></div><small class="text-muted ms-2">PIN digunakan wali untuk melihat rincian di Portal Wali</small>
    </div><div class="modal-footer"><button type="button" class="btn btn-primary w-100" onclick="simpanSiswaBaruKeAPI()">Simpan Data</button></div></div></div></div>

    <div class="modal fade" id="modalTarif" tabindex="-1"><div class="modal-dialog"><div class="modal-content" style="background-color: var(--card-bg)"><div class="modal-header border-bottom border-secondary-subtle"><h6 class="modal-title fw-bold">Form Grup Tarif Otomatis</h6><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="input-icon-wrapper mb-3"><i class="bi bi-tag"></i><input type="text" class="form-control" id="tarifNama" placeholder="Nama Grup Tarif" /></div><label class="form-label small fw-bold">Jenjang Berlaku (Pilih >= 1)</label><div class="dropdown mb-3"><button class="form-select text-start" type="button" data-bs-toggle="dropdown" id="btnDropdownJenjang">Pilih Jenjang...</button><ul class="dropdown-menu w-100 dropdown-menu-checkboxes shadow" id="listJenjangDiv" onclick="event.stopPropagation()"></ul></div><div class="input-icon-wrapper mb-3 d-none" id="inputJenjangTarifLainnyaWrapper"><i class="bi bi-pencil"></i><input type="text" class="form-control" id="inputJenjangTarifLainnya" placeholder="Ketik Jenjang Lainnya (Bisa dipisah koma)..." /></div><label class="form-label small fw-bold">Hari Berlaku (Otomatis deteksi hari absen)</label><div class="dropdown mb-3"><button class="form-select text-start" type="button" data-bs-toggle="dropdown" id="btnDropdownHari">Pilih Hari...</button><ul class="dropdown-menu w-100 dropdown-menu-checkboxes shadow" id="listHariDiv" onclick="event.stopPropagation()"><li><div class="form-check"><input class="form-check-input" type="checkbox" value="Senin" id="hr1" onchange="updateBtnText('listHariDiv', 'btnDropdownHari', 'Pilih Hari...')"><label class="form-check-label w-100" for="hr1">Senin</label></div></li><li><div class="form-check"><input class="form-check-input" type="checkbox" value="Selasa" id="hr2" onchange="updateBtnText('listHariDiv', 'btnDropdownHari', 'Pilih Hari...')"><label class="form-check-label w-100" for="hr2">Selasa</label></div></li><li><div class="form-check"><input class="form-check-input" type="checkbox" value="Rabu" id="hr3" onchange="updateBtnText('listHariDiv', 'btnDropdownHari', 'Pilih Hari...')"><label class="form-check-label w-100" for="hr3">Rabu</label></div></li><li><div class="form-check"><input class="form-check-input" type="checkbox" value="Kamis" id="hr4" onchange="updateBtnText('listHariDiv', 'btnDropdownHari', 'Pilih Hari...')"><label class="form-check-label w-100" for="hr4">Kamis</label></div></li><li><div class="form-check"><input class="form-check-input" type="checkbox" value="Jumat" id="hr5" onchange="updateBtnText('listHariDiv', 'btnDropdownHari', 'Pilih Hari...')"><label class="form-check-label w-100" for="hr5">Jumat</label></div></li><li><div class="form-check"><input class="form-check-input" type="checkbox" value="Sabtu" id="hr6" onchange="updateBtnText('listHariDiv', 'btnDropdownHari', 'Pilih Hari...')"><label class="form-check-label w-100" for="hr6">Sabtu</label></div></li><li><div class="form-check"><input class="form-check-input" type="checkbox" value="Minggu" id="hr7" onchange="updateBtnText('listHariDiv', 'btnDropdownHari', 'Pilih Hari...')"><label class="form-check-label w-100" for="hr7">Minggu</label></div></li></ul></div><div class="row"><div class="col-6"><label class="form-label small fw-bold">Tarif Reguler</label><div class="input-icon-wrapper"><i class="bi bi-cash"></i><input type="number" class="form-control" id="tarifReg" value="0" /></div></div><div class="col-6"><label class="form-label small fw-bold">Tarif Overtime</label><div class="input-icon-wrapper"><i class="bi bi-cash-stack"></i><input type="number" class="form-control" id="tarifOver" value="0" /></div></div></div></div><div class="modal-footer"><button type="button" class="btn btn-primary w-100" onclick="simpanTarifKeAPI()">Simpan Tarif</button></div></div></div></div>

    <div class="modal fade" id="modalRole" tabindex="-1"><div class="modal-dialog modal-sm"><div class="modal-content" style="background-color: var(--card-bg)"><div class="modal-header border-bottom border-secondary-subtle"><h6 class="modal-title fw-bold">Hak Akses / Akun</h6><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body" id="roleCheckboxes"><div class="mb-3 input-icon-wrapper"><i class="bi bi-person"></i><input type="text" class="form-control form-control-sm" id="formAdminUser" placeholder="Username" /></div><div class="mb-3 input-icon-wrapper position-relative"><i class="bi bi-key"></i><input type="password" class="form-control form-control-sm pe-5" id="formAdminPass" placeholder="Password (Kosongi jk tdk ubah)" /><i class="bi bi-eye-slash toggle-pw" id="toggleAdminPass" onclick="togglePassword('formAdminPass', 'toggleAdminPass')"></i></div><div class="mb-3 input-icon-wrapper"><i class="bi bi-person-badge"></i><input type="text" class="form-control form-control-sm" id="formAdminNama" placeholder="Nama Lengkap Admin" /></div><div class="mb-3"><select class="form-select form-select-sm" id="formAdminRole"><option value="Admin Biasa">Admin Biasa</option><option value="SuperAdmin">SuperAdmin</option></select></div><hr /><div id="privilege-area" class="small"><div class="form-check form-switch mb-2"><input class="form-check-input role-cb" type="checkbox" id="cb-dashboard" checked /><label class="form-check-label ms-2" for="cb-dashboard">Dashboard</label></div><div class="form-check form-switch mb-2"><input class="form-check-input role-cb" type="checkbox" id="cb-absen" checked /><label class="form-check-label ms-2" for="cb-absen">Absensi</label></div><div class="form-check form-switch mb-2"><input class="form-check-input role-cb" type="checkbox" id="cb-siswa" checked /><label class="form-check-label ms-2" for="cb-siswa">Data Siswa</label></div><div class="form-check form-switch mb-2"><input class="form-check-input role-cb" type="checkbox" id="cb-tarif" /><label class="form-check-label ms-2" for="cb-tarif">Pengaturan Tarif</label></div><div class="form-check form-switch mb-2"><input class="form-check-input role-cb" type="checkbox" id="cb-log" checked /><label class="form-check-label ms-2" for="cb-log">Log Kehadiran</label></div><div class="form-check form-switch mb-2"><input class="form-check-input role-cb" type="checkbox" id="cb-laporan" checked /><label class="form-check-label ms-2" for="cb-laporan">Laporan</label></div><div class="form-check form-switch"><input class="form-check-input role-cb" type="checkbox" id="cb-role" /><label class="form-check-label ms-2" for="cb-role">Manajemen Role</label></div></div></div><div class="modal-footer"><button type="button" class="btn btn-primary btn-sm w-100" onclick="simpanAdminKeAPI()">Simpan Pengaturan</button></div></div></div></div>

    <div class="modal fade" id="modalTemplateWA" tabindex="-1"><div class="modal-dialog"><div class="modal-content" style="background-color: var(--card-bg)"><div class="modal-header border-bottom border-secondary-subtle"><h6 class="modal-title fw-bold"><i class="bi bi-whatsapp text-success"></i> Edit Template Pesan WA</h6><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="alert alert-info small mb-3 border-0 py-2"><strong>Gunakan kode berikut (akan diganti otomatis):</strong><br/><code class="user-select-all">[NAMA_WALI]</code>, <code class="user-select-all">[NAMA_SISWA]</code>, <code class="user-select-all">[BULAN]</code>, <code class="user-select-all">[TOTAL_SESI]</code>, <code class="user-select-all">[REGULER]</code>, <code class="user-select-all">[OVERTIME]</code>, <code class="user-select-all">[GRAND_TOTAL]</code>, <code class="user-select-all">[LINK]</code>, <code class="user-select-all">[REDAKSI_PELUNASAN]</code></div><textarea id="waTemplateInput" class="form-control" rows="12" style="font-size: 13px;"></textarea></div><div class="modal-footer"><button type="button" class="btn btn-success w-100" onclick="simpanTemplateWA()">Simpan Template WA</button></div></div></div></div>

    <!-- PERBAIKAN: Modal Custom Invoice -->
    <div class="modal fade" id="modalTemplateStruk" tabindex="-1"><div class="modal-dialog"><div class="modal-content" style="background-color: var(--card-bg)"><div class="modal-header border-bottom border-secondary-subtle"><h6 class="modal-title fw-bold"><i class="bi bi-image text-info"></i> Edit Catatan Struk Tagihan</h6><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="alert alert-info small mb-3 border-0 py-2">Catatan ini akan muncul di bagian paling bawah pada gambar Struk Tagihan yang dibagikan.</div><textarea id="strukTemplateInput" class="form-control" rows="4" style="font-size: 13px; text-align:center;"></textarea></div><div class="modal-footer"><button type="button" class="btn btn-info text-white w-100" onclick="simpanTemplateStruk()">Simpan Teks Struk</button></div></div></div></div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

    <script>
      const jenjangKelas = ["TK A", "TK B", "SD Kelas 1", "SD Kelas 2", "SD Kelas 3", "SD Kelas 4", "SD Kelas 5", "SD Kelas 6", "SMP Kelas 7", "SMP Kelas 8", "SMP Kelas 9", "SMA Kelas 10", "SMA Kelas 11", "SMA Kelas 12", "Umum"];

      let dataSiswa = [];
      let dataTarif = [];
      let dataLog = [];
      let dataAdmin = []; 
      let dataPembayaran = []; 
      
      let editSiswaId = null;
      let editTarifOldNama = null;
      let editAdminOldUser = null;
      let html5QrcodeScanner = null; 

      let lastScanValue = "";
      let lastScanTime = 0;

      let waTemplate = localStorage.getItem('waTemplate') || `Halo Bpk/Ibu *[NAMA_WALI]*, semoga senantiasa dalam keadaan sehat dan bahagia! 🙏\n\nKami dari *Bimbel Bee* menyampaikan rincian kehadiran dan tagihan les ananda *[NAMA_SISWA]* untuk periode *[BULAN]*.\n\n[ Rincian Belajar ]\n- Total Sesi: [TOTAL_SESI] Pertemuan\n- Nominal Reguler: Rp [REGULER]\n- Nominal Overtime: Rp [OVERTIME]\n\n*Total Tagihan: Rp [GRAND_TOTAL]*\n\nCek detail kehadiran dan unduh Invoice otomatis dengan mengklik tautan di bawah ini:\n[LINK]\n\n[REDAKSI_PELUNASAN]\n\nSalam hangat,\n*Admin Bimbel Bee* 😊`;
      
      let strukTemplateNote = localStorage.getItem('strukTemplateNote') || `Terima kasih atas kepercayaan Anda! ✨\nDicetak otomatis oleh Sistem Bimbel Bee.`;

      // Helper Password Eye Toggle
      function togglePassword(inputId, iconId) {
        const input = document.getElementById(inputId);
        const icon = document.getElementById(iconId);
        if(input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('bi-eye-slash'); icon.classList.add('bi-eye');
        } else {
            input.type = 'password';
            icon.classList.remove('bi-eye'); icon.classList.add('bi-eye-slash');
        }
      }

      function formatBulanIndo(yyyy_mm) {
          if(!yyyy_mm) return "";
          const p = yyyy_mm.split('-');
          if(p.length !== 2) return yyyy_mm;
          const mNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
          return `${mNames[parseInt(p[1])-1]} ${p[0]}`;
      }

      window.onload = async function () {
        const savedTheme = localStorage.getItem('theme') || 'light';
        const iconClass = savedTheme === "light" ? "bi bi-moon-fill" : "bi bi-sun-fill";
        document.querySelector("#themeToggleBtn i").className = iconClass;
        document.querySelector("#themeToggleBtnWali i").className = iconClass + " text-secondary";

        initUIComponents();
        await loadDataFromAPI();
        refreshAllUI();
        checkAutoLogin();
      };

      function sendToAPI(actionName, payloadData) {
        if (!GAS_URL) return;
        fetch(GAS_URL, {
            method: 'POST',
            body: JSON.stringify({ action: actionName, data: payloadData })
        })
        .then(res => res.json())
        .then(json => {
            if (json.status !== 'success') throw new Error(json.message || "Unknown Error");
        })
        .catch(e => {
            console.error("API Sync Error:", e);
            Swal.fire({ toast: true, position: "top-end", icon: "warning", title: "Sinkronisasi Cloud Gagal. Data tersimpan lokal.", showConfirmButton: false, timer: 3000 });
        });
      }

      async function refreshDataBtn() {
        document.getElementById('api-loader').classList.remove('d-none');
        document.getElementById('api-loader').style.opacity = '1';
        await loadDataFromAPI();
        refreshAllUI();
        if(!document.getElementById("pw-detail-view").classList.contains("d-none")) {
            renderDataWali();
        }
        Swal.fire({ toast: true, position: "top-end", icon: "success", title: "Data berhasil diperbarui!", showConfirmButton: false, timer: 1500 });
      }

      async function loadDataFromAPI() {
         if (!GAS_URL) {
             generateMockDataFallback();
             document.getElementById('api-loader').style.opacity = '0';
             setTimeout(() => document.getElementById('api-loader').classList.add('d-none'), 500);
             return;
         }

         try {
             const res = await fetch(GAS_URL + "?action=getData");
             const json = await res.json();
             
             if(json.status === 'success') {
                 dataSiswa = (json.data.siswa || []).map(s => { s.pin = String(s.pin); s.hp = String(s.hp); return s; });
                 dataTarif = (json.data.tarif || []).map(t => { t.reg = parseInt(t.reg) || 0; t.over = parseInt(t.over) || 0; return t; });
                 dataAdmin = json.data.admin || [];
                 dataPembayaran = json.data.pembayaran || []; 
                 dataLog = (json.data.log || []).map(l => {
                    if (!l.idLog) l.idLog = "log-" + Date.now() + Math.random().toString(36).substr(2, 5);
                    l.reg = parseInt(l.reg) || 0; l.over = parseInt(l.over) || 0;
                    if (l.bulan && l.bulan.length > 7) { try { const d = new Date(l.bulan); if (!isNaN(d.getTime())) l.bulan = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, '0'); } catch(e){} }
                    if (l.tgl && l.tgl.length > 20) { try { const d = new Date(l.tgl); if (!isNaN(d.getTime())) { const mNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"]; l.tgl = `${d.getDate().toString().padStart(2, '0')} ${mNames[d.getMonth()]} ${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`; } } catch(e){} }
                    return l;
                 });
             } else throw new Error(json.message);
         } catch(e) {
             Swal.fire("Koneksi Server Gagal", "Gagal menarik data dari Database Google Sheets. Menggunakan data lokal (Simulasi).", "warning");
             generateMockDataFallback();
         } finally {
             document.getElementById('api-loader').style.opacity = '0';
             setTimeout(() => document.getElementById('api-loader').classList.add('d-none'), 500);
         }
      }

      function generateMockDataFallback() {
        dataAdmin = [{ username: "admin_master", password: "123", nama: "Bapak Master", role: "SuperAdmin", privilege: "all" }];
        dataSiswa = [
          { id: "S-001", nama: "Callista Putri", genderSiswa: "P", wali: "Ibu Ana", genderWali: "P", hp: "081234567801", jenjang: "SD Kelas 5", pin: "1234" },
          { id: "S-002", nama: "M. Arkanza", genderSiswa: "L", wali: "Bpk Budi", genderWali: "L", hp: "081299998802", jenjang: "SMP Kelas 8", pin: "1234" }
        ];
        dataTarif = [{ nama: "TK All Days", jenjang: "TK A, TK B", hari: "Senin, Selasa, Rabu, Kamis, Jumat, Sabtu", reg: 25000, over: 35000 }];
        const curDateObj = new Date();
        const curYearMonth = curDateObj.getFullYear() + "-" + String(curDateObj.getMonth() + 1).padStart(2, '0');
        const mNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
        const curMonthName = mNames[curDateObj.getMonth()];
        const curYearStr = curDateObj.getFullYear();
        dataLog = [{ idLog: "log-1000", idSiswa: "S-001", nama: "Callista Putri", hari: "Senin", tgl: `05 ${curMonthName} ${curYearStr} 14:00`, status: "Hadir", reg: 35000, over: 0, bulan: curYearMonth, tglObj: new Date() }];
        dataPembayaran = [{ idTagihan: "S-001-" + curYearMonth, idSiswa: "S-001", bulan: curYearMonth, status: "Lunas" }];
      }

      function initUIComponents() {
        const dDate = new Date();
        const curMonth = dDate.getFullYear() + "-" + String(dDate.getMonth() + 1).padStart(2, '0');
        
        document.getElementById("dashBulan").value = curMonth;
        document.getElementById("pw-filter-bulan").value = curMonth;
        document.getElementById("searchLogBulan").value = curMonth;
        document.getElementById("searchLapBulan").value = curMonth;

        const listJenjangDiv = document.getElementById("listJenjangDiv");
        const selectJenjangSiswa = document.getElementById("selectJenjangSiswa");
        
        let jenjangCheckboxHtml = "", jenjangSelectHtml = "";
        jenjangKelas.forEach((j, i) => {
          jenjangCheckboxHtml += `<li><div class="form-check"><input class="form-check-input" type="checkbox" value="${j}" id="jk${i}" onchange="updateBtnText('listJenjangDiv','btnDropdownJenjang','Pilih Jenjang...')"><label class="form-check-label w-100" for="jk${i}">${j}</label></div></li>`;
          jenjangSelectHtml += `<option value="${j}">${j}</option>`;
        });
        jenjangCheckboxHtml += `<li><hr class="dropdown-divider"></li><li><div class="form-check"><input class="form-check-input" type="checkbox" value="Lainnya" id="jk_lainnya_tarif" onchange="toggleInputLainnyaTarif(this.checked); updateBtnText('listJenjangDiv','btnDropdownJenjang','Pilih Jenjang...')"><label class="form-check-label w-100" for="jk_lainnya_tarif">Lainnya (Ketik Manual)...</label></div></li>`;
        jenjangSelectHtml += `<option value="Lainnya">Lainnya (Ketik Manual)...</option>`;
        listJenjangDiv.innerHTML = jenjangCheckboxHtml;
        selectJenjangSiswa.innerHTML = jenjangSelectHtml;
      }

      function refreshAllUI() {
        renderSuggestions();
        renderTabelSiswa();
        renderTabelTarif();
        renderTabelAdmin();
        filterLog();
        filterLaporan();
        updateDashboardStats();
        renderScannerLogs(); 
      }

      function renderScannerLogs() {
        const tbody = document.getElementById("scanner-log-body");
        if(!tbody) return;
        const recentLogs = [...dataLog].sort((a, b) => b.idLog.localeCompare(a.idLog)).slice(0, 10); 
        let html = "";
        recentLogs.forEach(l => {
            let b = l.status === "Hadir" ? "success" : "warning";
            let jamSaja = l.tgl.split(' ')[3] || '';
            html += `<tr>
                <td class="align-middle"><div class="fw-bold">${l.nama}</div><small class="text-muted"><i class="bi bi-clock"></i> ${jamSaja} WIB</small></td>
                <td class="text-end align-middle"><span class="badge bg-${b} mb-1">${l.status}</span><br><button class="btn btn-sm btn-outline-danger py-0 px-2" style="font-size: 0.7rem;" onclick="hapusData('Log', '${l.idLog}')">Batal/Hapus</button></td>
            </tr>`;
        });
        if(html === "") html = `<tr><td colspan="2" class="text-center text-muted py-4">Belum ada scan hari ini.</td></tr>`;
        tbody.innerHTML = html;
      }

      async function checkAutoLogin() {
        const urlParams = new URLSearchParams(window.location.search);
        const autoId = urlParams.get('id');
        const autoBln = urlParams.get('bln');
        document.getElementById("portal-wali").classList.remove("d-none");

        if (autoId) {
            if(autoBln) document.getElementById("pw-filter-bulan").value = autoBln;
            const siswaAuto = dataSiswa.find(s => s.id === autoId);
            if (siswaAuto) {
                const { value: pin } = await Swal.fire({ 
                  title: "Masukkan PIN Keamanan", 
                  html: `<div class="input-icon-wrapper position-relative mx-auto" style="max-width: 250px;">
                            <i class="bi bi-key position-absolute top-50 translate-middle-y" style="left: 15px; color: #64748b; z-index: 10;"></i>
                            <input id="swal-pin" type="password" class="form-control ps-5 pe-5 text-center" placeholder="PIN Siswa" maxlength="4" style="height: 45px; font-size: 1.2rem; letter-spacing: 5px;">
                            <i class="bi bi-eye-slash position-absolute top-50 translate-middle-y toggle-pw" style="right: 15px; z-index: 10; cursor:pointer;" onclick="const pw = document.getElementById('swal-pin'); if(pw.type==='password'){pw.type='text'; this.classList.replace('bi-eye-slash','bi-eye');}else{pw.type='password'; this.classList.replace('bi-eye','bi-eye-slash');}"></i>
                         </div>`,
                  focusConfirm: false,
                  showCancelButton: true,
                  preConfirm: () => document.getElementById('swal-pin').value,
                  didOpen: () => { const inputSwal = document.getElementById('swal-pin'); if(inputSwal) { inputSwal.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); Swal.clickConfirm(); } }); } }
                });
                if (!pin) return; 
                if (pin !== siswaAuto.pin) return Swal.fire("Akses Ditolak", "PIN yang Anda masukkan salah!", "error");

                document.getElementById("pw-nama").innerText = siswaAuto.nama; document.getElementById("pw-id").innerText = siswaAuto.id; document.getElementById("pw-jenjang").innerText = siswaAuto.jenjang;
                document.getElementById("pw-qr").src = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${siswaAuto.id}`;
                document.getElementById("pw-search-view").classList.add("d-none");
                
                const detailView = document.getElementById("pw-detail-view");
                detailView.classList.remove("d-none"); detailView.classList.remove("fade-out");
                renderDataWali(); 
                Swal.fire({ toast: true, position: "top-end", icon: "success", title: `Selamat datang, Bpk/Ibu ${siswaAuto.wali}!`, showConfirmButton: false, timer: 3000 });
            }
        }
      }

      function hapusData(modul, id1, id2 = null) {
        Swal.fire({ title: "Hapus Data?", text: "Data ini akan dihapus dari Database Google Sheets secara permanen!", icon: "warning", showCancelButton: true, confirmButtonColor: "#ef4444", confirmButtonText: "Ya, Hapus!" }).then((result) => { 
          if (result.isConfirmed) { 
            let actionName = ''; let payloadData = {};
            if (modul === 'Siswa') { dataSiswa = dataSiswa.filter(s => s.id !== id1); actionName = 'hapusSiswa'; payloadData = { id: id1 }; } 
            else if (modul === 'Tarif') { dataTarif = dataTarif.filter(t => t.nama !== id1); actionName = 'hapusTarif'; payloadData = { nama: id1 }; } 
            else if (modul === 'Admin') { dataAdmin = dataAdmin.filter(a => a.username !== id1); actionName = 'hapusAdmin'; payloadData = { username: id1 }; } 
            else if (modul === 'Log') { dataLog = dataLog.filter(l => l.idLog !== id1); actionName = 'hapusLog'; payloadData = { idLog: id1 }; }
            refreshAllUI(); Swal.fire("Terhapus!", `Data ${modul} berhasil dihapus dari database.`, "success"); sendToAPI(actionName, payloadData);
          } 
        });
      }

      function updateDashboardStats() {
        const bln = document.getElementById("dashBulan").value;
        const filteredLogs = dataLog.filter(l => l.bulan === bln);

        document.getElementById("stat-total-siswa").innerText = dataSiswa.length;
        document.getElementById("stat-hadir").innerText = filteredLogs.filter(l => l.status === "Hadir").length;
        document.getElementById("stat-overtime").innerText = filteredLogs.filter(l => l.status === "Overtime").length;
        const estPemasukan = filteredLogs.reduce((sum, l) => sum + l.reg + l.over, 0);
        document.getElementById("stat-pemasukan").innerText = "Rp " + (estPemasukan / 1000).toLocaleString('id-ID') + "K";

        const tbodyAktivitas = document.getElementById("body-aktivitas-terakhir");
        const lastLogs = [...filteredLogs].sort((a,b) => b.idLog.localeCompare(a.idLog)).slice(0, 3);
        let htmlStr = "";
        lastLogs.forEach(l => {
           const siswa = dataSiswa.find(s => s.id === l.idSiswa);
           const b = l.status === "Hadir" ? "success" : "warning";
           htmlStr += `<tr><td><div class="fw-bold">${l.nama}</div><small class="text-muted">${siswa ? siswa.jenjang : ''}</small></td><td class="text-end"><span class="badge bg-${b}">${l.status}</span><br /><small class="text-muted">${l.tgl}</small></td></tr>`;
        });
        if(lastLogs.length === 0) htmlStr = `<tr><td colspan="2" class="text-center text-muted">Belum ada aktivitas di bulan ini.</td></tr>`;
        tbodyAktivitas.innerHTML = htmlStr;
      }

      function renderSuggestions() {
        const dlist = document.getElementById("listSiswaSuggestion");
        let htmlStr = "";
        dataSiswa.forEach((s) => { htmlStr += `<option value="${s.nama}">ID: ${s.id}</option>`; });
        dlist.innerHTML = htmlStr;
      }

      function renderTabelSiswa() {
        const tbody = document.getElementById("body-tabel-siswa");
        let htmlStr = "";
        dataSiswa.forEach((s) => {
          let gSiswa = s.genderSiswa ? `(${s.genderSiswa})` : '';
          let gWali = s.genderWali ? `(${s.genderWali})` : '';
          htmlStr += `<tr>
          <td data-label="Pilih"><input class="form-check-input cb-siswa" type="checkbox" value="${s.id}"></td>
          <td data-label="ID Siswa" class="fw-bold text-primary">${s.id}</td>
          <td data-label="Nama Siswa"><div class="fw-bold">${s.nama}</div><small class="text-muted">${gSiswa}</small></td>
          <td data-label="Wali & HP"><div>${s.wali} <small class="text-muted">${gWali}</small></div><small class="text-muted"><i class="bi bi-telephone"></i> ${s.hp}</small></td>
          <td data-label="Jenjang">${s.jenjang}</td>
          <td data-label="Aksi">
            <div class="d-flex gap-2 flex-wrap justify-content-end">
              <button class="btn btn-sm btn-outline-success" onclick="cetakIndividu('${s.id}')" title="Cetak Kartu"><i class="bi bi-printer"></i></button>
              <button class="btn btn-sm btn-outline-primary" onclick="showIDCard('${s.id}')" title="Lihat Kartu"><i class="bi bi-person-vcard"></i></button>
              <button class="btn btn-sm btn-outline-secondary" onclick="bukaModalSiswa('${s.id}')" title="Edit Data"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-sm btn-outline-danger" onclick="hapusData('Siswa', '${s.id}')" title="Hapus"><i class="bi bi-trash"></i></button>
            </div>
          </td>
        </tr>`;
        });
        tbody.innerHTML = htmlStr;
      }

      function renderTabelTarif() {
        const tbody = document.getElementById("body-tabel-tarif");
        let htmlStr = "";
        dataTarif.forEach((t, index) => {
          const jenjangHtml = t.jenjang.split(', ').map(j => `<span class="badge bg-secondary fw-normal">${j}</span>`).join('');
          const hariHtml = t.hari.split(', ').map(h => `<span class="badge bg-light text-dark border fw-normal">${h}</span>`).join('');
          htmlStr += `<tr>
          <td data-label="Nama Grup" class="fw-bold text-primary">${t.nama}</td>
          <td data-label="Jenjang Berlaku"><div class="d-flex flex-wrap justify-content-end gap-1">${jenjangHtml}</div></td>
          <td data-label="Hari Berlaku"><div class="d-flex flex-wrap justify-content-end gap-1">${hariHtml}</div></td>
          <td data-label="Tarif Reguler">Rp ${t.reg.toLocaleString("id-ID")}</td>
          <td data-label="Tarif Overtime">Rp ${t.over.toLocaleString("id-ID")}</td>
          <td data-label="Aksi">
            <div class="d-flex gap-2 flex-wrap justify-content-end">
              <button class="btn btn-sm btn-outline-secondary" onclick="editTarif(${index})"><i class="bi bi-pencil"></i></button> 
              <button class="btn btn-sm btn-outline-danger" onclick="hapusData('Tarif', '${t.nama}')"><i class="bi bi-trash"></i></button>
            </div>
          </td>
        </tr>`;
        });
        tbody.innerHTML = htmlStr;
      }

      function renderTabelAdmin() {
        const tbody = document.getElementById("body-tabel-admin");
        let htmlStr = "";
        dataAdmin.forEach((a) => {
          const badgeClass = a.role === 'SuperAdmin' ? 'dark' : 'secondary';
          htmlStr += `<tr>
            <td data-label="Username" class="fw-bold text-primary">${a.username}</td>
            <td data-label="Nama Admin">${a.nama}</td>
            <td data-label="Role"><span class="badge bg-${badgeClass}">${a.role}</span></td>
            <td data-label="Aksi">
              <div class="d-flex gap-2 flex-wrap justify-content-end">
                <button class="btn btn-sm btn-primary" onclick="bukaModalRole('${a.username}', '${a.role}')"><i class="bi bi-gear"></i> <span class="d-none d-md-inline">Privilege</span></button>
                <button class="btn btn-sm btn-outline-danger" onclick="hapusData('Admin', '${a.username}')" ${a.role==='SuperAdmin' ? 'disabled' : ''}><i class="bi bi-trash"></i></button>
              </div>
            </td>
          </tr>`;
        });
        tbody.innerHTML = htmlStr;
      }

      function filterTabel(inputId, tableId, colIndices) {
        const input = document.getElementById(inputId).value.toLowerCase();
        const rows = document.querySelectorAll(`#${tableId} tbody > tr`);
        rows.forEach(row => {
          if (row.classList.contains("collapse")) return; 
          let text = "";
          colIndices.forEach(idx => { if(row.cells[idx]) text += row.cells[idx].textContent.toLowerCase() + " "; });
          row.style.display = text.includes(input) ? "" : "none";
        });
      }

      // PERBAIKAN: Accordion Grouping untuk Log Kehadiran
      function filterLog() {
        const srcName = document.getElementById("searchLogName").value.toLowerCase();
        const bln = document.getElementById("searchLogBulan").value;
        const tbody = document.getElementById("body-tabel-log");
        let htmlStr = "";
        let grouped = {};

        dataLog.filter((l) => l.nama.toLowerCase().includes(srcName) && l.bulan === bln).forEach((l) => {
            if (!grouped[l.idSiswa]) grouped[l.idSiswa] = { nama: l.nama, reg: 0, over: 0, details: [] };
            grouped[l.idSiswa].reg += l.reg; grouped[l.idSiswa].over += l.over; grouped[l.idSiswa].details.push(l);
        });

        Object.keys(grouped).forEach((k) => {
            let g = grouped[k];
            let idRow = "logdet-" + k;
            let detailHtml = "";

            g.details.forEach(d => {
                let b = d.status === "Hadir" ? "success" : "warning";
                let tglPart = d.tgl.split(' ');
                let tglSaja = tglPart.slice(0, 3).join(' ');
                let jamSaja = tglPart[3] || '';

                detailHtml += `
                <div class="d-flex flex-column border-bottom border-secondary-subtle py-2">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <div>
                            <span class="fw-bold text-primary" style="font-size:0.85rem;">${d.hari}, ${tglSaja}</span> <small class="text-muted">${jamSaja} WIB</small>
                        </div>
                        <div>
                            <span class="badge bg-${b}">${d.status}</span>
                            <button class="btn btn-sm btn-outline-danger py-0 px-1 ms-2" onclick="hapusData('Log', '${d.idLog}')"><i class="bi bi-trash"></i></button>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between flex-wrap gap-2 mt-1">
                       <small class="text-muted">Tarif Reguler: <span class="editable-cell text-primary fw-bold" contenteditable="true" onblur="updateLogHarga(this, 'reg', '${d.idLog}')">Rp ${d.reg.toLocaleString("id-ID")}</span></small>
                       <small class="text-muted">Tarif Overtime: <span class="editable-cell text-primary fw-bold" contenteditable="true" onblur="updateLogHarga(this, 'over', '${d.idLog}')">Rp ${d.over.toLocaleString("id-ID")}</span></small>
                    </div>
                </div>`;
            });

            htmlStr += `
            <tr>
              <td data-label="Nama Siswa"><div class="fw-bold text-primary">${g.nama}</div><small class="text-muted">${k}</small></td>
              <td data-label="Total Sesi">${g.details.length} Pertemuan</td>
              <td data-label="Total Reguler">Rp ${g.reg.toLocaleString("id-ID")}</td>
              <td data-label="Total Overtime">Rp ${g.over.toLocaleString("id-ID")}</td>
              <td data-label="Aksi">
                <div class="d-flex gap-2 justify-content-end"><button class="btn btn-sm btn-outline-secondary" data-bs-toggle="collapse" data-bs-target="#${idRow}"><i class="bi bi-chevron-down"></i> Rincian</button></div>
              </td>
            </tr>
            <tr id="${idRow}" class="collapse bg-transparent">
              <td colspan="5">
                <div class="card card-body border-0 p-3 shadow-sm rounded-3 mt-2" style="background-color: var(--bg-color);">
                  <small class="fw-bold mb-2 text-primary border-bottom pb-2"><i class="bi bi-clock-history"></i> Rincian & Edit Tarif per Sesi</small>
                  ${detailHtml}
                </div>
              </td>
            </tr>`;
        });
        
        if(htmlStr === "") htmlStr = `<tr><td colspan="5" class="text-center text-muted">Tidak ada data kehadiran pada bulan ini.</td></tr>`;
        tbody.innerHTML = htmlStr;
      }

      function updateLogHarga(element, type, idLog) {
        let val = element.innerText.replace(/[^0-9]/g, "");
        if (val === "") val = "0";
        let parsedVal = parseInt(val);
        element.innerText = "Rp " + parsedVal.toLocaleString("id-ID");
        
        const logIndex = dataLog.findIndex(l => l.idLog === idLog);
        if(logIndex > -1) {
            if(type === 'reg') dataLog[logIndex].reg = parsedVal;
            else dataLog[logIndex].over = parsedVal;
            sendToAPI('editLog', dataLog[logIndex]);
        }
        Swal.fire({ toast: true, position: "top-end", icon: "success", title: "Nominal diperbarui di Database!", showConfirmButton: false, timer: 1500 });
      }

      // === PENCATATAN ABSENSI (SCAN & MANUAL) ===
      async function catatKehadiran(identifier, method, tipeManual = null) {
        let siswa = null;
        if(method === 'Scanner') siswa = dataSiswa.find(s => s.id === identifier);
        else siswa = dataSiswa.find(s => s.nama.toLowerCase() === identifier.toLowerCase());

        if(!siswa) return Swal.fire("Oops", "Data siswa tidak ditemukan di database!", "error");

        const curDateObj = new Date();
        const curYearMonth = curDateObj.getFullYear() + "-" + String(curDateObj.getMonth() + 1).padStart(2, '0'); 
        const mNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
        const curMonthName = mNames[curDateObj.getMonth()];
        const curYearStr = curDateObj.getFullYear();
        const hariHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const hariName = hariHari[curDateObj.getDay()];
        let jam = curDateObj.getHours().toString().padStart(2, '0');
        let mnt = curDateObj.getMinutes().toString().padStart(2, '0');
        const tglStr = `${curDateObj.getDate().toString().padStart(2, '0')} ${curMonthName} ${curYearStr} ${jam}:${mnt}`;

        let tarifReg = 30000, tarifOver = 45000;
        let matchedTarif = dataTarif.find(t => t.jenjang.includes(siswa.jenjang) && t.hari.includes(hariName));
        if(!matchedTarif) matchedTarif = dataTarif.find(t => t.jenjang.includes(siswa.jenjang));
        if (matchedTarif) { tarifReg = matchedTarif.reg; tarifOver = matchedTarif.over; }

        let status = "Hadir";
        if(tipeManual === 'Overtime') status = "Overtime";

        const newLog = {
            idLog: "log-" + Date.now().toString(), 
            idSiswa: siswa.id, nama: siswa.nama, hari: hariName, tgl: tglStr,
            status: status, reg: status === "Hadir" ? tarifReg : 0, over: status === "Overtime" ? tarifOver : 0,
            bulan: curYearMonth, tglObj: curDateObj
        };

        dataLog.push(newLog);
        dataLog.sort((a, b) => b.tglObj - a.tglObj);
        refreshAllUI(); 

        Swal.fire({ icon: "success", title: "Berhasil Absen!", text: `Kehadiran ${siswa.nama} berhasil dicatat ke Database.`, timer: 2000, showConfirmButton: false });
        sendToAPI('tambahLog', newLog);
      }

      function initScanner() {
        document.getElementById("btnMulaiKamera").style.display = "none";
        if (!html5QrcodeScanner) {
          html5QrcodeScanner = new Html5QrcodeScanner(
             "reader", { fps: 30, qrbox: { width: 250, height: 250 }, disableFlip: false }, false
          );
          html5QrcodeScanner.render((decodedText) => { 
              const currentTime = Date.now();
              if (decodedText === lastScanValue && (currentTime - lastScanTime) < 3000) return; 
              lastScanValue = decodedText; lastScanTime = currentTime;
              catatKehadiran(decodedText, 'Scanner');
            }, () => {} 
          );
        }
      }
      function stopScanner() { if (html5QrcodeScanner) { html5QrcodeScanner.clear().then(() => { html5QrcodeScanner = null; document.getElementById("btnMulaiKamera").style.display = "inline-block"; }).catch((e) => console.log(e)); } }

      function simpanManual() { 
          const manualSiswa = document.getElementById("manualSiswa").value;
          const manualTipe = document.getElementById("manualTipe").value;
          if (!manualSiswa) return Swal.fire("Oops", "Pilih siswa!", "warning"); 
          catatKehadiran(manualSiswa, 'Manual', manualTipe);
      }

      // --- ADMIN CRUD ---
      function bukaModalRole(user, role, isNew = false) {
        if (isNew) { 
          editAdminOldUser = null;
          document.querySelector("#modalRole .modal-title").innerText = "Tambah Admin Baru"; 
          document.getElementById("formAdminUser").value = "";
          document.getElementById("formAdminPass").value = "";
          document.getElementById("formAdminNama").value = "";
        } else { 
          editAdminOldUser = user;
          document.querySelector("#modalRole .modal-title").innerText = `Edit Privilege: ${user}`; 
          const existing = dataAdmin.find(a => a.username === user);
          if (existing) {
             document.getElementById("formAdminUser").value = existing.username;
             document.getElementById("formAdminPass").value = ""; 
             document.getElementById("formAdminNama").value = existing.nama;
             document.getElementById("formAdminRole").value = existing.role;
          }
        }
        new bootstrap.Modal(document.getElementById("modalRole")).show();
      }

      function simpanAdminKeAPI() {
         const usr = document.getElementById("formAdminUser").value;
         const pass = document.getElementById("formAdminPass").value;
         const nama = document.getElementById("formAdminNama").value;
         const role = document.getElementById("formAdminRole").value;

         if(!usr || !nama) return Swal.fire("Oops", "Username dan Nama wajib diisi!", "warning");
         if(!editAdminOldUser && !pass) return Swal.fire("Oops", "Mohon isikan password untuk akun baru!", "warning");

         if(editAdminOldUser) {
            const index = dataAdmin.findIndex(a => a.username === editAdminOldUser);
            if (index > -1) {
                const updatedAdmin = { username: usr, password: pass || dataAdmin[index].password, nama: nama, role: role, privilege: "all" };
                dataAdmin[index] = updatedAdmin;
                sendToAPI('editAdmin', { ...updatedAdmin, oldUsername: editAdminOldUser });
            }
         } else {
            const newAdmin = { username: usr, password: pass, nama: nama, role: role, privilege: "all" };
            dataAdmin.push(newAdmin); 
            sendToAPI('tambahAdmin', newAdmin);
         }
         refreshAllUI(); simpanLaluTutup('modalRole', 'Data Akun Admin');
      }

      // --- SISWA CRUD ---
      function bukaModalSiswa(id = null) { 
        editSiswaId = id; 
        const modalTitle = document.querySelector("#modalSiswa .modal-title");

        if (id) {
          modalTitle.innerText = "Edit Data Siswa";
          const siswa = dataSiswa.find(s => s.id === id);
          if(siswa) {
            document.getElementById("formNama").value = siswa.nama;
            document.getElementById("formWali").value = siswa.wali;
            document.getElementById("formHP").value = siswa.hp;
            document.getElementById("formPin").value = siswa.pin;
            if(siswa.genderSiswa === 'P') document.getElementById("siswaP").checked = true; else document.getElementById("siswaL").checked = true;
            if(siswa.genderWali === 'P') document.getElementById("waliP").checked = true; else document.getElementById("waliL").checked = true;

            if (!jenjangKelas.includes(siswa.jenjang)) {
              document.getElementById("selectJenjangSiswa").value = "Lainnya"; toggleInputLainnya("Lainnya"); document.getElementById("inputJenjangLainnya").value = siswa.jenjang;
            } else { document.getElementById("selectJenjangSiswa").value = siswa.jenjang; toggleInputLainnya(siswa.jenjang); }
          }
        } else {
          modalTitle.innerText = "Tambah Data Siswa Baru";
          document.getElementById("formNama").value = ""; document.getElementById("formWali").value = ""; document.getElementById("formHP").value = ""; document.getElementById("formPin").value = "";
          document.getElementById("siswaL").checked = true; document.getElementById("waliL").checked = true; document.getElementById("selectJenjangSiswa").selectedIndex = 0;
          document.getElementById("inputJenjangLainnyaWrapper").classList.add("d-none"); document.getElementById("inputJenjangLainnya").value = "";
        }
        new bootstrap.Modal(document.getElementById("modalSiswa")).show(); 
      }

      function simpanSiswaBaruKeAPI() {
         const nama = document.getElementById("formNama").value;
         const genderSiswa = document.querySelector('input[name="genderSiswa"]:checked').value;
         let jenjang = document.getElementById("selectJenjangSiswa").value;
         if(jenjang === "Lainnya") jenjang = document.getElementById("inputJenjangLainnya").value;
         const wali = document.getElementById("formWali").value;
         const genderWali = document.querySelector('input[name="genderWali"]:checked').value;
         const hp = document.getElementById("formHP").value;
         const pin = document.getElementById("formPin").value;

         if(!nama || !wali) return Swal.fire("Oops", "Nama dan Wali wajib diisi!", "warning");

         if (editSiswaId) {
            const index = dataSiswa.findIndex(s => s.id === editSiswaId);
            if (index > -1) {
               dataSiswa[index] = { id: editSiswaId, nama, genderSiswa, wali, genderWali, hp, jenjang, pin };
               sendToAPI('editSiswa', dataSiswa[index]);
            }
         } else {
            const newId = "S-" + String(dataSiswa.length + 1).padStart(3, '0');
            const newSiswa = { id: newId, nama: nama, genderSiswa: genderSiswa, wali: wali, genderWali: genderWali, hp: hp, jenjang: jenjang, pin: pin };
            dataSiswa.push(newSiswa); 
            sendToAPI('tambahSiswa', newSiswa);
         }
         refreshAllUI(); simpanLaluTutup('modalSiswa', 'Data Siswa Terkirim ke DB');
      }

      // --- TARIF CRUD ---
      function openTarifModal() {
        editTarifOldNama = null;
        document.querySelector("#modalTarif .modal-title").innerText = "Tambah Grup Tarif Otomatis";
        document.getElementById("tarifNama").value = ""; document.getElementById("tarifReg").value = "0"; document.getElementById("tarifOver").value = "0";
        document.querySelectorAll('#modalTarif .form-check-input').forEach(cb => cb.checked = false);
        document.getElementById("btnDropdownJenjang").innerText = "Pilih Jenjang..."; document.getElementById("btnDropdownHari").innerText = "Pilih Hari...";
        document.getElementById("inputJenjangTarifLainnyaWrapper").classList.add("d-none"); document.getElementById("inputJenjangTarifLainnya").value = "";
        new bootstrap.Modal(document.getElementById("modalTarif")).show();
      }

      function editTarif(index) {
        const t = dataTarif[index];
        editTarifOldNama = t.nama;
        document.querySelector("#modalTarif .modal-title").innerText = "Edit Grup Tarif Otomatis";
        document.getElementById("tarifNama").value = t.nama; document.getElementById("tarifReg").value = t.reg; document.getElementById("tarifOver").value = t.over;
        const arrJenjang = t.jenjang.split(', ');
        document.querySelectorAll('#listJenjangDiv .form-check-input').forEach(cb => { if (cb.value !== "Lainnya") { cb.checked = arrJenjang.includes(cb.value); } });
        const unknownJenjang = arrJenjang.filter(j => !jenjangKelas.includes(j));
        if (unknownJenjang.length > 0) { const cbLainnya = document.getElementById("jk_lainnya_tarif"); if(cbLainnya) cbLainnya.checked = true; toggleInputLainnyaTarif(true); document.getElementById("inputJenjangTarifLainnya").value = unknownJenjang.join(', ');
        } else { const cbLainnya = document.getElementById("jk_lainnya_tarif"); if(cbLainnya) cbLainnya.checked = false; toggleInputLainnyaTarif(false); }
        updateBtnText('listJenjangDiv', 'btnDropdownJenjang', 'Pilih Jenjang...');
        const arrHari = t.hari.split(', '); document.querySelectorAll('#listHariDiv .form-check-input').forEach(cb => { cb.checked = arrHari.includes(cb.value); });
        updateBtnText('listHariDiv', 'btnDropdownHari', 'Pilih Hari...');
        new bootstrap.Modal(document.getElementById("modalTarif")).show();
      }

      function simpanTarifKeAPI() {
         const nama = document.getElementById("tarifNama").value;
         const reg = parseInt(document.getElementById("tarifReg").value) || 0;
         const over = parseInt(document.getElementById("tarifOver").value) || 0;
         
         let jenjangChecks = Array.from(document.querySelectorAll('#listJenjangDiv .form-check-input:checked')).map(cb => cb.value);
         if(jenjangChecks.includes("Lainnya")) {
             jenjangChecks = jenjangChecks.filter(j => j !== "Lainnya");
             const l = document.getElementById("inputJenjangTarifLainnya").value;
             if(l) jenjangChecks.push(l);
         }
         const jenjangStr = jenjangChecks.join(", ");
         const hariStr = Array.from(document.querySelectorAll('#listHariDiv .form-check-input:checked')).map(cb => cb.value).join(", ");

         if(!nama) return Swal.fire("Oops", "Nama grup tarif wajib diisi!", "warning");

         if(editTarifOldNama) {
            const index = dataTarif.findIndex(t => t.nama === editTarifOldNama);
            if (index > -1) {
                dataTarif[index] = { nama, jenjang: jenjangStr, hari: hariStr, reg, over };
                sendToAPI('editTarif', { oldNama: editTarifOldNama, nama, jenjang: jenjangStr, hari: hariStr, reg, over });
            }
         } else {
            const newTarif = { nama, jenjang: jenjangStr, hari: hariStr, reg, over };
            dataTarif.push(newTarif);
            sendToAPI('tambahTarif', newTarif);
         }
         refreshAllUI(); simpanLaluTutup('modalTarif', 'Data Tarif DB');
      }

      // --- LAPORAN & COMPACT INVOICE ---
      function filterLaporan() {
        const srcName = document.getElementById("searchLapName").value.toLowerCase();
        const bln = document.getElementById("searchLapBulan").value;
        const statusFilter = document.getElementById("searchLapStatus").value;
        const tbody = document.getElementById("body-tabel-laporan");
        let htmlStr = "";
        let grouped = {};
        
        dataLog.filter((l) => l.nama.toLowerCase().includes(srcName) && l.bulan === bln).forEach((l) => {
            if (!grouped[l.idSiswa]) grouped[l.idSiswa] = { nama: l.nama, reg: 0, over: 0, details: [] };
            grouped[l.idSiswa].reg += l.reg; grouped[l.idSiswa].over += l.over; grouped[l.idSiswa].details.push(l);
        });

        Object.keys(grouped).forEach((k) => {
          let isLunas = dataPembayaran.some(p => p.idSiswa === k && p.bulan === bln && p.status === 'Lunas');
          
          if (statusFilter === 'Lunas' && !isLunas) return;
          if (statusFilter === 'Belum' && isLunas) return;

          let g = grouped[k]; let tot = g.reg + g.over; let idRow = "det-" + k; let detailHtml = "";
          
          let statusBadge = isLunas ? '<span class="badge bg-success">Lunas</span>' : '<span class="badge bg-danger">Belum</span>';
          let btnLunasClass = isLunas ? 'btn-outline-danger' : 'btn-outline-success';
          let btnLunasIcon = isLunas ? 'bi-x-circle' : 'bi-check-circle';
          let btnLunasText = isLunas ? 'Batal Lunas' : 'Set Lunas';

          g.details.forEach((d) => {
            let typeClass = d.status === "Hadir" ? "text-success" : "text-warning fw-bold";
            let tglPart = d.tgl.split(' ');
            let tglSaja = `${tglPart[0]} ${tglPart[1]}`;
            let jamSaja = tglPart[3] || '';
            
            detailHtml += `
            <div class="d-flex justify-content-between align-items-center border-bottom border-secondary-subtle py-2">
                <div class="text-start">
                    <div class="fw-bold" style="font-size:0.85rem;">${d.hari}, ${tglSaja}</div>
                    <small class="text-muted">${jamSaja} WIB</small>
                </div>
                <div class="text-end">
                    <div class="${typeClass}" style="font-size:0.8rem;"><i class="bi bi-circle-fill small"></i> ${d.status}</div>
                    <div class="fw-bold text-primary" style="font-size:0.85rem;">Rp ${(d.status === "Hadir" ? d.reg : d.over).toLocaleString("id-ID")}</div>
                </div>
            </div>`;
          });
          
          htmlStr += `
          <tr>
            <td data-label="Nama Siswa"><div class="fw-bold text-primary">${g.nama}</div><small class="text-muted">${k}</small></td>
            <td data-label="Total Reguler">Rp ${g.reg.toLocaleString("id-ID")}</td>
            <td data-label="Total Overtime">Rp ${g.over.toLocaleString("id-ID")}</td>
            <td data-label="Tagihan Total" class="fw-bold text-danger">Rp ${tot.toLocaleString("id-ID")}</td>
            <td data-label="Status">${statusBadge}</td>
            <td data-label="Aksi">
              <div class="d-flex gap-2 flex-wrap justify-content-end">
                <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="collapse" data-bs-target="#${idRow}"><i class="bi bi-chevron-down"></i> <span class="d-none d-md-inline">Detail</span></button>
                <button class="btn btn-sm ${btnLunasClass}" onclick="toggleLunas('${k}', '${bln}')"><i class="bi ${btnLunasIcon}"></i> <span class="d-none d-md-inline">${btnLunasText}</span></button>
                <button class="btn btn-sm btn-primary" onclick="kirimTagihanLengkap('${k}')" title="Kirim Gambar Struk ke WA"><i class="bi bi-share"></i> <span class="d-none d-md-inline">Share Struk</span></button>
                <button class="btn btn-sm btn-success" onclick="kirimWA('${k}')" title="Hanya Copy Teks WA"><i class="bi bi-whatsapp"></i> <span class="d-none d-md-inline">WA</span></button>
              </div>
            </td>
          </tr>
          <tr id="${idRow}" class="collapse bg-transparent">
            <td colspan="6">
              <div class="card card-body border-0 p-3 shadow-sm rounded-3 mt-2" style="background-color: var(--bg-color);">
                <small class="fw-bold mb-2 text-primary border-bottom pb-2"><i class="bi bi-list-check"></i> Rincian Sesi Kehadiran</small>
                <div class="rincian-list">
                    ${detailHtml}
                </div>
                <div class="text-end mt-2"><button class="btn btn-sm btn-outline-primary" onclick="cetakInvoice('${k}')"><i class="bi bi-file-pdf"></i> Download PDF Invoice</button></div>
              </div>
            </td>
          </tr>`;
        });
        if(htmlStr === "") htmlStr = `<tr><td colspan="6" class="text-center text-muted">Tidak ada rincian tagihan pada pencarian ini.</td></tr>`;
        tbody.innerHTML = htmlStr;
      }

      function toggleLunas(idSiswa, bln) {
        const idTagihan = idSiswa + "-" + bln;
        const isLunas = dataPembayaran.some(p => p.idTagihan === idTagihan);
        
        const txtWarning = isLunas ? "Anda yakin ingin <b>MEMBATALKAN</b> status pelunasan untuk tagihan bulan ini?" : "Anda yakin ingin menandai tagihan bulan ini sebagai <b>LUNAS</b>?";
        const btnLunas = isLunas ? "Ya, Batalkan Lunas" : "Ya, Tandai Lunas";
        const iconType = isLunas ? "warning" : "question";

        Swal.fire({ 
            title: "Konfirmasi Pelunasan", html: txtWarning, icon: iconType, 
            showCancelButton: true, confirmButtonColor: isLunas ? "#ef4444" : "#10b981", 
            confirmButtonText: btnLunas, cancelButtonText: "Tutup" 
        }).then((result) => {
            if (result.isConfirmed) {
                if (isLunas) {
                    const index = dataPembayaran.findIndex(p => p.idTagihan === idTagihan);
                    dataPembayaran.splice(index, 1);
                    sendToAPI('hapusPembayaran', { idTagihan: idTagihan });
                    Swal.fire({ toast: true, position: 'top-end', icon: 'info', title: 'Status diubah ke Belum Lunas', showConfirmButton: false, timer: 2000 });
                } else {
                    const newBayar = { idTagihan: idTagihan, idSiswa: idSiswa, bulan: bln, status: 'Lunas' };
                    dataPembayaran.push(newBayar);
                    sendToAPI('tambahPembayaran', newBayar);
                    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Tagihan ditandai Lunas!', showConfirmButton: false, timer: 2000 });
                }
                filterLaporan(); 
                if (!document.getElementById("pw-detail-view").classList.contains("d-none")) renderDataWali();
            }
        });
      }

      function cetakInvoice(idSiswa) {
        const bln = document.getElementById("searchLapBulan").value;
        const namaBulan = formatBulanIndo(bln);
        const logs = dataLog.filter(l => l.idSiswa === idSiswa && l.bulan === bln);
        const siswa = dataSiswa.find(s => s.id === idSiswa);
        if(!siswa || logs.length === 0) return Swal.fire("Oops", "Data tagihan tidak ditemukan", "error");

        let totalReg = 0, totalOver = 0, detailHtml = '';
        logs.forEach(l => {
          totalReg += l.reg; totalOver += l.over;
          let tar = l.status === "Hadir" ? l.reg : l.over;
          let tglParts = l.tgl.split(' '); 
          let tglSaja = tglParts.slice(0, 3).join(' '); 
          let jamSaja = tglParts[3] || '';
          detailHtml += `<tr><td><div style="font-weight: 600;">${l.hari}, ${tglSaja}</div><div style="color: #64748b; font-size: 9px; margin-top: 2px;">Pukul ${jamSaja} WIB</div></td><td>${l.status}</td><td class="text-right">Rp ${tar.toLocaleString("id-ID")}</td></tr>`;
        });
        let grandTotal = totalReg + totalOver;
        let tglCetak = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
        
        let isLunas = dataPembayaran.some(p => p.idSiswa === idSiswa && p.bulan === bln && p.status === 'Lunas');
        let statusTagihanHtml = isLunas 
            ? `<div style="margin-top: 10px; color: #10b981; font-weight: bold; font-size: 16px; border: 2px solid #10b981; padding: 5px; text-align: center; border-radius: 5px;">LUNAS</div>` 
            : `<div style="margin-top: 10px; color: #ef4444; font-weight: bold; font-size: 16px; border: 2px solid #ef4444; padding: 5px; text-align: center; border-radius: 5px;">BELUM LUNAS</div>`;

        const strukNoteHtml = strukTemplateNote.replace(/\n/g, '<br>');

        const invoiceHTML = `<html><head><title>Invoice - ${siswa.nama}</title><style>@page { size: A5 portrait; margin: 15mm; } body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; color: #333; line-height: 1.4; -webkit-print-color-adjust: exact; print-color-adjust: exact; } .invoice-box { max-width: 100%; margin: auto; } .header-table { width: 100%; margin-bottom: 20px; border-bottom: 2px solid #0084ff; padding-bottom: 10px; } .header-table td { vertical-align: top; } .title { font-size: 20px; font-weight: bold; color: #0084ff; letter-spacing: 1px; } .subtitle { font-size: 10px; color: #64748b; } .info-table { width: 100%; margin-bottom: 20px; font-size: 11px; } .info-table td { padding: 3px 0; vertical-align: top; } .info-table td:nth-child(1) { width: 80px; font-weight: bold; color: #555; } .info-table td:nth-child(2) { width: 15px; text-align: center; } .data-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 11px; } .data-table th, .data-table td { padding: 6px 8px; border-bottom: 1px solid #eee; } .data-table th { background: #f8fafd; font-weight: bold; text-align: left; color: #444; border-top: 1px solid #cbd5e1; border-bottom: 1px solid #cbd5e1; } .text-right { text-align: right; } .total-section { float: right; width: 220px; font-size: 11px; } .total-row { display: flex; justify-content: space-between; margin-bottom: 4px; } .grand-total { font-weight: bold; font-size: 14px; color: #ef4444; margin-top: 6px; border-top: 1px dashed #cbd5e1; padding-top: 6px; display: flex; justify-content: space-between; } .footer { text-align: center; margin-top: 50px; clear: both; font-size: 9px; color: #888; border-top: 1px solid #eee; padding-top: 10px;}</style></head><body onload="setTimeout(() => { window.print(); window.close(); }, 500)"><div class="invoice-box"><table class="header-table"><tr><td><div class="title">INVOICE TAGIHAN</div><div class="subtitle">Bimbel Bee</div></td><td class="text-right" style="font-size: 10px;"><strong>Periode:</strong> ${namaBulan}<br><strong>Tanggal Cetak:</strong> ${tglCetak}</td></tr></table><table style="width: 100%; margin-bottom: 15px;"><tr><td style="width: 55%; vertical-align: top;"><table class="info-table"><tr><td>Nama Siswa</td><td>:</td><td>${siswa.nama}</td></tr><tr><td>ID Siswa</td><td>:</td><td>${siswa.id}</td></tr><tr><td>Jenjang</td><td>:</td><td>${siswa.jenjang}</td></tr></table></td><td style="width: 45%; vertical-align: top;"><table class="info-table"><tr><td>Nama Wali</td><td>:</td><td>${siswa.wali}</td></tr><tr><td>No. HP (WA)</td><td>:</td><td>${siswa.hp}</td></tr></table></td></tr></table><table class="data-table"><thead><tr><th>Hari, Tanggal & Waktu</th><th>Tipe Kehadiran</th><th class="text-right">Tarif Kehadiran</th></tr></thead><tbody>${detailHtml}</tbody></table><div class="total-section"><div class="total-row"><span>Total Reguler</span><span>Rp ${totalReg.toLocaleString("id-ID")}</span></div><div class="total-row"><span>Total Overtime</span><span>Rp ${totalOver.toLocaleString("id-ID")}</span></div><div class="grand-total"><span>TOTAL TAGIHAN</span><span>Rp ${grandTotal.toLocaleString("id-ID")}</span></div>${statusTagihanHtml}</div><div class="footer">${strukNoteHtml}</div></div></body></html>`;
        const printWin = window.open("", "_blank"); printWin.document.write(invoiceHTML); printWin.document.close();
      }

      async function kirimTagihanLengkap(idSiswa) {
        const bln = document.getElementById("searchLapBulan").value;
        const namaBulan = formatBulanIndo(bln);
        const logs = dataLog.filter(l => l.idSiswa === idSiswa && l.bulan === bln);
        const siswa = dataSiswa.find(s => s.id === idSiswa);
        if(!siswa || logs.length === 0) return Swal.fire("Oops", "Data tagihan tidak ditemukan", "error");

        let totalReg = 0, totalOver = 0;
        logs.forEach(l => { totalReg += l.reg; totalOver += l.over; });
        let grandTotal = totalReg + totalOver;
        let isLunas = dataPembayaran.some(p => p.idSiswa === idSiswa && p.bulan === bln && p.status === 'Lunas');
        let statusText = isLunas ? "L U N A S" : "BELUM LUNAS";
        let statusColor = isLunas ? "#10b981" : "#ef4444";

        let redaksiPelunasan = isLunas 
            ? "Terima kasih banyak atas pelunasan administrasi bulan ini. Semoga ilmu yang didapat ananda bermanfaat! 🙏" 
            : "Mohon kesediaannya untuk dapat menyelesaikan administrasi pembayaran tepat waktu. Terima kasih banyak atas kepercayaan Bpk/Ibu kepada Bimbel Bee. Semangat terus belajarnya! 📖";

        const baseUrl = window.location.origin + window.location.pathname; 
        const simulatedWebLink = `${baseUrl}?id=${siswa.id}&bln=${bln}`;

        let textWA = waTemplate
            .replace(/\[NAMA_WALI\]/g, siswa.wali).replace(/\[NAMA_SISWA\]/g, siswa.nama)
            .replace(/\[BULAN\]/g, namaBulan).replace(/\[TOTAL_SESI\]/g, logs.length) 
            .replace(/\[REGULER\]/g, totalReg.toLocaleString("id-ID"))
            .replace(/\[OVERTIME\]/g, totalOver.toLocaleString("id-ID"))
            .replace(/\[GRAND_TOTAL\]/g, grandTotal.toLocaleString("id-ID"))
            .replace(/\[LINK\]/g, simulatedWebLink)
            .replace(/\[REDAKSI_PELUNASAN\]/g, redaksiPelunasan);

        const strukNoteHtml = strukTemplateNote.replace(/\n/g, '<br>');

        const receiptTemplate = document.getElementById('receipt-template');
        receiptTemplate.innerHTML = `
            <div style="text-align: center; border-bottom: 2px dashed #cbd5e1; padding-bottom: 15px; margin-bottom: 15px;">
                <h3 style="color: #0084ff; margin: 0; font-weight: 800; font-size: 22px;">BIMBEL BEE</h3>
                <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">Bukti Tagihan Les</p>
            </div>
            <table style="width: 100%; font-size: 14px; margin-bottom: 15px; border-collapse: collapse;">
                <tr><td style="color: #64748b; padding: 4px 0;">Siswa</td><td style="text-align: right; font-weight: bold; color: #1e293b;">${siswa.nama}</td></tr>
                <tr><td style="color: #64748b; padding: 4px 0;">ID</td><td style="text-align: right; color: #1e293b;">${siswa.id}</td></tr>
                <tr><td style="color: #64748b; padding: 4px 0;">Periode</td><td style="text-align: right; font-weight: bold; color: #1e293b;">${namaBulan}</td></tr>
                <tr><td style="color: #64748b; padding: 4px 0;">Total Sesi</td><td style="text-align: right; color: #1e293b;">${logs.length} Pertemuan</td></tr>
            </table>
            <div style="background: #f8fafd; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span style="color: #64748b; font-size: 14px;">Total Reguler</span>
                    <span style="font-weight: bold; color: #1e293b;">Rp ${totalReg.toLocaleString("id-ID")}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: #64748b; font-size: 14px;">Total Overtime</span>
                    <span style="font-weight: bold; color: #1e293b;">Rp ${totalOver.toLocaleString("id-ID")}</span>
                </div>
            </div>
            <div style="border-top: 2px dashed #cbd5e1; padding-top: 15px; text-align: center;">
                <p style="margin: 0; color: #64748b; font-size: 14px;">TOTAL TAGIHAN</p>
                <h2 style="margin: 5px 0; color: #1e293b; font-weight: 800; font-size: 26px;">Rp ${grandTotal.toLocaleString("id-ID")}</h2>
                <div style="margin-top: 12px; display: inline-block; padding: 6px 16px; border: 2px solid ${statusColor}; color: ${statusColor}; font-weight: 800; border-radius: 20px; font-size: 14px; letter-spacing: 1px;">
                    ${statusText}
                </div>
            </div>
            <div style="text-align: center; margin-top: 20px; color: #94a3b8; font-size: 12px; line-height: 1.4;">
                ${strukNoteHtml}
            </div>
        `;

        Swal.fire({ title: 'Membuat Gambar Struk...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); }});

        html2canvas(receiptTemplate, { scale: 2, backgroundColor: null }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            
            canvas.toBlob(async (blob) => {
                const file = new File([blob], `Invoice_BimbelBee_${siswa.nama.replace(/\s+/g, '_')}_${bln}.png`, { type: 'image/png' });
                Swal.close(); 

                if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                    try {
                        await navigator.share({
                            title: 'Invoice Bimbel Bee',
                            text: textWA,
                            files: [file]
                        });
                    } catch (error) {
                        fallbackDownloadGambar(imgData, file.name, textWA, siswa.hp);
                    }
                } else {
                    fallbackDownloadGambar(imgData, file.name, textWA, siswa.hp);
                }
            }, 'image/png');
        });
      }

      function fallbackDownloadGambar(imgData, filename, textWA, noHP) {
        let hpFormat = noHP.replace(/\D/g, ''); if(hpFormat.startsWith("0")) hpFormat = "62" + hpFormat.substring(1);
        const waUrl = `https://wa.me/${hpFormat}?text=${encodeURIComponent(textWA)}`;
        
        const a = document.createElement('a'); a.href = imgData; a.download = filename;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);

        Swal.fire({
            title: 'Mengarahkan ke WhatsApp...',
            text: 'Gambar struk telah terunduh. Silakan lampirkan gambar tersebut saat membalas via WA.',
            icon: 'success',
            timer: 3500,
            showConfirmButton: false
        }).then(() => {
            window.open(waUrl, '_blank');
        });
      }

      function kirimWA(idSiswa) {
        const bln = document.getElementById("searchLapBulan").value;
        const namaBulan = formatBulanIndo(bln);
        const logs = dataLog.filter(l => l.idSiswa === idSiswa && l.bulan === bln);
        const siswa = dataSiswa.find(s => s.id === idSiswa);
        if(!siswa || logs.length === 0) return Swal.fire("Oops", "Data tidak ditemukan", "error");

        let totalReg = 0, totalOver = 0;
        logs.forEach(l => { totalReg += l.reg; totalOver += l.over; });
        let grandTotal = totalReg + totalOver;
        let isLunas = dataPembayaran.some(p => p.idSiswa === idSiswa && p.bulan === bln && p.status === 'Lunas');

        let hpFormat = siswa.hp.replace(/\D/g, ''); 
        if(hpFormat.startsWith("0")) hpFormat = "62" + hpFormat.substring(1);
        
        let redaksiPelunasan = isLunas 
            ? "Terima kasih banyak atas pelunasan administrasi bulan ini. Semoga ilmu yang didapat ananda bermanfaat! 🙏" 
            : "Mohon kesediaannya untuk dapat menyelesaikan administrasi pembayaran tepat waktu. Terima kasih banyak atas kepercayaan Bpk/Ibu kepada Bimbel Bee. Semangat terus belajarnya! 📖";

        const baseUrl = window.location.origin + window.location.pathname; 
        const simulatedWebLink = `${baseUrl}?id=${siswa.id}&bln=${bln}`;

        let textWA = waTemplate
            .replace(/\[NAMA_WALI\]/g, siswa.wali).replace(/\[NAMA_SISWA\]/g, siswa.nama)
            .replace(/\[BULAN\]/g, namaBulan).replace(/\[TOTAL_SESI\]/g, logs.length)
            .replace(/\[REGULER\]/g, totalReg.toLocaleString("id-ID"))
            .replace(/\[OVERTIME\]/g, totalOver.toLocaleString("id-ID"))
            .replace(/\[GRAND_TOTAL\]/g, grandTotal.toLocaleString("id-ID"))
            .replace(/\[LINK\]/g, simulatedWebLink)
            .replace(/\[REDAKSI_PELUNASAN\]/g, redaksiPelunasan);
        
        const waUrl = `https://wa.me/${hpFormat}?text=${encodeURIComponent(textWA)}`;
        window.open(waUrl, '_blank');
      }

      function bukaModalTemplateWA() {
        document.getElementById("waTemplateInput").value = waTemplate;
        new bootstrap.Modal(document.getElementById("modalTemplateWA")).show();
      }
      function simpanTemplateWA() {
        waTemplate = document.getElementById("waTemplateInput").value;
        localStorage.setItem('waTemplate', waTemplate);
        simpanLaluTutup('modalTemplateWA', 'Template Pesan WA');
      }

      function bukaModalTemplateStruk() {
        document.getElementById("strukTemplateInput").value = strukTemplateNote;
        new bootstrap.Modal(document.getElementById("modalTemplateStruk")).show();
      }
      function simpanTemplateStruk() {
        strukTemplateNote = document.getElementById("strukTemplateInput").value;
        localStorage.setItem('strukTemplateNote', strukTemplateNote);
        simpanLaluTutup('modalTemplateStruk', 'Teks Struk Tagihan');
      }
      
      function exportExcel(tableId, filename) {
        const table = document.getElementById(tableId); const html = table.outerHTML;
        const url = 'data:application/vnd.ms-excel,' + encodeURIComponent(html);
        const a = document.createElement('a'); a.href = url; a.download = filename + '.xls';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
      }

      // --- UI, AUTH & PORTAL WALI ---
      async function cariDataWali() {
        const input = document.getElementById("inputCariWali").value.trim();
        if (!input) return Swal.fire("Oops", "Masukkan Nama Siswa!", "warning");
        const siswa = dataSiswa.find((s) => s.nama.toLowerCase() === input.toLowerCase());
        if (!siswa) return Swal.fire("Tidak Ditemukan", "Nama siswa tidak terdaftar.", "error");

        const { value: pin } = await Swal.fire({ 
          title: "Masukkan PIN Keamanan", 
          html: `<div class="input-icon-wrapper position-relative mx-auto" style="max-width: 250px;">
                    <i class="bi bi-key position-absolute top-50 translate-middle-y" style="left: 15px; color: #64748b; z-index: 10;"></i>
                    <input id="swal-pin" type="password" class="form-control ps-5 pe-5 text-center" placeholder="PIN Siswa" maxlength="4" style="height: 45px; font-size: 1.2rem; letter-spacing: 5px;">
                    <i class="bi bi-eye-slash position-absolute top-50 translate-middle-y toggle-pw" style="right: 15px; z-index: 10; cursor:pointer;" onclick="const pw = document.getElementById('swal-pin'); if(pw.type==='password'){pw.type='text'; this.classList.replace('bi-eye-slash','bi-eye');}else{pw.type='password'; this.classList.replace('bi-eye','bi-eye-slash');}"></i>
                 </div>`,
          focusConfirm: false,
          showCancelButton: true,
          preConfirm: () => document.getElementById('swal-pin').value,
          didOpen: () => { const inputSwal = document.getElementById('swal-pin'); if(inputSwal) { inputSwal.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); Swal.clickConfirm(); } }); } }
        });
        if (!pin) return; 
        if (pin !== siswa.pin) return Swal.fire("Oops", "PIN salah!", "error");

        document.getElementById("pw-nama").innerText = siswa.nama; document.getElementById("pw-id").innerText = siswa.id; document.getElementById("pw-jenjang").innerText = siswa.jenjang;
        document.getElementById("pw-qr").src = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${siswa.id}`;
        await Swal.fire("Berhasil", `Selamat datang, ${siswa.nama}!`, "success");

        const searchView = document.getElementById("pw-search-view"); const detailView = document.getElementById("pw-detail-view");
        searchView.classList.add("fade-out");
        setTimeout(() => { searchView.classList.add("d-none"); detailView.classList.remove("d-none"); detailView.classList.remove("fade-out"); renderDataWali(); }, 500);
      }

      function renderDataWali() {
        const nama = document.getElementById("pw-nama").innerText;
        const idSiswa = document.getElementById("pw-id").innerText; 
        const bln = document.getElementById("pw-filter-bulan").value;
        const tbody = document.getElementById("pw-tabel-rincian");
        let htmlStr = ""; let sReg = 0, sOver = 0;
        
        dataLog.filter((l) => l.nama === nama && l.bulan === bln).forEach((l) => {
            sReg += l.reg; sOver += l.over;
            let typeClass = l.status === "Hadir" ? "text-success" : "text-warning fw-bold";
            let tar = l.status === "Hadir" ? l.reg : l.over;
            let tglPart = l.tgl.split(' ');
            let tglSaja = `${tglPart[0]} ${tglPart[1]}`;
            let jamSaja = tglPart[3] || '';

            htmlStr += `
            <div class="d-flex justify-content-between align-items-center border-bottom border-secondary-subtle py-2">
                <div class="text-start">
                    <div class="fw-bold" style="font-size:0.85rem;">${l.hari}, ${tglSaja}</div>
                    <small class="text-muted">${jamSaja} WIB</small>
                </div>
                <div class="text-end">
                    <div class="${typeClass}" style="font-size:0.8rem;"><i class="bi bi-circle-fill small"></i> ${l.status}</div>
                    <div class="fw-bold text-primary" style="font-size:0.85rem;">Rp ${tar.toLocaleString("id-ID")}</div>
                </div>
            </div>`;
        });
        
        if (htmlStr === "") htmlStr = `<div class="text-center text-muted py-3">Belum ada data kehadiran bulan ini.</div>`;
        tbody.innerHTML = htmlStr;
        
        document.getElementById("pw-sum-reguler").innerText = `Rp ${sReg.toLocaleString("id-ID")}`; 
        document.getElementById("pw-sum-overtime").innerText = `Rp ${sOver.toLocaleString("id-ID")}`; 
        
        let isLunas = dataPembayaran.some(p => p.idSiswa === idSiswa && p.bulan === bln && p.status === 'Lunas');
        let stampHtml = isLunas ? `<div class="mt-2"><span class="badge bg-success w-100 py-2"><i class="bi bi-check-circle"></i> SUDAH LUNAS</span></div>` : '';
        
        document.getElementById("pw-sum-total").innerHTML = `Rp ${(sReg + sOver).toLocaleString("id-ID")} ${stampHtml}`;
      }

      function kembaliKeSearch() {
        document.getElementById("pw-detail-view").classList.add("fade-out");
        setTimeout(() => { document.getElementById("pw-detail-view").classList.add("d-none"); const searchView = document.getElementById("pw-search-view"); searchView.classList.remove("d-none"); document.getElementById("inputCariWali").value = ""; setTimeout(() => searchView.classList.remove("fade-out"), 50); }, 500);
      }

      async function showAdminPortal() {
        const { value: formValues } = await Swal.fire({
          title: 'Login Admin',
          html:
            '<div class="input-icon-wrapper mb-3 position-relative"><i class="bi bi-person position-absolute top-50 translate-middle-y" style="left: 15px; color: var(--text-muted);"></i><input id="swal-input1" class="form-control ps-5" placeholder="Username"></div>' +
            '<div class="input-icon-wrapper position-relative"><i class="bi bi-key position-absolute top-50 translate-middle-y" style="left: 15px; color: var(--text-muted);"></i><input id="swal-input2" type="password" class="form-control ps-5 pe-5" placeholder="Password"><i class="bi bi-eye-slash position-absolute top-50 translate-middle-y toggle-pw" style="right: 15px; cursor: pointer; z-index: 10;" onclick="const pw = document.getElementById(\'swal-input2\'); if(pw.type===\'password\'){pw.type=\'text\'; this.classList.replace(\'bi-eye-slash\',\'bi-eye\');}else{pw.type=\'password\'; this.classList.replace(\'bi-eye\',\'bi-eye-slash\');}"></i></div>',
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: 'Login',
          cancelButtonText: 'Batal',
          didOpen: () => {
            const input1 = document.getElementById('swal-input1');
            const input2 = document.getElementById('swal-input2');
            input1.addEventListener('keydown', (e) => { 
              if (e.key === 'Enter') { e.preventDefault(); Swal.clickConfirm(); } 
            });
            input2.addEventListener('keydown', (e) => { 
              if (e.key === 'Enter') { e.preventDefault(); Swal.clickConfirm(); } 
            });
          },
          preConfirm: () => {
            return [ document.getElementById('swal-input1').value, document.getElementById('swal-input2').value ]
          }
        });

        if (formValues) {
          const username = formValues[0]; const password = formValues[1];
          const admin = dataAdmin.find(a => a.username === username && a.password === password);
          if (admin) {
            Swal.fire({ toast: true, position: "top-end", icon: "success", title: `Selamat datang, ${admin.nama}`, showConfirmButton: false, timer: 2000 });
            document.getElementById("portal-wali").classList.add("d-none"); document.getElementById("portal-admin").classList.remove("d-none");
            document.querySelectorAll(".menu-section").forEach((el) => { el.classList.add("d-none"); });
            document.getElementById("menu-dashboard").classList.remove("d-none"); document.getElementById("pageTitle").innerText = "Dashboard";
            document.querySelectorAll("#sidebar .nav-link").forEach((el) => { el.classList.remove("active"); });
            document.querySelector('a[onclick*="menu-dashboard"]').classList.add("active");
            document.getElementById("current-user-name").innerText = admin.nama; document.getElementById("current-user-role").innerText = admin.role;
            const isSuper = admin.role === "SuperAdmin";
            document.querySelectorAll(".nav-item").forEach((el) => {
              const access = el.getAttribute("data-access");
              if (access === "tarif" || access === "role") el.style.display = isSuper ? "block" : "none";
            });
          } else {
            Swal.fire('Akses Ditolak', 'Username atau Password salah!', 'error');
          }
        }
      }

      function simpanLaluTutup(modalId, namaFitur) { Swal.fire("Berhasil", `${namaFitur} telah disimpan.`, "success"); bootstrap.Modal.getInstance(document.getElementById(modalId)).hide(); }
      function toggleInputLainnya(val) { const wrapper = document.getElementById("inputJenjangLainnyaWrapper"); if (val === "Lainnya") { wrapper.classList.remove("d-none"); setTimeout(() => document.getElementById("inputJenjangLainnya").focus(), 100); } else { wrapper.classList.add("d-none"); document.getElementById("inputJenjangLainnya").value = ""; } }
      function toggleInputLainnyaTarif(isChecked) { const wrapper = document.getElementById("inputJenjangTarifLainnyaWrapper"); if (isChecked) { wrapper.classList.remove("d-none"); const btnDropdown = document.getElementById("btnDropdownJenjang"); if (btnDropdown) { const bsDropdown = bootstrap.Dropdown.getInstance(btnDropdown) || new bootstrap.Dropdown(btnDropdown); bsDropdown.hide(); } setTimeout(() => document.getElementById("inputJenjangTarifLainnya").focus(), 150); } else { wrapper.classList.add("d-none"); document.getElementById("inputJenjangTarifLainnya").value = ""; } }
      function updateBtnText(listId, btnId, defaultText) { let checks = document.querySelectorAll(`#${listId} .form-check-input:checked`); let btn = document.getElementById(btnId); if (checks.length === 0) btn.innerText = defaultText; else if (checks.length > 2) btn.innerText = `${checks.length} Terpilih`; else btn.innerText = Array.from(checks).map((cb) => cb.value).join(", "); }
      
      function showIDCard(id) {
        const siswa = dataSiswa.find((s) => s.id === id);
        let gSiswa = siswa.genderSiswa ? `(${siswa.genderSiswa})` : '';
        document.getElementById("idcard-id").innerText = siswa.id; document.getElementById("idcard-nama").innerText = siswa.nama + " " + gSiswa;
        document.getElementById("idcard-jenjang").innerText = siswa.jenjang; document.getElementById("idcard-hp").innerText = siswa.hp;
        document.getElementById("idcard-wali").innerText = "Wali: " + siswa.wali;
        document.getElementById("idcard-qr-img").src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${siswa.id}`;
        new bootstrap.Modal(document.getElementById("modalIDCard")).show();
      }

      function getHTMLCardTemplate(siswa) {
        let gSiswa = siswa.genderSiswa ? `(${siswa.genderSiswa})` : '';
        return `<div class="id-card-container"><i class="bi bi-book-half id-card-bg-icon"></i><div class="id-card-details"><h5 class="fw-bold m-0" style="color: #0084ff;">Bimbel Bee</h5><div style="font-size: 0.65rem; color: #64748b; margin-bottom: 6px;">Kartu Identitas Siswa Les</div><div class="fw-bold m-0" style="font-size: 1.15rem; color: #1e293b;">${siswa.nama} <span style="font-size:0.8rem; font-weight:normal;">${gSiswa}</span></div><div style="font-size: 0.85rem; color: #1e293b;"><strong>${siswa.id}</strong></div><div style="font-size: 0.75rem; margin-top: 5px; color: #1e293b;">${siswa.jenjang}</div><div style="font-size: 0.7rem; margin-top: 2px; color: #1e293b;"><i class="bi bi-person"></i> Wali: ${siswa.wali}</div><div style="font-size: 0.7rem; margin-top: 2px; color: #1e293b;"><i class="bi bi-telephone"></i> ${siswa.hp}</div></div><div class="id-card-qr"><img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${siswa.id}" width="100%" height="100%" alt="QR" /></div></div>`;
      }

      function executePrintLayout(cardsHTML, pageTitle) {
        const printWin = window.open("", "_blank"); printWin.document.write(`<html><head><title>${pageTitle}</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" /><style>@page { size: A4; margin: 0; } * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; } body { font-family: 'Nunito', sans-serif; margin: 0; padding: 15mm; display: flex; flex-wrap: wrap; justify-content: flex-start; align-content: flex-start; gap: 8mm; background: white; } .id-card-container { width: 85.6mm; height: 53.98mm; background: #fff; border: 2px solid #0084ff; border-radius: 10px; position: relative; padding: 12px; display: flex; align-items: center; gap: 12px; overflow: hidden; page-break-inside: avoid; break-inside: avoid; } .id-card-qr { width: 95px; height: 95px; background: white; padding: 4px; border-radius: 8px; border: 1px solid #e2e8f0; flex-shrink: 0; } .id-card-details { flex: 1; text-align: left; z-index: 2; } .id-card-bg-icon { position: absolute; right: -15px; bottom: -20px; font-size: 80px; opacity: 0.05; color: #0084ff; z-index: 1; } h6 { margin: 0; font-family: sans-serif; } .text-dark { color: #1e293b; font-family: sans-serif; } .fw-bold { font-weight: bold; }</style></head><body onload="setTimeout(() => { window.print(); window.close(); }, 700)">${cardsHTML}</body></html>`); printWin.document.close();
      }

      function toggleSemuaSiswa(masterCb) { document.querySelectorAll('.cb-siswa').forEach(cb => { cb.checked = masterCb.checked; }); }
      function cetakMassalIDCard(mode) {
        let targetSiswa = [];
        if (mode === 'semua') { targetSiswa = dataSiswa; } else if (mode === 'terpilih') { const checkedCbs = document.querySelectorAll('.cb-siswa:checked'); if (checkedCbs.length === 0) return Swal.fire("Oops", "Centang minimal satu siswa di tabel untuk dicetak!", "warning"); const ids = Array.from(checkedCbs).map(cb => cb.value); targetSiswa = dataSiswa.filter(s => ids.includes(s.id)); }
        executePrintLayout(targetSiswa.map(s => getHTMLCardTemplate(s)).join(''), "Cetak Massal ID Card (A4)");
      }
      function cetakIndividu(id) { const siswa = dataSiswa.find(s => s.id === id); if(siswa) executePrintLayout(getHTMLCardTemplate(siswa), "Cetak ID Card - " + siswa.nama); }
      function cetakIDCard() { const id = document.getElementById("idcard-id").innerText; cetakIndividu(id); }

      function logoutAdmin() { document.getElementById("portal-admin").classList.add("d-none"); document.getElementById("portal-wali").classList.remove("d-none"); kembaliKeSearch(); }
      function toggleSidebar() { document.getElementById("sidebar").classList.toggle("show"); document.getElementById("mobileOverlay").classList.toggle("show"); }
      function toggleTheme() {
        const html = document.documentElement; const newTheme = html.getAttribute("data-bs-theme") === "light" ? "dark" : "light"; html.setAttribute("data-bs-theme", newTheme);
        localStorage.setItem('theme', newTheme);
        const iconClass = newTheme === "light" ? "bi bi-moon-fill" : "bi bi-sun-fill";
        document.querySelector("#themeToggleBtn i").className = iconClass; document.querySelector("#themeToggleBtnWali i").className = iconClass + " text-secondary";
      }

      function switchMenu(menuId, element) {
        document.querySelectorAll(".menu-section").forEach((el) => el.classList.add("d-none")); document.getElementById(menuId).classList.remove("d-none");
        document.querySelectorAll("#sidebar .nav-link").forEach((el) => el.classList.remove("active")); if (element && element.classList.contains("nav-link")) element.classList.add("active");
        const titles = { "menu-dashboard": "Dashboard", "menu-absen": "Absensi Scanner", "menu-siswa": "Data Siswa", "menu-tarif": "Pengaturan Tarif", "menu-log": "Log Kehadiran", "menu-laporan": "Laporan & Invoice", "menu-role": "Manajemen Role" };
        document.getElementById("pageTitle").innerText = titles[menuId];
        if (window.innerWidth <= 768 && document.getElementById("sidebar").classList.contains("show")) toggleSidebar();
        if (menuId !== "menu-absen") { stopScanner(); document.getElementById("btnMulaiKamera").style.display = "inline-block"; }
      }

      function setActiveBottomNav(element) { document.querySelectorAll(".nav-item-bottom").forEach((el) => el.classList.remove("active")); if (element) element.classList.add("active"); }

      setInterval(() => {
        document.getElementById("realtime-clock").innerText = new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" }).replace(/\./g, ":");
      }, 1000);
    </script>
  </body>
</html>
