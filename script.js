/*
  script.js  (v2 - aman password)
  LKPD Interaktif Bahasa Jepang Bab 1 | A2 / JFT-Basic / LPK

  Perubahan kunci dari v1:
  - Password guru disimpan sebagai HASH SHA-256 (bukan plaintext).
  - Hint password dihapus dari UI.
  - Secure-by-default: selama hash kosong, login guru ditolak.
  - Helper window.generateTeacherHash('KataSandi') untuk membuat hash via console.
  - Verifikasi aman butuh secure context (https / localhost). Peserta biasa tetap bisa
    memakai file:// karena login peserta tidak memakai hash.
*/

const DATA = window.LKPD_DATA || { settings: {}, tabs: [] };
const SETTINGS = DATA.settings || {};

const SESSION_KEY = SETTINGS.sessionKey || "lkpd_bab1_session_v4";
const STATE_KEY = SETTINGS.stateKey || "lkpd_bab1_state_v4";
const TEACHER_PASSWORD_HASH = SETTINGS.teacherPasswordHash || ""; // hash, bukan teks
const LISTENING_PLAY_COUNT = Number(SETTINGS.listeningPlayCount || 2);
const SHOW_LISTENING_CONTROLS = SETTINGS.showListeningControls === true;

// Salt sederhana agar hash tidak identik dengan SHA-256 polos (kurangi rainbow-table).
const HASH_SALT = "lkpd_bab1::v1::";

let currentRole = null;
let selectedRole = "student";
let lastReport = "";

let currentAudio = null;
let currentButton = null;

/* =========================
   CRYPTO / PASSWORD
========================= */

function cryptoAvailable() {
  return !!(window.crypto && window.crypto.subtle && typeof TextEncoder !== "undefined");
}

async function sha256Hex(text) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map(function (b) { return b.toString(16).padStart(2, "0"); })
    .join("");
}

async function hashPassword(pw) {
  return await sha256Hex(HASH_SALT + String(pw || ""));
}

// Dipanggil guru dari console browser untuk menghasilkan hash yang ditempel ke data-soal.js.
window.generateTeacherHash = async function (pw) {
  if (!cryptoAvailable()) {
    console.error("crypto.subtle tidak tersedia. Jalankan di halaman https/localhost, bukan double-click file://.");
    return null;
  }
  if (!pw) {
    console.log("Contoh pemakaian:  generateTeacherHash('PasswordAndaYangKuat')");
    return null;
  }
  const h = await hashPassword(pw);
  console.log("=== SALIN HASH INI ===");
  console.log(h);
  console.log("Tempel ke data-soal.js -> settings.teacherPasswordHash: \"<hash>\"");
  return h;
};

/* =========================
   INIT
========================= */

function init() {
  setDefaultDate();
  attachGlobalListeners();

  if (!DATA.tabs || DATA.tabs.length === 0) {
    alert("Data LKPD tidak ditemukan. Pastikan data-soal.js dimuat sebelum script.js.");
    return;
  }

  const rawSession = safeGetItem(SESSION_KEY);
  if (rawSession) {
    try {
      const session = JSON.parse(rawSession);
      currentRole = session.role;
      showApp(session);
      return;
    } catch (e) {
      safeRemoveItem(SESSION_KEY);
    }
  }
  showLogin();
}

function attachGlobalListeners() {
  if (window.__lkpdListenersAttached) return;
  window.__lkpdListenersAttached = true;
  document.addEventListener("input", saveState);
  document.addEventListener("change", saveState);
}

function setDefaultDate() {
  const d = document.getElementById("loginDate");
  if (d && !d.value) d.value = new Date().toISOString().slice(0, 10);
}

/* =========================
   LOGIN / SESSION
========================= */

function showLogin() {
  const ls = document.getElementById("loginScreen");
  const app = document.getElementById("app");
  if (ls) ls.style.display = "flex";
  if (app) app.style.display = "none";
  document.body.classList.remove("teacher");
}

function showApp(session) {
  const ls = document.getElementById("loginScreen");
  const app = document.getElementById("app");
  if (ls) ls.style.display = "none";
  if (app) app.style.display = "block";
  document.body.classList.toggle("teacher", session.role === "teacher");
  updateUserInfo(session);
  renderTabs();
  restoreState();
}

function updateUserInfo(session) {
  const u = document.getElementById("userInfo");
  if (!u) return;
  if (session.role === "teacher") {
    u.textContent = "Mode: Guru — kunci jawaban, naskah audio, dan penilaian terjemahan aktif.";
  } else {
    u.textContent = "Peserta: " + (session.name || "-") +
      " | Kelas: " + (session.kelas || "-") +
      " | Tanggal: " + (session.date || "-");
  }
}

function selectRole(role) {
  selectedRole = role;
  const bs = document.getElementById("btnRoleStudent");
  const bt = document.getElementById("btnRoleTeacher");
  const fs = document.getElementById("studentForm");
  const ft = document.getElementById("teacherForm");
  const er = document.getElementById("loginError");
  if (bs) bs.classList.toggle("active", role === "student");
  if (bt) bt.classList.toggle("active", role === "teacher");
  if (fs) fs.style.display = role === "student" ? "flex" : "none";
  if (ft) ft.style.display = role === "teacher" ? "flex" : "none";
  if (er) er.textContent = "";
}

function loginStudent() {
  const n = document.getElementById("loginName");
  const k = document.getElementById("loginClass");
  const d = document.getElementById("loginDate");
  const e = document.getElementById("loginError");
  const name = n ? n.value.trim() : "";
  const kelas = k ? k.value.trim() : "";
  const date = d ? d.value : "";
  if (!name || !kelas || !date) {
    if (e) e.textContent = "Nama, kelas, dan tanggal wajib diisi.";
    return;
  }
  const session = { role: "student", name: name, kelas: kelas, date: date };
  safeSetItem(SESSION_KEY, JSON.stringify(session));
  currentRole = "student";
  showApp(session);
}

async function loginTeacher() {
  const p = document.getElementById("teacherPassword");
  const e = document.getElementById("loginError");
  const password = p ? p.value : "";

  if (!TEACHER_PASSWORD_HASH) {
    if (e) e.textContent = "Password guru belum di-set. Buka console (F12), jalankan generateTeacherHash('PasswordAnda'), lalu tempel hasilnya ke data-soal.js.";
    return;
  }
  if (!cryptoAvailable()) {
    if (e) e.textContent = "Lokasi ini tidak mendukung verifikasi aman. Buka via https atau localhost (Live Server). Jangan double-click file.html untuk login guru.";
    return;
  }
  try {
    const inputHash = await hashPassword(password);
    if (inputHash === TEACHER_PASSWORD_HASH) {
      const session = { role: "teacher", name: "Guru" };
      safeSetItem(SESSION_KEY, JSON.stringify(session));
      currentRole = "teacher";
      showApp(session);
    } else {
      if (e) e.textContent = "Password guru salah.";
    }
  } catch (err) {
    console.error(err);
    if (e) e.textContent = "Terjadi kesalahan verifikasi password.";
  }
}

function logout() {
  if (!confirm("Keluar dari akun ini? Jawaban yang tersimpan di browser ini tidak otomatis terhapus.")) return;
  safeRemoveItem(SESSION_KEY);
  location.reload();
}

function resetAll() {
  if (!confirm("Hapus semua jawaban dan muat ulang LKPD?")) return;
  safeRemoveItem(STATE_KEY);
  location.reload();
}

/* =========================
   RENDER TABS
========================= */

function renderTabs() {
  const tabsEl = document.getElementById("tabs");
  const panelsEl = document.getElementById("panels");
  if (!tabsEl || !panelsEl) return;
  tabsEl.innerHTML = "";
  panelsEl.innerHTML = "";

  DATA.tabs.forEach(function (tab, index) {
    const btn = document.createElement("button");
    btn.className = "tab-btn" + (index === 0 ? " active" : "");
    btn.textContent = tab.label || "";
    btn.onclick = function () { openTab(tab.id, btn); };
    tabsEl.appendChild(btn);

    const section = document.createElement("section");
    section.id = "panel-" + tab.id;
    section.className = "tab-panel" + (index === 0 ? " active" : "");

    if (tab.type === "static") {
      section.innerHTML = tab.html || "";
    } else if (tab.type === "questions") {
      section.innerHTML = "<h2>" + escapeHtml(tab.label || "") + "</h2>" + (tab.items || []).map(renderItem).join("");
    } else if (tab.type === "result") {
      section.innerHTML = resultHTML();
    } else if (tab.type === "audiobank") {
      section.innerHTML = "<h2>" + escapeHtml(tab.label || "") + "</h2>" +
        '<p class="small">Putar untuk latihan / シャドーイング. Player bebas dan boleh diulang.</p>' +
        (tab.items || []).map(renderBankItem).join("");
    } else {
      section.innerHTML = (tab.items && tab.items.length)
        ? "<h2>" + escapeHtml(tab.label || "") + "</h2>" + tab.items.map(renderItem).join("")
        : (tab.html || "");
    }
    panelsEl.appendChild(section);
  });
}

function openTab(tabId, btn) {
  document.querySelectorAll(".tab-panel").forEach(function (el) { el.classList.remove("active"); });
  document.querySelectorAll(".tab-btn").forEach(function (el) { el.classList.remove("active"); });
  const panel = document.getElementById("panel-" + tabId);
  if (panel) panel.classList.add("active");
  if (btn) btn.classList.add("active");
}

function renderItem(item) {
  let html = '<div class="question-card">';
  if (item.passage) html += '<div class="passage ja">' + item.passage + "</div>";

  if (item.type === "listening") {
    const times = Number(item.playCount || LISTENING_PLAY_COUNT || 2);
    const show = SHOW_LISTENING_CONTROLS;
    html += '<button class="play-btn no-print" data-times="' + times + '" onclick="playItemAudio(\'' + item.id + '\', this)">Putar Audio (' + times + 'x)</button>';
    if (item.audioUrl) {
      html += '<audio id="audio-' + item.id + '" preload="auto" ' + (show ? "controls " : "") +
        'style="' + (show ? "width:100%;margin:10px 0;" : "display:none;") + '" src="' + safeAudioSrc(item.audioUrl) + '"></audio>';
    }
  }

  html += '<p class="prompt ja"><strong>' + escapeHtml(item.number || "") + "</strong> " + (item.prompt || "") + "</p>";

  if (item.type === "mcq" || item.type === "listening") {
    html += '<div class="options ja">';
    (item.options || []).forEach(function (opt, idx) {
      html += '<label><input type="radio" name="' + item.id + '" value="' + (idx + 1) + '" /> ' + opt + "</label>";
    });
    html += "</div>";
  }

  if (item.type === "vocab") html += '<input type="text" id="' + item.id + '" class="ja" placeholder="答え" />';

  if (item.type === "translation") {
    html += '<textarea id="' + item.id + '" rows="2" class="ja" placeholder="答えを書いてください"></textarea>';
    html += '<label class="teacher-only">Skor guru (0–4)<select id="' + item.id + 'Score">' +
      '<option value="">--</option><option value="0">0</option><option value="1">1</option>' +
      '<option value="2">2</option><option value="3">3</option><option value="4">4</option></select></label>';
    html += '<details class="teacher-only"><summary>Contoh Jawaban</summary><p class="ja">' + (item.sample || "") + "</p></details>";
  }

  html += "</div>";
  return html;
}

function renderBankItem(item) {
  const src = item.audioUrl || ("audio/" + item.file);
  const title = item.title || item.track || "";
  return '<div class="question-card">' +
    '<p class="ja"><strong>[' + escapeHtml(item.track || "") + "]</strong> " + escapeHtml(title) + "</p>" +
    '<audio controls preload="none" style="width:100%" src="' + safeAudioSrc(src) + '"></audio></div>';
}

function resultHTML() {
  return '<h2>Hasil Penilaian & Umpan Balik Diagnostik</h2>' +
    '<p class="small">Klik tombol <strong>Hitung Nilai</strong> di atas untuk memperbarui hasil.</p>' +
    '<div class="result-grid">' +
    '<div class="result-item"><strong>Mini JFT-like</strong><div id="resJFTSummary">Belum dihitung</div></div>' +
    '<div class="result-item"><strong>文字・語彙</strong><div id="resMoji">-</div></div>' +
    '<div class="result-item"><strong>会話表現</strong><div id="resKaiwa">-</div></div>' +
    '<div class="result-item"><strong>聴解</strong><div id="resChoikai">-</div></div>' +
    '<div class="result-item"><strong>読解</strong><div id="resDokkai">-</div></div>' +
    '<div class="result-item"><strong>Kanji</strong><div id="resKanji">-</div></div>' +
    '<div class="result-item"><strong>Kosakata</strong><div id="resKosakata">-</div></div>' +
    '<div class="result-item"><strong>Terjemahan</strong><div id="resTerjemahan">-</div></div>' +
    '<div class="result-item"><strong>Nilai Akhir Bab</strong><div id="resFinal">-</div></div>' +
    '<div class="result-item"><strong>Indikasi Skor JFT 0–250</strong><div id="resJFTScale">-</div></div>' +
    "</div>" +
    '<div id="statusBox" class="status-box" style="display:none;"></div>' +
    "<h3>Umpan Balik Diagnostik</h3>" +
    '<div id="diagnosticBox" class="note">Belum ada hasil. Silakan klik Hitung Nilai.</div>' +
    "<h3>Rincian Kriteria</h3>" +
    '<div id="criteriaBox" class="small">Belum ada hasil.</div>' +
    '<div id="answerKeyContainer" class="teacher-only"></div>';
}

/* =========================
   LOCAL STORAGE
========================= */

function safeGetItem(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function safeSetItem(k, v) { try { localStorage.setItem(k, v); } catch (e) { console.warn("localStorage write gagal:", e); } }
function safeRemoveItem(k) { try { localStorage.removeItem(k); } catch (e) { console.warn("localStorage remove gagal:", e); } }

function saveState() {
  const app = document.getElementById("app");
  if (!app || app.style.display === "none") return;
  const state = {};
  document.querySelectorAll("#app input, #app select, #app textarea").forEach(function (el) {
    if (el.type === "radio") { if (el.checked && el.name) state[el.name] = el.value; }
    else if (el.type === "checkbox") { if (el.id) state[el.id] = el.checked; }
    else if (el.id) { state[el.id] = el.value; }
  });
  safeSetItem(STATE_KEY, JSON.stringify(state));
}

function restoreState() {
  const raw = safeGetItem(STATE_KEY);
  if (!raw) return;
  let state; try { state = JSON.parse(raw); } catch (e) { return; }
  Object.keys(state).forEach(function (key) {
    const value = state[key];
    const radio = document.querySelector('input[name="' + key + '"][value="' + value + '"]');
    if (radio) { radio.checked = true; return; }
    const el = document.getElementById(key);
    if (!el) return;
    if (el.type === "checkbox") el.checked = !!value; else el.value = value;
  });
}

/* =========================
   HELPERS
========================= */

function getRadio(name) {
  const el = document.querySelector('input[name="' + name + '"]:checked');
  return el ? Number(el.value) : null;
}
function norm(s) {
  return String(s || "").trim().toLowerCase()
    .replace(/[\s　]/g, "")
    .replace(/[、。，．,.!！?？「」『』（）()【】\[\]]/g, "");
}
function escapeHtml(str) {
  return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function findTab(id) { for (let i = 0; i < DATA.tabs.length; i++) if (DATA.tabs[i].id === id) return DATA.tabs[i]; return null; }
function findTabByType(t) { for (let i = 0; i < DATA.tabs.length; i++) if (DATA.tabs[i].type === t) return DATA.tabs[i]; return null; }
function findItemById(id) {
  for (let i = 0; i < DATA.tabs.length; i++) {
    const tab = DATA.tabs[i]; if (!tab.items) continue;
    for (let j = 0; j < tab.items.length; j++) if (tab.items[j].id === id) return tab.items[j];
  }
  return null;
}
function setText(id, t) { const e = document.getElementById(id); if (e) e.textContent = t; }
function setHTML(id, h) { const e = document.getElementById(id); if (e) e.innerHTML = h; }
function minRequired(total) { return total ? Math.ceil(total * 0.6) : 0; }

/* =========================
   SCORING
========================= */

function sectionResult(sectionId) {
  const tab = findTab(sectionId);
  if (!tab || !tab.items) return { correct: 0, total: 0, percent: 0 };
  let correct = 0;
  tab.items.forEach(function (item) { if (getRadio(item.id) === item.answer) correct++; });
  const total = tab.items.length;
  return { correct: correct, total: total, percent: total ? (correct / total) * 100 : 0 };
}

function calculateScore() {
  const moji = sectionResult("moji");
  const kaiwa = sectionResult("kaiwa");
  const choikai = sectionResult("choikai");
  const dokkai = sectionResult("dokkai");
  const kanji = sectionResult("kanji");

  const kosakataTab = findTab("kosakata");
  let kosakataCorrect = 0, kosakataTotal = 0;
  if (kosakataTab && kosakataTab.items) {
    kosakataTotal = kosakataTab.items.length;
    kosakataTab.items.forEach(function (item) {
      const el = document.getElementById(item.id);
      const val = el ? norm(el.value) : "";
      const accepted = (item.accepted || []).map(norm);
      if (val && accepted.indexOf(val) !== -1) kosakataCorrect++;
    });
  }

  const terjemahanTab = findTab("terjemahan");
  let trSum = 0, trMax = 0, translationIncomplete = false;
  if (terjemahanTab && terjemahanTab.items) {
    trMax = terjemahanTab.items.length * 4;
    terjemahanTab.items.forEach(function (item) {
      const sel = document.getElementById(item.id + "Score");
      const val = sel ? sel.value : "";
      if (val === "") translationIncomplete = true; else trSum += Number(val || 0);
    });
  } else { trMax = 20; }

  const totalJFT = moji.total + kaiwa.total + choikai.total + dokkai.total;
  const rawJFT = moji.correct + kaiwa.correct + choikai.correct + dokkai.correct;
  const ujianBabNilai = totalJFT ? (rawJFT / totalJFT) * 100 : 0;
  const kanjiNilai = kanji.total ? (kanji.correct / kanji.total) * 100 : 0;
  const kosakataNilai = kosakataTotal ? (kosakataCorrect / kosakataTotal) * 100 : 0;
  const terjemahanNilai = trMax ? (trSum / trMax) * 100 : 0;
  const finalNilai = 0.6 * ujianBabNilai + 0.15 * kanjiNilai + 0.15 * kosakataNilai + 0.1 * terjemahanNilai;
  const jftLikeScale = ujianBabNilai * 2.5;

  const mojiReq = minRequired(moji.total), kaiwaReq = minRequired(kaiwa.total);
  const choikaiReq = minRequired(choikai.total), dokkaiReq = minRequired(dokkai.total);
  const sectionPass = moji.correct >= mojiReq && kaiwa.correct >= kaiwaReq && choikai.correct >= choikaiReq && dokkai.correct >= dokkaiReq;
  const pass = !translationIncomplete && finalNilai >= 75 && ujianBabNilai >= 70 && kanjiNilai >= 70 && kosakataNilai >= 70 && terjemahanNilai >= 60 && sectionPass;

  setText("resJFTSummary", rawJFT + "/" + totalJFT + " soal benar");
  setText("resMoji", moji.correct + "/" + moji.total + " (" + moji.percent.toFixed(0) + "%)");
  setText("resKaiwa", kaiwa.correct + "/" + kaiwa.total + " (" + kaiwa.percent.toFixed(0) + "%)");
  setText("resChoikai", choikai.correct + "/" + choikai.total + " (" + choikai.percent.toFixed(0) + "%)");
  setText("resDokkai", dokkai.correct + "/" + dokkai.total + " (" + dokkai.percent.toFixed(0) + "%)");
  setText("resKanji", kanji.correct + "/" + kanji.total + " → " + kanjiNilai.toFixed(1));
  setText("resKosakata", kosakataCorrect + "/" + kosakataTotal + " → " + kosakataNilai.toFixed(1));
  setText("resTerjemahan", trSum + "/" + trMax + " → " + terjemahanNilai.toFixed(1) + (translationIncomplete ? " (belum dinilai guru)" : ""));
  setText("resFinal", finalNilai.toFixed(1) + " / 100");
  setText("resJFTScale", jftLikeScale.toFixed(1) + " / 250");

  const statusBox = document.getElementById("statusBox");
  if (statusBox) {
    statusBox.style.display = "block";
    if (translationIncomplete) { statusBox.textContent = "MENUNGGU PENILAIAN GURU UNTUK TERJEMAHAN"; statusBox.className = "status-box status-pending"; }
    else if (pass) { statusBox.textContent = "LULUS BAB — Mencapai standar internal LPK"; statusBox.className = "status-box status-pass"; }
    else { statusBox.textContent = "BELUM LULUS / PERLU REMEDIAL"; statusBox.className = "status-box status-fail"; }
  }

  const weaknesses = [], recommendations = [];
  if (moji.correct < mojiReq) { weaknesses.push("文字・語彙"); recommendations.push("Kuatkan kosakata dan kanji dasar: perkenalan diri, tempat kerja, kota, alam, dan ungkapan rutin."); }
  if (kaiwa.correct < kaiwaReq) { weaknesses.push("会話表現"); recommendations.push("Latih respons perkenalan, menerima instruksi, menanyakan penanggung jawab, dan pola ～という / ～たばかりです / ～ていました."); }
  if (choikai.correct < choikaiReq) { weaknesses.push("聴解"); recommendations.push("Perbanyak latihan mendengar: nama, arti nama, tempat asal, pengalaman kerja, hobi, dan perubahan tempat/waktu."); }
  if (dokkai.correct < dokkaiReq) { weaknesses.push("読解"); recommendations.push("Latih membaca teks pendek fungsional: perkenalan diri, pengenalan staf, deskripsi kota, dan memo rapat."); }
  if (kanjiNilai < 70) { weaknesses.push("Kanji"); recommendations.push("Hafalkan bacaan dan makna kanji: 山、川、海、島、森、客、経験、観光地、意味、漢字."); }
  if (kosakataNilai < 70) { weaknesses.push("Kosakata"); recommendations.push("Latih menulis kosakata Bab 1 dalam kanji, kana, dan romaji secukupnya."); }
  if (terjemahanNilai < 60) { weaknesses.push("Terjemahan"); recommendations.push("Latih produksi kalimat pendek dengan pola ～という、～たばかりです、～ていました、そこ、～て/～から/～けど."); }
  if (translationIncomplete) recommendations.push("Terjemahan belum dinilai guru. Login sebagai guru untuk memberi skor 0–4 pada setiap soal terjemahan.");
  if (ujianBabNilai < 70) recommendations.push("Skor Mini JFT-like masih di bawah 70. Perlu lebih banyak latihan format 4 section.");
  if (finalNilai < 75) recommendations.push("Nilai akhir bab belum mencapai 75. Fokus pada remedial section yang lemah.");
  if (recommendations.length === 0) recommendations.push("Pertahankan kemampuan ini dan lanjutkan ke try out JFT-Basic penuh 50 butir.");

  let diagnosticHtml = "<strong>Kesimpulan:</strong><br>";
  if (translationIncomplete) diagnosticHtml += "Hasil belum final karena terjemahan belum dinilai guru.<br>";
  else if (pass) diagnosticHtml += "Peserta dinyatakan <strong>LULUS BAB</strong> berdasarkan standar internal LPK.<br>";
  else diagnosticHtml += "Peserta <strong>belum lulus</strong> atau perlu remedial.<br>";
  diagnosticHtml += "<br><strong>Area yang perlu diperbaiki:</strong> " + (weaknesses.length ? weaknesses.join(", ") : "tidak ada bagian di bawah standar minimum.") + ".";
  diagnosticHtml += "<br><br><strong>Rekomendasi belajar:</strong><ul>";
  recommendations.forEach(function (r) { diagnosticHtml += "<li>" + escapeHtml(r) + "</li>"; });
  diagnosticHtml += "</ul>";
  let jftNote = jftLikeScale >= 200
    ? "Indikasi Mini JFT-like sudah mencapai ambang 200/250. Namun, keputusan siap JFT sebaiknya dikonfirmasi dengan try out penuh 50 butir."
    : jftLikeScale >= 175 ? "Indikasi Mini JFT-like mendekati ambang 200/250, tetapi masih perlu penguatan." : "Indikasi Mini JFT-like belum mencapai ambang 200/250.";
  diagnosticHtml += "<br><strong>Catatan kesiapan JFT-Basic:</strong> " + escapeHtml(jftNote);
  setHTML("diagnosticBox", diagnosticHtml);

  setHTML("criteriaBox",
    "<table><tr><th>Kriteria</th><th>Hasil</th><th>Standar</th><th>Status</th></tr>" +
    "<tr><td>Nilai Akhir Bab</td><td>" + finalNilai.toFixed(1) + "</td><td>≥ 75</td><td>" + (finalNilai >= 75 ? "OK" : "Belum OK") + "</td></tr>" +
    "<tr><td>Nilai Ujian Bab / Mini JFT-like</td><td>" + ujianBabNilai.toFixed(1) + "</td><td>≥ 70</td><td>" + (ujianBabNilai >= 70 ? "OK" : "Belum OK") + "</td></tr>" +
    "<tr><td>Nilai Kanji</td><td>" + kanjiNilai.toFixed(1) + "</td><td>≥ 70</td><td>" + (kanjiNilai >= 70 ? "OK" : "Belum OK") + "</td></tr>" +
    "<tr><td>Nilai Kosakata</td><td>" + kosakataNilai.toFixed(1) + "</td><td>≥ 70</td><td>" + (kosakataNilai >= 70 ? "OK" : "Belum OK") + "</td></tr>" +
    "<tr><td>Nilai Terjemahan</td><td>" + terjemahanNilai.toFixed(1) + "</td><td>≥ 60</td><td>" + (translationIncomplete ? "Menunggu" : terjemahanNilai >= 60 ? "OK" : "Belum OK") + "</td></tr>" +
    "<tr><td>Minimum 文字・語彙</td><td>" + moji.correct + "/" + moji.total + "</td><td>≥ " + mojiReq + "</td><td>" + (moji.correct >= mojiReq ? "OK" : "Belum OK") + "</td></tr>" +
    "<tr><td>Minimum 会話表現</td><td>" + kaiwa.correct + "/" + kaiwa.total + "</td><td>≥ " + kaiwaReq + "</td><td>" + (kaiwa.correct >= kaiwaReq ? "OK" : "Belum OK") + "</td></tr>" +
    "<tr><td>Minimum 聴解</td><td>" + choikai.correct + "/" + choikai.total + "</td><td>≥ " + choikaiReq + "</td><td>" + (choikai.correct >= choikaiReq ? "OK" : "Belum OK") + "</td></tr>" +
    "<tr><td>Minimum 読解</td><td>" + dokkai.correct + "/" + dokkai.total + "</td><td>≥ " + dokkaiReq + "</td><td>" + (dokkai.correct >= dokkaiReq ? "OK" : "Belum OK") + "</td></tr>" +
    "</table>");

  buildAnswerKey();

  lastReport = buildPlainTextReport({
    moji: moji, kaiwa: kaiwa, choikai: choikai, dokkai: dokkai, kanji: kanji,
    kosakataCorrect: kosakataCorrect, kosakataTotal: kosakataTotal,
    trSum: trSum, trMax: trMax, translationIncomplete: translationIncomplete,
    ujianBabNilai: ujianBabNilai, kanjiNilai: kanjiNilai, kosakataNilai: kosakataNilai, terjemahanNilai: terjemahanNilai,
    finalNilai: finalNilai, jftLikeScale: jftLikeScale, pass: pass, totalJFT: totalJFT, rawJFT: rawJFT
  });

  saveState();
  showResultTab();
}

function buildAnswerKey() {
  const c = document.getElementById("answerKeyContainer");
  if (!c) return;
  let html = "<h3>Kunci Jawaban (Mode Guru)</h3>";
  const secs = ["moji", "kaiwa", "choikai", "dokkai", "kanji"];
  html += "<details open><summary>Kunci Pilihan Ganda</summary><table><tr><th>Section</th><th>No Soal</th><th>Kunci</th></tr>";
  secs.forEach(function (sid) {
    const tab = findTab(sid); if (!tab || !tab.items) return;
    tab.items.forEach(function (item, idx) { html += "<tr><td>" + escapeHtml(tab.label || "") + "</td><td>" + (idx + 1) + "</td><td>" + item.answer + "</td></tr>"; });
  });
  html += "</table></details>";
  const kt = findTab("kosakata");
  if (kt && kt.items) {
    html += "<details><summary>Kunci Kosakata</summary><table><tr><th>No</th><th>Jawaban yang diterima</th></tr>";
    kt.items.forEach(function (item, idx) { html += "<tr><td>" + (idx + 1) + '</td><td class="ja">' + (item.accepted || []).join(" / ") + "</td></tr>"; });
    html += "</table></details>";
  }
  const tt = findTab("terjemahan");
  if (tt && tt.items) {
    html += '<details><summary>Contoh Jawaban Terjemahan</summary><ol class="ja">';
    tt.items.forEach(function (item) { html += "<li>" + (item.sample || "") + "</li>"; });
    html += "</ol></details>";
  }
  c.innerHTML = html;
}

function buildPlainTextReport(s) {
  let session = {}; try { session = JSON.parse(safeGetItem(SESSION_KEY) || "{}"); } catch (e) { session = {}; }
  return ("LAPORAN LKPD BAHASA JEPANG BAB 1\nLevel: A2 / Persiapan JFT-Basic / LPK\n\n" +
    "Nama   : " + (session.name || "-") + "\nKelas  : " + (session.kelas || "-") + "\nTanggal: " + (session.date || "-") + "\n\n" +
    "A. MINI JFT-LIKE\n文字・語彙 : " + s.moji.correct + "/" + s.moji.total + "\n会話表現   : " + s.kaiwa.correct + "/" + s.kaiwa.total +
    "\n聴解       : " + s.choikai.correct + "/" + s.choikai.total + "\n読解       : " + s.dokkai.correct + "/" + s.dokkai.total +
    "\nTotal      : " + s.rawJFT + "/" + s.totalJFT + "\nNilai Ujian Bab : " + s.ujianBabNilai.toFixed(1) + " / 100\nIndikasi JFT 0-250 : " + s.jftLikeScale.toFixed(1) + " / 250\n\n" +
    "B. KOMPONEN LPK\nKanji      : " + s.kanji.correct + "/" + s.kanji.total + " → " + s.kanjiNilai.toFixed(1) +
    "\nKosakata   : " + s.kosakataCorrect + "/" + s.kosakataTotal + " → " + s.kosakataNilai.toFixed(1) +
    "\nTerjemahan : " + s.trSum + "/" + s.trMax + " → " + s.terjemahanNilai.toFixed(1) + (s.translationIncomplete ? " (belum dinilai guru)" : "") + "\n\n" +
    "C. NILAI AKHIR BAB\nRumus: 60% Ujian Bab + 15% Kanji + 15% Kosakata + 10% Terjemahan\nNilai Akhir: " + s.finalNilai.toFixed(1) + " / 100\n\n" +
    "D. STATUS\n" + (s.translationIncomplete ? "MENUNGGU PENILAIAN GURU UNTUK TERJEMAHAN" : s.pass ? "LULUS BAB" : "BELUM LULUS / PERLU REMEDIAL") + "\n").trim();
}

function copyReport() {
  if (!lastReport) { alert("Klik Hitung Nilai terlebih dahulu."); return; }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(lastReport).then(function () { alert("Laporan berhasil disalin ke clipboard."); }).catch(fallbackCopy);
  } else fallbackCopy();
}
function fallbackCopy() {
  const ta = document.createElement("textarea"); ta.value = lastReport; ta.style.position = "fixed"; ta.style.opacity = "0";
  document.body.appendChild(ta); ta.select();
  try { document.execCommand("copy"); alert("Laporan berhasil disalin."); } catch (e) { alert("Gagal menyalin. Salin manual dari hasil Hitung Nilai."); }
  document.body.removeChild(ta);
}
function showResultTab() {
  const rt = findTabByType("result"); if (!rt) return;
  const btns = document.querySelectorAll(".tab-btn");
  for (let i = 0; i < btns.length; i++) if (btns[i].textContent === rt.label) { openTab(rt.id, btns[i]); break; }
}

/* =========================
   AUDIO
========================= */

function safeAudioSrc(path) {
  if (!path) return "";
  const i = path.lastIndexOf("/");
  const dir = i >= 0 ? path.slice(0, i + 1) : "";
  const name = i >= 0 ? path.slice(i + 1) : path;
  return dir + encodeURIComponent(name);
}

function stopCurrentAudio() {
  if (currentAudio) { currentAudio.onended = null; currentAudio.onerror = null; currentAudio.pause(); currentAudio.currentTime = 0; currentAudio = null; }
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  if (currentButton && currentButton.dataset.originalLabel) currentButton.textContent = currentButton.dataset.originalLabel;
  currentButton = null;
}

function playItemAudio(id, btn) {
  const item = findItemById(id);
  if (!item) { alert("Soal tidak ditemukan."); return; }
  stopCurrentAudio();
  const times = Number(btn.dataset.times || LISTENING_PLAY_COUNT || 2);
  btn.dataset.originalLabel = btn.dataset.originalLabel || btn.textContent;
  currentButton = btn;

  if (item.audioUrl) {
    const audio = document.getElementById("audio-" + id);
    if (!audio) { alert("Elemen audio tidak ditemukan."); return; }
    currentAudio = audio; btn.textContent = "Memutar…";
    let played = 0;
    audio.onended = function () { played++; if (played < times) { audio.currentTime = 0; const pr = audio.play(); if (pr && pr.catch) pr.catch(onPlayErr); } else stopCurrentAudio(); };
    audio.onerror = function () { console.error("Audio error:", item.audioUrl); if (item.script) playTts(item.script, btn, times); else { alert("File audio tidak ditemukan/format tidak didukung:\n" + item.audioUrl); stopCurrentAudio(); } };
    audio.currentTime = 0; const pr = audio.play(); if (pr && pr.catch) pr.catch(onPlayErr);
  } else if (item.script) playTts(item.script, btn, times);
  else alert("Audio dan naskah tidak tersedia untuk soal ini.");
}

function onPlayErr(err) { console.error(err); alert("Browser memblokir pemutaran audio. Klik tombol sekali lagi."); stopCurrentAudio(); }

function playTts(text, btn, times) {
  if (!("speechSynthesis" in window)) { alert("Browser tidak mendukung text-to-speech."); stopCurrentAudio(); return; }
  window.speechSynthesis.cancel();
  btn.dataset.originalLabel = btn.dataset.originalLabel || btn.textContent; btn.textContent = "Memutar…"; currentButton = btn;
  let played = 0;
  const u = new SpeechSynthesisUtterance(text); u.lang = "ja-JP"; u.rate = 0.9;
  const voices = window.speechSynthesis.getVoices(); let jv = null;
  for (let i = 0; i < voices.length; i++) if (voices[i].lang && voices[i].lang.toLowerCase().indexOf("ja") === 0) { jv = voices[i]; break; }
  if (jv) u.voice = jv; else console.warn("Voice ja tidak ditemukan; memakai default.");
  u.onend = function () { played++; if (played < times) window.speechSynthesis.speak(u); else stopCurrentAudio(); };
  u.onerror = function () { alert("TTS gagal diputar."); stopCurrentAudio(); };
  window.speechSynthesis.speak(u);
}

/* =========================
   START
========================= */

document.addEventListener("DOMContentLoaded", init);
if ("speechSynthesis" in window) window.speechSynthesis.onvoiceschanged = function () {};