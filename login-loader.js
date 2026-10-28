/* Loading screen + login baru untuk Viollen. Pasang tepat setelah <body>. */
(function(){
  var B = document.body;
  var holdNow = true, authDone = false, wasOut = false, held = "out";

  function mkLoader(){
    var L = document.createElement("div");
    L.className = "loader"; L.setAttribute("role", "status"); L.setAttribute("aria-label", "Memuat");
    L.innerHTML = '<div class="ld-in"><div class="ld-logo"><img class="ld-base" src="logo_viollen.png" alt=""><img class="ld-fill" src="logo_viollen.png" alt=""><span class="ld-scan"></span></div>'
      + '<div class="ld-meta"><div class="ld-pct"><span class="n">0</span><small>%</small></div><div class="ld-bar"><i></i></div><p class="ld-st">Menyiapkan tampilan</p></div></div>';
    B.prepend(L);
    return {el: L, n: L.querySelector(".n"), st: L.querySelector(".ld-st")};
  }
  function paint(o, p, labels){
    o.el.style.setProperty("--p", p.toFixed(1) + "%");
    o.n.textContent = Math.round(p);
    o.st.textContent = p < 35 ? labels[0] : p < 75 ? labels[1] : p < 100 ? labels[2] : "Siap";
  }

  /* ===== loading awal ===== */
  var first = mkLoader(), ready = {load: document.readyState === "complete", fonts: false};
  addEventListener("load", function(){ ready.load = true; });
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(function(){ ready.fonts = true; });

  // tahan class "in/out" dari skrip utama sampai loading selesai
  function onClass(){
    var c = B.classList, isIn = c.contains("in"), isOut = c.contains("out");
    if (!isIn && !isOut) return;
    if (!holdNow && wasOut && isIn) startAuthLoader();   // login lewat popup Google
    if (holdNow) { held = isIn ? "in" : "out"; authDone = true; c.remove("in", "out"); return; }
    wasOut = isOut;
  }
  new MutationObserver(onClass).observe(B, {attributes: true, attributeFilter: ["class"]});
  onClass();

  var p = 0, t0 = performance.now();
  function tick(now){
    var el = now - t0, all = (ready.load && ready.fonts && authDone) || el > 7000;
    var target = all && el > 2000 ? 100 : Math.min(88, el / 2600 * 88);
    p += (target - p) * .08;
    if (target === 100 && p > 99.3) p = 100;
    paint(first, p, ["Menyiapkan tampilan", "Memuat data", "Hampir siap"]);
    if (p >= 100) {
      holdNow = false; wasOut = held === "out";
      B.classList.add(held); first.el.classList.add("done");
      setTimeout(function(){ first.el.remove(); }, 1300);
      return;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  /* ===== loading saat login ===== */
  var A = null;
  function startAuthLoader(){
    if (A) return;
    holdNow = true; authDone = false; held = "out";
    A = mkLoader(); var a = 0, t = performance.now(), dead = false, me = A;
    function end(cls, ms){ dead = true; holdNow = false; me.el.classList.add(cls); setTimeout(function(){ me.el.remove(); }, ms); if (A === me) A = null; }
    me.cancel = function(){ end("fade", 600); };
    setTimeout(function(){ if (!dead) { me.cancel(); } }, 20000);
    (function step(now){
      if (dead) return;
      var el = now - t, target = authDone && el > 900 ? 100 : Math.min(85, el / 2200 * 85);
      a += (target - a) * .1;
      if (target === 100 && a > 99.3) a = 100;
      paint(me, a, ["Memeriksa akun", "Menyinkronkan data", "Hampir siap"]);
      if (a >= 100) { wasOut = held === "out"; B.classList.add(held); end("done", 1300); return; }
      requestAnimationFrame(step);
    })(t);
  }

  /* ===== ubah form login yang ada (handler Firebase tetap utuh) ===== */
  document.addEventListener("DOMContentLoaded", function(){
    var g = document.getElementById("authGate"), f = document.getElementById("authForm");
    if (!g || !f) return;
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

    // animasi loading saat proses login
    f.addEventListener("submit", startAuthLoader);
    su.addEventListener("click", function(){ if (f.checkValidity()) startAuthLoader(); });
    // kalau gagal (ada pesan error), loading ditutup
    var msg = document.getElementById("authMsg");
    new MutationObserver(function(){
      if (msg.textContent.trim() && A && A.cancel) A.cancel();
    }).observe(msg, {childList: true, characterData: true, subtree: true});
  });
})();
