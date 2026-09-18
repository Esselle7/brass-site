/* =========================================================
   NEUTRA — main.js
   Slot media: per ogni .slot prova a caricare il video;
   se il video non esiste / non parte, resta l'immagine.
   ========================================================= */

const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

/* -------- 1. SISTEMA SLOT VIDEO/IMMAGINE -------- */
/* Ogni .slot ha:  data-video="nomefile.mp4"  data-image="nomefile.jpg"
   I file vanno in assets/video/ e assets/images/.
   Se il video carica -> mostra il video; altrimenti resta l'immagine. */
function initSlots(){
  document.querySelectorAll('.slot').forEach(slot=>{
    const videoName = slot.dataset.video;
    const imageName = slot.dataset.image;
    const alt = slot.dataset.alt || '';

    // immagine di base (fallback, sempre presente)
    const img = document.createElement('img');
    img.src = 'assets/images/' + imageName;
    img.alt = alt;
    img.loading = 'lazy';
    slot.appendChild(img);

    // se non è stato indicato un video, ci fermiamo all'immagine
    if(!videoName){ return; }

    // tentativo di caricare il video
    const video = document.createElement('video');
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = true;
    video.preload = 'auto';
    const src = document.createElement('source');
    src.src = 'assets/video/' + videoName;
    src.type = 'video/mp4';
    video.appendChild(src);

    // se il video è pronto -> mostralo (nascondendo l'immagine via CSS .has-video)
    video.addEventListener('loadeddata', ()=>{
      slot.classList.add('has-video');
      video.play().catch(()=>{}); // se il browser blocca l'autoplay, resta comunque il frame
    });
    // se il video fallisce -> rimuovilo, resta l'immagine
    video.addEventListener('error', ()=>{ video.remove(); });

    slot.appendChild(video);
  });
}
initSlots();

/* -------- 2. CURSORE PERSONALIZZATO -------- */
const cursor = document.getElementById('cursor');
let cx=innerWidth/2, cy=innerHeight/2, tx=cx, ty=cy;
addEventListener('mousemove', e=>{ tx=e.clientX; ty=e.clientY; });
(function loop(){
  cx += (tx-cx)*.18; cy += (ty-cy)*.18;
  cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
  requestAnimationFrame(loop);
})();
document.querySelectorAll('[data-cursor]').forEach(el=>{
  el.addEventListener('mouseenter', ()=>cursor.classList.add('grow'));
  el.addEventListener('mouseleave', ()=>cursor.classList.remove('grow'));
});

/* -------- 3. MENU FULLSCREEN -------- */
const overlay = document.getElementById('overlay');
document.getElementById('menuOpen').addEventListener('click', ()=>overlay.classList.add('open'));
document.getElementById('menuClose').addEventListener('click', ()=>overlay.classList.remove('open'));
addEventListener('keydown', e=>{ if(e.key==='Escape') overlay.classList.remove('open'); });

/* -------- 4. SMOOTH SCROLL (Lenis) -------- */
let lenis;
if(!reduce && typeof Lenis!=='undefined'){
  lenis = new Lenis({ duration:1.15, easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)), smoothWheel:true, lerp:0.09 });
  function raf(t){ lenis.raf(t); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
}

/* -------- 5. ANIMAZIONI SCROLL (GSAP + ScrollTrigger) -------- */
if(typeof gsap!=='undefined'){
  gsap.registerPlugin(ScrollTrigger);
  if(lenis){ lenis.on('scroll', ScrollTrigger.update); }

  if(reduce){
    document.querySelectorAll('[data-hero-line],.lines span i').forEach(e=>{e.style.transform='none';});
    document.querySelectorAll('[data-clip],[data-feat-clip]').forEach(e=>{e.style.clipPath='inset(0)';});
  } else {
    /* HERO: titolo che sale al load + parallax sfondo */
    gsap.set('[data-hero-line]', {yPercent:115});
    gsap.to('[data-hero-line]', {yPercent:0, duration:1.2, ease:'expo.out', stagger:.09, delay:.25});
    gsap.to('[data-hero-bg]', {yPercent:22, ease:'none', scrollTrigger:{trigger:'.hero', start:'top top', end:'bottom top', scrub:true}});

    /* INTRO: parole che si illuminano con scrub */
    document.querySelectorAll('[data-words]').forEach(p=>{
      const words = p.textContent.trim().split(/\s+/);
      p.innerHTML = words.map(w=>`<span class="word">${w}</span>`).join(' ');
      gsap.fromTo(p.querySelectorAll('.word'), {opacity:.12}, {opacity:1, ease:'none', stagger:.05,
        scrollTrigger:{trigger:p, start:'top 82%', end:'top 30%', scrub:true}});
    });

    /* UP reveal generici */
    gsap.utils.toArray('[data-up]').forEach(el=>{
      gsap.fromTo(el, {y:46, opacity:0}, {y:0, opacity:1, duration:1, ease:'power3.out',
        scrollTrigger:{trigger:el, start:'top 88%'}});
    });

    /* COLLEZIONI: clip-reveal a cascata */
    gsap.utils.toArray('.col-card .imgwrap[data-clip]').forEach((el,i)=>{
      gsap.fromTo(el, {clipPath:'inset(100% 0 0 0)'}, {clipPath:'inset(0% 0 0 0)', duration:1.1, ease:'power3.out',
        scrollTrigger:{trigger:'.col-grid', start:'top 80%'}, delay:i*.1});
    });

    /* FEATURE: titolo a righe + immagine clip-reveal */
    gsap.utils.toArray('.feature').forEach(sec=>{
      const lines = sec.querySelectorAll('.lines span i');
      gsap.set(lines, {yPercent:115});
      gsap.to(lines, {yPercent:0, duration:1.1, ease:'expo.out', stagger:.1,
        scrollTrigger:{trigger:sec, start:'top 70%'}});
      const wrap = sec.querySelector('[data-feat-clip]');
      gsap.fromTo(wrap, {clipPath:'inset(0 0 100% 0)'}, {clipPath:'inset(0 0 0% 0)', duration:1.3, ease:'power3.out',
        scrollTrigger:{trigger:sec, start:'top 72%'}});
    });

    /* PARALLAX media (immagine o video, indifferente) */
    gsap.utils.toArray('[data-parallax-media]').forEach(el=>{
      gsap.fromTo(el, {yPercent:-12}, {yPercent:12, ease:'none',
        scrollTrigger:{trigger:el, start:'top bottom', end:'bottom top', scrub:true}});
    });

    addEventListener('load', ()=>ScrollTrigger.refresh());
  }
}
