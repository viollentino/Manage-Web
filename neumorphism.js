/* Neumorphism theme untuk Viollen — pasang: <script src="neumorphism.js" defer></script> di <head> */
(function () {
  var root = document.documentElement;
  var mode = "dark";
  try { mode = localStorage.getItem("neu-mode") || "dark"; } catch (e) {}
  root.dataset.mode = mode === "light" ? "light" : "dark";

  var CSS = `
html[data-mode]{--r:7px 7px 16px var(--nsd),-7px -7px 16px var(--nsl);--rs:4px 4px 9px var(--nsd),-4px -4px 9px var(--nsl);--rx:2px 2px 5px var(--nsd),-2px -2px 5px var(--nsl);--i:inset 5px 5px 11px var(--nsd),inset -5px -5px 11px var(--nsl);--is:inset 3px 3px 7px var(--nsd),inset -3px -3px 7px var(--nsl);
--noise:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .07 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")}
html[data-mode=dark]{color-scheme:dark;--nb:#24262c;--nsd:rgba(8,9,12,.72);--nsl:rgba(62,66,77,.55);--nt:#eceef3;--nt2:#c3c6cf;--muted:#9296a1;--at:var(--acc-text);--line:rgba(255,255,255,.07);--track:rgba(255,255,255,.1);--nameC:color-mix(in srgb,var(--acc) 40%,#000)}
html[data-mode=light]{color-scheme:light;--nb:#e4e9f0;--nsd:rgba(158,170,190,.75);--nsl:rgba(255,255,255,.95);--nt:#232a38;--nt2:#4a5366;--muted:#6c7587;--at:var(--acc);--line:rgba(0,0,0,.08);--track:rgba(0,0,0,.09);--ok:#1c9a57;--bad:#d4243a;--info:#2c6ed0;--warn:#a8741a;--nameC:color-mix(in srgb,var(--acc) 62%,#000)}
body{background-color:var(--nb);background-image:var(--noise);background-attachment:fixed;color:var(--nt)}
#bg{opacity:.12}
html[data-mode=light] #bg,html[data-mode=light] .smoke,html[data-mode=light] #embers{display:none}
body.in .smoke{opacity:.3}
::view-transition-old(root),::view-transition-new(root){animation:none;mix-blend-mode:normal}
::view-transition-old(root){z-index:1}::view-transition-new(root){z-index:2}

/* animasi khas neumorphism: timbul dari permukaan */
@keyframes dropIn{from{opacity:0;transform:scale(.93);filter:blur(5px);box-shadow:0 0 0 0 transparent,0 0 0 0 transparent}to{opacity:1;transform:none;filter:none}}
@keyframes swapIn{from{opacity:0;transform:scale(.93);filter:blur(5px);box-shadow:0 0 0 0 transparent,0 0 0 0 transparent}to{opacity:1;transform:none;filter:none}}
.modal{transform:scale(1.04);opacity:0;filter:blur(10px);transition:transform .7s cubic-bezier(.22,1,.36,1),opacity .55s,filter .55s,visibility 0s linear .7s;background:var(--nb)}
.modal.open{transform:none;opacity:1;filter:none;transition:transform .7s cubic-bezier(.22,1,.36,1),opacity .55s,filter .55s,visibility 0s}

/* switch mode */
.nav-r{display:flex;align-items:center;gap:.8rem}
.msw{display:inline-flex;gap:.3rem;padding:.3rem;border-radius:16px;background:var(--nb);box-shadow:var(--i)}
.msw button{width:36px;height:36px;border-radius:12px;border:0;background:transparent;color:var(--muted);display:grid;place-items:center;cursor:pointer;transition:box-shadow .45s,background .45s,color .45s}
.msw button svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;transition:transform .7s cubic-bezier(.22,1,.36,1)}
.msw button[aria-pressed=true]{background:var(--nb);box-shadow:var(--rx);color:var(--at)}
.msw button[aria-pressed=true] svg{transform:rotate(360deg) scale(1.1)}
.msw button:hover{color:var(--nt)}
.mtop .msw button{width:32px;height:32px}

/* navbar & hero */
.nav{background:var(--nb);border:0;box-shadow:var(--r);backdrop-filter:none;-webkit-backdrop-filter:none}
.links{color:var(--nt2)}
.links button{background:var(--nb)}
.links button:hover{background:var(--nb);color:var(--at);box-shadow:var(--rs);transform:none}
.links button:active{box-shadow:var(--is)}
.burger{color:var(--nt)}
.mobile button{color:var(--nt2)}
.btn.red{background:var(--acc);color:#fff;box-shadow:var(--rs)}
.btn.red:hover{box-shadow:var(--r);transform:translateY(-1px)}
.btn.ghost{background:var(--nb);color:var(--nt);border:0;box-shadow:var(--rs)}
.btn.ghost:hover{background:var(--nb);box-shadow:var(--r)}
.btn:active{transform:none;box-shadow:inset 3px 3px 8px rgba(0,0,0,.35),inset -2px -2px 6px rgba(255,255,255,.15)!important}
main{background:transparent}
main::after{background:linear-gradient(transparent,var(--nb))}
.name span{background-image:none;-webkit-background-clip:border-box;background-clip:border-box;-webkit-text-fill-color:var(--nameC);color:var(--nameC);text-shadow:6px 8px 14px var(--nsd),-5px -5px 12px var(--nsl)}
html[data-mode=dark] .hero-obj{filter:none}
html[data-mode=light] .hero-obj{filter:drop-shadow(0 16px 22px var(--nsd))}
.social{background:var(--nb);border:0;box-shadow:var(--r);backdrop-filter:none;-webkit-backdrop-filter:none}
.sbtn{background:var(--nb);color:var(--nt);box-shadow:var(--rx)}
.sbtn svg{fill:currentColor}
.sbtn:hover{background:var(--nb);color:var(--at);box-shadow:var(--rs)}
.sbtn:active{box-shadow:var(--is);transform:none}
footer{color:var(--muted);border-top:1px solid var(--line)}
.themes button,.themes .custom{border:0;box-shadow:var(--rs)}

/* modal */
.panel,.panel.glass{background:var(--noise),var(--nb)}
.x{background:var(--nb);color:var(--nt);box-shadow:var(--rs)}
.x:hover{background:var(--nb);color:var(--at)}
.x:active{box-shadow:var(--is)}
.mtop{background:var(--nb);border:0;box-shadow:0 8px 18px -8px var(--nsd);backdrop-filter:none;-webkit-backdrop-filter:none}
.mtop .logo{color:var(--nt)}
.mtop nav button{color:var(--muted)}
.mtop nav button:hover{background:none;color:var(--nt)}
.mtop nav button.on,.mtop nav button.on:hover{color:var(--at)}
.mtop nav .pill{background:var(--nb);box-shadow:var(--is)}
.hud-panel::after{color:var(--muted);opacity:.5}

/* kartu & teks */
.box{background:var(--nb);border:0;box-shadow:var(--r)}
.glass{background:var(--nb);border:0;backdrop-filter:none;-webkit-backdrop-filter:none;box-shadow:var(--r)}
.ab-tag,.h-tag,.hl,.hobby .tap,.class .t,.today{color:var(--at)}
.ab-title span,.h-title em{text-shadow:2px 2px 4px var(--nsd),-2px -2px 4px var(--nsl)}
.h-title.one em{color:var(--nt);text-shadow:2px 2px 4px var(--nsd),-2px -2px 4px var(--nsl)}
.ab-right p,.stat small,.proj p,.mbody p,.stat-line,.llegend,.gstats span,.hobby p{color:var(--nt2)}
.h-sub,.hud-deco,.cap{color:var(--muted)}
.empty-radar p{color:var(--nt)}
.stack{background:var(--nb);border:0;box-shadow:var(--i)}
.ab-dl{background:var(--nb);color:var(--nt);border:0;box-shadow:var(--rs)}
.ab-dl:hover{box-shadow:var(--r)}
.tech span{background:var(--nb);color:var(--nt);border:0;box-shadow:var(--rs)}
.tech span:hover{background:var(--nb);color:var(--at);box-shadow:var(--is);transform:none}
.hobby .hc{background:var(--nb)}
.hobby h4{color:var(--nt)}
.task{background:var(--nb);border:0;box-shadow:var(--rs)}
.del:hover{background:none}
.pill.none{background:var(--track)}
.tagl{background:var(--nb);border:0;box-shadow:var(--rx)}
.proj:hover,.mapcard:hover{transform:translateY(-3px);box-shadow:9px 9px 20px var(--nsd),-9px -9px 20px var(--nsl)}
.class{background:var(--nb)}

/* tombol tambah & form */
.addbtn{border:0;background:var(--nb);color:var(--nt);box-shadow:var(--rs)}
.addbtn:hover{background:var(--nb);box-shadow:var(--r)}
.addwrap.open .addbtn{box-shadow:var(--is);color:var(--at)}
.addbtn .pl{box-shadow:var(--rx);color:#fff}
.addin{padding:4px 16px 18px;margin:-4px -16px -18px}
.field{background:var(--nb);color:var(--nt);border:0;box-shadow:var(--is)}
.field:focus{box-shadow:var(--i),0 0 0 2px rgba(var(--acc-rgb),.45)}
select.field option{background:var(--nb);color:var(--nt)}
.submit{color:#fff;box-shadow:var(--rs)}
.submit:hover{filter:none;box-shadow:var(--r)}
.submit:active{box-shadow:inset 3px 3px 8px rgba(0,0,0,.35),inset -2px -2px 6px rgba(255,255,255,.15)}
.chip{border:0;background:var(--nb);color:var(--nt2);box-shadow:var(--rx)}
.chip:hover{background:var(--nb);color:var(--at);box-shadow:var(--is)}
.extra{background:var(--nb);border:0;box-shadow:var(--i)}

/* kalender, tab, grafik */
.cal-head button{background:var(--nb);border:0;color:var(--nt);box-shadow:var(--rx)}
.cal-head button:hover{background:var(--nb);color:var(--at)}
.cal-grid .d.mark{background:var(--nb);box-shadow:var(--is)}
#clsCal .d.mark{background:var(--nb);box-shadow:var(--is);color:var(--at)}
.cal-grid .d.today,#clsCal .d.today{background:var(--acc);color:#fff;box-shadow:var(--rx)}
.dtabs button{border:0;background:var(--nb);color:var(--nt2);box-shadow:var(--rx)}
.dtabs button[aria-selected="true"]{background:transparent;box-shadow:none;color:var(--at)}
.dtabs .dpill{background:var(--nb);box-shadow:var(--is)}
.gbar,.lbar{background:var(--nb);box-shadow:var(--is)}
.ggrid i{background:var(--track)}
.ggrid i.on{background:var(--acc)}
.ring .tr{stroke:var(--track)}
.ring .rv{filter:drop-shadow(0 0 4px rgba(var(--acc-rgb),.5))}
.ring .rlab,.donut-wrap text{fill:var(--nt)}
.ring .rbig{fill:var(--at)}
.chart-svg text,.tchart text{fill:var(--muted)}
.tchart rect[fill^="rgba"]{fill:var(--track)}
.tchart line,.chart-svg line{stroke:var(--track)}

/* login */
.gate{background:var(--noise),var(--nb)}
`;

  var st = document.createElement("style");
  st.id = "neu-css"; st.textContent = CSS;
  document.head.appendChild(st);

  var SUN = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  var MOON = '<path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/>';

  function sync() {
    document.querySelectorAll(".msw button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.m === root.dataset.mode));
    });
    var meta = document.getElementById("metaTheme");
    if (meta) meta.setAttribute("content", getComputedStyle(root).getPropertyValue("--nb").trim());
  }

  function setMode(m, btn) {
    if (root.dataset.mode === m) return;
    var apply = function () {
      root.dataset.mode = m;
      try { localStorage.setItem("neu-mode", m); } catch (e) {}
      sync();
    };
    var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduced) { apply(); return; }
    var r = btn.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    var end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    var t = document.startViewTransition(apply);
    t.ready.then(function () {
      root.animate(
        { clipPath: ["circle(0px at " + x + "px " + y + "px)", "circle(" + end + "px at " + x + "px " + y + "px)"] },
        { duration: 1000, easing: "cubic-bezier(.22,1,.36,1)", pseudoElement: "::view-transition-new(root)" }
      );
    }).catch(function () {});
  }

  function mk() {
    var d = document.createElement("div");
    d.className = "msw"; d.setAttribute("role", "group"); d.setAttribute("aria-label", "Mode tampilan");
    d.innerHTML =
      '<button type="button" data-m="light" aria-label="Mode terang" title="Mode terang"><svg viewBox="0 0 24 24" aria-hidden="true">' + SUN + '</svg></button>' +
      '<button type="button" data-m="dark" aria-label="Mode gelap" title="Mode gelap"><svg viewBox="0 0 24 24" aria-hidden="true">' + MOON + '</svg></button>';
    d.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () { setMode(b.dataset.m, b); });
    });
    return d;
  }

  function init() {
    document.head.appendChild(st); // pastikan CSS ini paling akhir
    var ni = document.querySelector(".nav-in"), lo = document.getElementById("btnLogout"), bg = document.getElementById("burger");
    if (ni && lo && bg) {
      var r = document.createElement("div"); r.className = "nav-r";
      ni.insertBefore(r, lo); r.append(mk(), lo, bg);
    }
    document.querySelectorAll(".mtop").forEach(function (t) { t.appendChild(mk()); });
    var p = document.querySelector("#i-mail path"); if (p) p.setAttribute("stroke", "currentColor");
    sync();
    setTimeout(function () { window.dispatchEvent(new Event("resize")); }, 60);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
