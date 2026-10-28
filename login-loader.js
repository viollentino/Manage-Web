/* Loading screen + login baru untuk Viollen. Pasang tepat setelah <body>. */
(function(){
  var B = document.body;
  var L = document.createElement("div");
  L.className = "loader"; L.setAttribute("role", "status"); L.setAttribute("aria-label", "Memuat");
  L.innerHTML = '<div class="ld-in"><div class="ld-logo"><img class="ld-base" src="logo_viollen.png" alt=""><img class="ld-fill" src="logo_viollen.png" alt=""><span class="ld-scan"></span></div>'
    + '<div class="ld-meta"><div class="ld-pct"><span id="ldPct">0</span><small>%</small></div><div class="ld-bar"><i></i></div><p class="ld-st" id="ldSt">Menyiapkan tampilan</p></div></div>';
  B.prepend(L);
  var pct = L.querySelector("#ldPct"), st = L.querySelector("#ldSt");
  var ready = {load: document.readyState === "complete", fonts: false, auth: false};
  var p = 0, t0 = performance.now(), finished = false, held = "out";
  addEventListener("load", function(){ ready.load = true; });
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(function(){ ready.fonts = true; });
  // tahan class "in/out" dari skrip utama sampai loading selesai
  function hold(){
    if (finished) return;
    var c = B.classList;
    if (c.contains("in") || c.contains("out")) { held = c.contains("in") ? "in" : "out"; ready.auth = true; c.remove("in", "out"); }
  }
  new MutationObserver(hold).observe(B, {attributes: true, attributeFilter: ["class"]});
  hold();
  function finish(){
    finished = true; B.classList.add(held); L.classList.add("done");
    setTimeout(function(){ L.remove(); }, 1300);
  }
  function tick(now){
    var el = now - t0, all = (ready.load && ready.fonts && ready.auth) || el > 7000;
    var target = all && el > 2000 ? 100 : Math.min(88, el / 2600 * 88);
    p += (target - p) * .08;
    if (target === 100 && p > 99.3) p = 100;
    L.style.setProperty("--p", p.toFixed(1) + "%");
    pct.textContent = Math.round(p);
    st.textContent = p < 35 ? "Menyiapkan tampilan" : p < 75 ? "Memuat data" : p < 100 ? "Hampir siap" : "Siap";
    if (p >= 100) return finish();
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // ubah form login yang ada (handler Firebase tetap utuh)
  document.addEventListener("DOMContentLoaded", function(){
    var g = document.getElementById("authGate"), f = document.getElementById("authForm");
    if (!g || !f) return;
    var bg = document.createElement("div"); bg.className = "gate-bg"; bg.setAttribute("aria-hidden", "true");
    bg.innerHTML = '<div class="gb-side"></div><div class="gb-top"></div><div class="gb-hot"></div><div class="gb-hot" style="background:rgba(111,177,255,.22)"></div><div class="gb-hot" style="background:rgba(95,211,141,.2)"></div><div class="gb-wide"><svg viewBox="0 0 300 120" preserveAspectRatio="none"><path d="M0 100 C40 90 60 40 100 55 S160 100 200 50 S270 20 300 40 V120 H0Z" fill="rgba(var(--acc-rgb),.45)"/></svg></div><div></div>';
    g.prepend(bg);
    ["h2", ".brand"].forEach(function(s){ var n = f.querySelector(s); if (n) n.remove(); });
    var intro = f.querySelector("p:not(.err)"); if (intro) intro.remove();
    var logo = document.createElement("div"); logo.className = "gate-logo";
    logo.innerHTML = '<img src="logo_viollen.png" alt="Logo Viollen"><b>VIOLLEN</b><small>Masuk agar tugas, keuangan, dan jadwalmu tersinkron di semua perangkat.</small>';
    f.prepend(logo);
    var icons = {
      authEmail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
      authPass: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>'
    };
    var ph = {authEmail: "Email", authPass: "Kata sandi"};
    Object.keys(icons).forEach(function(id){
      var input = document.getElementById(id), label = input.closest("label");
      Array.prototype.slice.call(label.childNodes).forEach(function(n){ if (n.nodeType === 3) n.remove(); });
      label.className = "g-field"; label.insertAdjacentHTML("afterbegin", icons[id]);
      input.placeholder = ph[id]; input.setAttribute("aria-label", ph[id]);
    });
    var pass = document.getElementById("authPass"), eye = document.createElement("button");
    eye.type = "button"; eye.className = "g-eye"; eye.setAttribute("aria-label", "Tampilkan kata sandi");
    eye.innerHTML = '<svg class="shw" viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg><svg class="off" viewBox="0 0 24 24"><path d="M3 3l18 18M10.6 6.1A10 10 0 0112 5c6.5 0 10 7 10 7a17 17 0 01-3.2 4M6.5 6.9A17 17 0 002 12s3.5 7 10 7a9.6 9.6 0 004.2-1"/></svg>';
    eye.onclick = function(){
      var show = pass.type === "password"; pass.type = show ? "text" : "password";
      eye.classList.toggle("on", show); eye.setAttribute("aria-label", show ? "Sembunyikan kata sandi" : "Tampilkan kata sandi");
    };
    pass.closest("label").appendChild(eye);
    var go = f.querySelector('button[type="submit"]');
    go.className = "g-go"; go.setAttribute("aria-label", "Masuk");
    go.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg>';
    var alt = document.createElement("div"); alt.className = "g-alt";
    var su = document.getElementById("btnSignup"), go2 = document.getElementById("btnGoogle");
    su.className = ""; su.textContent = "Daftar akun"; go2.className = ""; go2.textContent = "Google";
    alt.append(su, go2); f.appendChild(alt);
  });
})();
