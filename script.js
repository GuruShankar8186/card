/* ============================================================
   BIRTHDAY SURPRISE WEBSITE — script.js
   Made with ❤️ by Guru Shankar for Sivaranjani
============================================================ */

// ============================================================
// 1. LOADING SCREEN
// ============================================================
(function initLoading() {
  const loadingScreen = document.getElementById('loading-screen');
  const loadingBar    = document.getElementById('loadingBar');
  const loadingPct    = document.getElementById('loadingPercent');
  const heartsC       = document.getElementById('loadingHeartsContainer');
  const sparksC       = document.getElementById('loadingSparkles');

  // Spawn loading hearts
  const heartsArr = ['❤️','💕','💖','💗','💝','🌸','✨','💫'];
  for (let i = 0; i < 22; i++) {
    const h = document.createElement('div');
    h.className = 'float-heart';
    h.textContent = heartsArr[i % heartsArr.length];
    h.style.setProperty('--dur',  (6 + Math.random() * 6) + 's');
    h.style.setProperty('--delay', (Math.random() * 4) + 's');
    h.style.setProperty('--drift', ((Math.random() - 0.5) * 100) + 'px');
    h.style.setProperty('--rot',  ((Math.random() - 0.5) * 40) + 'deg');
    h.style.left = Math.random() * 100 + '%';
    heartsC.appendChild(h);
  }

  // Spawn sparkles on loading screen
  const sparkSymbols = ['✨','⭐','💫','🌟'];
  for (let i = 0; i < 18; i++) {
    const s = document.createElement('div');
    s.className = 'load-sparkle';
    s.textContent = sparkSymbols[i % sparkSymbols.length];
    s.style.left = Math.random() * 100 + '%';
    s.style.top  = Math.random() * 100 + '%';
    s.style.animationDelay = (Math.random() * 2) + 's';
    s.style.animationDuration = (2 + Math.random() * 2) + 's';
    sparksC.appendChild(s);
  }

  // Animate progress
  let pct = 0;
  const interval = setInterval(() => {
    const inc = Math.random() * 4 + 1;
    pct = Math.min(100, pct + inc);
    loadingBar.style.width = pct + '%';
    loadingPct.textContent = Math.floor(pct) + '%';

    if (pct >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
          loadingScreen.style.display = 'none';
          startHeroAnimations();
        }, 900);
      }, 300);
    }
  }, 40);
})();

// ============================================================
// 2. HERO ANIMATIONS (run after loading ends)
// ============================================================
function startHeroAnimations() {
  spawnGlobalHearts();
  startSparkleCanvas();
  initCountdown();
  initCarousel();
  initObserver();
  initTypewriter();
}

// ============================================================
// 3. GLOBAL FLOATING HEARTS
// ============================================================
function spawnGlobalHearts() {
  const container = document.getElementById('globalHearts');
  const symbols = ['❤️','💕','💖','💗','🌸','💝','💓','💞'];

  function createHeart() {
    const h = document.createElement('div');
    h.className = 'float-heart';
    h.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const dur   = 8 + Math.random() * 10;
    const delay = Math.random() * 5;
    const drift = ((Math.random() - 0.5) * 120);
    const rot   = ((Math.random() - 0.5) * 60);
    h.style.setProperty('--dur',   dur + 's');
    h.style.setProperty('--delay', delay + 's');
    h.style.setProperty('--drift', drift + 'px');
    h.style.setProperty('--rot',   rot + 'deg');
    h.style.left     = Math.random() * 100 + '%';
    h.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
    container.appendChild(h);
    setTimeout(() => h.remove(), (dur + delay) * 1000);
  }

  // Initial batch
  for (let i = 0; i < 12; i++) createHeart();
  setInterval(createHeart, 1200);
}

// ============================================================
// 4. SPARKLE CANVAS
// ============================================================
function startSparkleCanvas() {
  const canvas = document.getElementById('sparkleCanvas');
  const ctx    = canvas.getContext('2d');
  let sparkles = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Sparkle {
    constructor() { this.reset(); }
    reset() {
      this.x     = Math.random() * canvas.width;
      this.y     = Math.random() * canvas.height;
      this.size  = Math.random() * 3 + 1;
      this.alpha = 0;
      this.speed = Math.random() * 0.02 + 0.008;
      this.phase = Math.random() * Math.PI * 2;
      this.color = ['#f9a8d4','#c084fc','#fb7185','#ffd700','#ffffff'][Math.floor(Math.random()*5)];
    }
    draw() {
      this.phase += this.speed;
      this.alpha  = Math.max(0, Math.sin(this.phase) * 0.7);
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle   = this.color;
      ctx.shadowBlur  = 6;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      // Star shape
      for (let i = 0; i < 5; i++) {
        const angle  = (i * 4 * Math.PI / 5) - Math.PI / 2;
        const angle2 = ((i * 4 + 2) * Math.PI / 5) - Math.PI / 2;
        const x1 = this.x + Math.cos(angle)  * this.size;
        const y1 = this.y + Math.sin(angle)  * this.size;
        const x2 = this.x + Math.cos(angle2) * (this.size * 0.4);
        const y2 = this.y + Math.sin(angle2) * (this.size * 0.4);
        i === 0 ? ctx.moveTo(x1, y1) : ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      if (this.phase > Math.PI * 4) this.reset();
    }
  }

  for (let i = 0; i < 60; i++) sparkles.push(new Sparkle());

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sparkles.forEach(s => s.draw());
    requestAnimationFrame(loop);
  }
  loop();
}

// ============================================================
// 5. HERO PARTICLES
// ============================================================
(function initHeroParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    const p   = document.createElement('div');
    p.className = 'hero-particle';
    const size  = Math.random() * 8 + 3;
    const dur   = 4 + Math.random() * 5;
    const delay = Math.random() * 4;
    const dx    = ((Math.random() - 0.5) * 80);
    const dy    = -(20 + Math.random() * 60);
    p.style.width  = size + 'px';
    p.style.height = size + 'px';
    p.style.left   = Math.random() * 100 + '%';
    p.style.top    = Math.random() * 100 + '%';
    p.style.setProperty('--dur',   dur + 's');
    p.style.setProperty('--dx',    dx + 'px');
    p.style.setProperty('--dy',    dy + 'px');
    p.style.animationDelay    = delay + 's';
    p.style.animationDuration = dur + 's';
    container.appendChild(p);
  }
})();

// ============================================================
// 6. SMOOTH SCROLL — "Begin Surprise" button
// ============================================================
document.getElementById('beginBtn').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('countdown').scrollIntoView({ behavior: 'smooth' });
});

// ============================================================
// 7. COUNTDOWN TIMER
// ============================================================
function initCountdown() {
  function update() {
    const now      = new Date();
    const year     = now.getFullYear();
    const bday     = new Date(year, 5, 8); // June 8 (month is 0-indexed)
    if (now > bday) bday.setFullYear(year + 1);

    const diff = bday - now;
    if (diff <= 0) {
      // It's birthday!
      document.getElementById('countdownGrid').style.display = 'none';
      document.getElementById('birthdayNow').style.display   = 'block';
      return;
    }

    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000)  / 60000);
    const secs  = Math.floor((diff % 60000)    / 1000);

    const fmt = n => String(n).padStart(2, '0');
    document.getElementById('cd-days').textContent  = fmt(days);
    document.getElementById('cd-hours').textContent = fmt(hours);
    document.getElementById('cd-mins').textContent  = fmt(mins);
    document.getElementById('cd-secs').textContent  = fmt(secs);
  }
  update();
  setInterval(update, 1000);
}

// ============================================================
// 8. TYPEWRITER — Welcome Message
// ============================================================
function initTypewriter() {
  const el = document.getElementById('welcomeText');
  if (!el) return;
  const text = `Today is your special day and I wanted to create something unique just for you.\n\nYou have brought happiness, smiles, support, and unforgettable memories into my life. Every moment with you feels special.\n\nI hope this birthday fills your heart with joy and gives you countless reasons to smile.\n\nHappy Birthday My Love ❤️`;
  let i = 0;
  el.innerHTML = '';

  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  el.appendChild(cursor);

  function type() {
    if (i < text.length) {
      const ch = text[i];
      if (ch === '\n') {
        cursor.before(document.createElement('br'));
        if (text[i+1] === '\n') {
          cursor.before(document.createElement('br'));
          i++;
        }
      } else {
        cursor.before(document.createTextNode(ch));
      }
      i++;
      setTimeout(type, 28);
    } else {
      // Remove cursor blinking when done
      setTimeout(() => cursor.remove(), 2000);
    }
  }

  // Start when section is visible
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      obs.disconnect();
      setTimeout(type, 400);
    }
  }, { threshold: 0.3 });
  obs.observe(el);
}

// ============================================================
// 9. ENVELOPE / LOVE LETTER
// ============================================================
(function initEnvelope() {
  const btn     = document.getElementById('openLetterBtn');
  const env     = document.getElementById('envelope');
  const paper   = document.getElementById('letterPaper');
  let opened    = false;

  btn.addEventListener('click', () => {
    if (opened) return;
    opened = true;
    env.classList.add('open');
    btn.style.display = 'none';
    setTimeout(() => {
      paper.classList.add('revealed');
    }, 600);
  });
})();

// ============================================================
// 10. GALLERY — Lightbox
// ============================================================
(function initGallery() {
  const items    = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lightboxImg');
  const lbCap    = document.getElementById('lightboxCaption');
  const lbClose  = document.getElementById('lightboxClose');

  const captions = [
    'Our Precious Moment ❤️','Beautiful Memories ❤️','Special Moments ❤️',
    'Unforgettable ❤️','Together ❤️','Cherished ❤️',
    'Always Smiling ❤️','Pure Joy ❤️','My Favorite ❤️',
    'Golden Times ❤️','Blessed ❤️','Forever Us ❤️'
  ];

  items.forEach((item, idx) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lbImg.src = img ? img.src : '';
      lbCap.textContent = captions[idx];
      lightbox.classList.add('active');
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
  }
})();

// ============================================================
// 11. WISHES CAROUSEL
// ============================================================
function initCarousel() {
  const slides     = document.querySelectorAll('.carousel-slide');
  const dotsWrap   = document.getElementById('carouselDots');
  let current      = 0;
  let autoInterval = null;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Wish ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(n) {
    slides[current].classList.remove('active');
    dotsWrap.children[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dotsWrap.children[current].classList.add('active');
  }

  autoInterval = setInterval(() => goTo(current + 1), 3500);

  document.getElementById('carousel').addEventListener('touchstart', handleTouchStart, { passive: true });
  document.getElementById('carousel').addEventListener('touchend',   handleTouchEnd,   { passive: true });

  let touchX = null;
  function handleTouchStart(e) { touchX = e.touches[0].clientX; }
  function handleTouchEnd(e) {
    if (touchX === null) return;
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    touchX = null;
  }
}

// ============================================================
// 12. MUSIC PLAYER
// ============================================================
(function initMusic() {
  const audio      = document.getElementById('audioPlayer');
  const playBtn    = document.getElementById('playPauseBtn');
  const playIcon   = document.getElementById('playIcon');
  const vinyl      = document.getElementById('musicVinyl');
  const progress   = document.getElementById('musicProgressFill');
  const bar        = document.getElementById('musicProgressBar');
  const timeLabel  = document.getElementById('musicTime');

  function fmt(s) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return m + ':' + String(sec).padStart(2, '0');
  }

  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        playIcon.textContent = '⏸';
        vinyl.classList.add('playing');
      }).catch(() => {
        // No audio file — show hint
        playIcon.textContent = '▶';
      });
    } else {
      audio.pause();
      playIcon.textContent = '▶';
      vinyl.classList.remove('playing');
    }
  });

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    progress.style.width = pct + '%';
    timeLabel.textContent = fmt(audio.currentTime) + ' / ' + fmt(audio.duration);
  });

  bar.addEventListener('click', e => {
    if (!audio.duration) return;
    const rect = bar.getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  });

  audio.addEventListener('ended', () => {
    playIcon.textContent = '▶';
    vinyl.classList.remove('playing');
    progress.style.width = '0%';
  });
})();

// ============================================================
// 13. INTERACTIVE HEARTS CANVAS
// ============================================================
(function initInteractiveHearts() {
  const canvas   = document.getElementById('heartsCanvas');
  const bigHeart = document.getElementById('bigHeart');
  const symbols  = ['❤️','💕','💖','💗','💝','🌸','💓','💞','💫','✨'];

  function spawnHeart(x, y) {
    const h = document.createElement('div');
    h.className  = 'click-heart';
    h.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    h.style.left  = x + 'px';
    h.style.top   = y + 'px';
    h.style.fontSize = (1.2 + Math.random() * 1.5) + 'rem';
    h.style.setProperty('--drift', ((Math.random() - 0.5) * 80) + 'px');
    canvas.appendChild(h);
    setTimeout(() => h.remove(), 2100);
  }

  canvas.addEventListener('click', e => {
    const rect  = canvas.getBoundingClientRect();
    const x     = e.clientX - rect.left;
    const y     = e.clientY - rect.top;
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        spawnHeart(
          x + (Math.random() - 0.5) * 40,
          y + (Math.random() - 0.5) * 40
        );
      }, i * 60);
    }
  });

  // Pulse big heart
  bigHeart.addEventListener('click', (e) => {
    e.stopPropagation();
    const rect = canvas.getBoundingClientRect();
    const cx   = bigHeart.getBoundingClientRect().left - rect.left + 40;
    const cy   = bigHeart.getBoundingClientRect().top  - rect.top  + 40;
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        spawnHeart(
          cx + (Math.random() - 0.5) * 60,
          cy + (Math.random() - 0.5) * 60
        );
      }, i * 50);
    }
  });
})();

// ============================================================
// 14. BIRTHDAY CAKE — Blow Candles
// ============================================================
(function initCake() {
  const btn      = document.getElementById('blowCandlesBtn');
  const smoke    = document.getElementById('smokeWrap');
  const reveal   = document.getElementById('wishReveal');
  const flame1   = document.getElementById('flame1');
  const flame2   = document.getElementById('flame2');
  const flame3   = document.getElementById('flame3');
  let blown      = false;

  btn.addEventListener('click', () => {
    if (blown) return;
    blown = true;

    // Extinguish flames one by one
    setTimeout(() => flame1.classList.add('extinguished'), 100);
    setTimeout(() => flame2.classList.add('extinguished'), 300);
    setTimeout(() => flame3.classList.add('extinguished'), 500);

    // Show smoke
    setTimeout(() => {
      smoke.style.display = 'flex';
      setTimeout(() => smoke.style.display = 'none', 2000);
    }, 600);

    // Update button text
    btn.textContent = '🌟 Wish Made! ❤️';
    btn.disabled    = true;
    btn.style.opacity = '0.7';

    // Show wish message
    setTimeout(() => { reveal.style.display = 'block'; }, 800);
  });
})();

// ============================================================
// 15. FINAL SURPRISE BUTTON
// ============================================================
(function initSurprise() {
  const btn     = document.getElementById('surpriseBtn');
  const overlay = document.getElementById('surpriseOverlay');
  const closeBtn = document.getElementById('closeSurpriseBtn');
  const canvas  = document.getElementById('confettiCanvas');
  const ctx     = canvas.getContext('2d');
  let confettiPieces = [];
  let animRunning    = false;

  btn.addEventListener('click', () => {
    overlay.classList.add('active');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    launchFireworks();
    startConfetti();
  });

  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
    animRunning = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiPieces = [];
  });

  // Fireworks
  function launchFireworks() {
    const fw   = document.getElementById('surpriseFireworks');
    const colors = ['#f9a8d4','#c084fc','#fb7185','#FFD700','#fff','#ffd6e7'];

    function burst() {
      if (!overlay.classList.contains('active')) return;
      const x = 15 + Math.random() * 70;
      const y = 10 + Math.random() * 50;
      for (let i = 0; i < 8; i++) {
        const f = document.createElement('div');
        f.className = 'firework';
        const size  = 30 + Math.random() * 60;
        f.style.left  = x + '%';
        f.style.top   = y + '%';
        f.style.width = size + 'px';
        f.style.height = size + 'px';
        f.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random()*colors.length)]}, transparent)`;
        f.style.setProperty('--size', (1 + Math.random() * 2));
        f.style.animationDuration = (1 + Math.random() * 0.5) + 's';
        fw.appendChild(f);
        setTimeout(() => f.remove(), 1800);
      }
      setTimeout(burst, 600 + Math.random() * 400);
    }
    burst();
  }

  // Confetti
  class ConfettiPiece {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x     = Math.random() * canvas.width;
      this.y     = init ? Math.random() * canvas.height - canvas.height : -20;
      this.w     = 6 + Math.random() * 10;
      this.h     = 3 + Math.random() * 6;
      this.color = ['#f9a8d4','#c084fc','#fb7185','#FFD700','#ffd6e7','#e8b4f8'][Math.floor(Math.random()*6)];
      this.speed = 1.5 + Math.random() * 3;
      this.angle = Math.random() * Math.PI * 2;
      this.spin  = (Math.random() - 0.5) * 0.15;
      this.drift = (Math.random() - 0.5) * 1.5;
    }
    draw() {
      this.y     += this.speed;
      this.x     += this.drift;
      this.angle += this.spin;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillStyle   = this.color;
      ctx.globalAlpha = 0.85;
      ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h);
      ctx.restore();
      if (this.y > canvas.height + 30) this.reset();
    }
  }

  function startConfetti() {
    if (animRunning) return;
    animRunning = true;
    for (let i = 0; i < 120; i++) confettiPieces.push(new ConfettiPiece());

    function loop() {
      if (!animRunning) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiPieces.forEach(p => p.draw());
      requestAnimationFrame(loop);
    }
    loop();
  }

  window.addEventListener('resize', () => {
    if (overlay.classList.contains('active')) {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });
})();

// ============================================================
// 16. SCROLL REVEAL OBSERVER
// ============================================================
function initObserver() {
  const els = document.querySelectorAll('.scroll-reveal, .reveal-card, .tl-item');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        // Stagger children of reason grid
        if (e.target.classList.contains('scroll-reveal')) {
          const siblings = e.target.parentElement?.querySelectorAll('.scroll-reveal');
          let delay = 0;
          siblings?.forEach((sib, i) => {
            if (sib === e.target) delay = i * 120;
          });
          setTimeout(() => e.target.classList.add('revealed'), delay);
        } else {
          e.target.classList.add('revealed');
        }
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => obs.observe(el));
}

// ============================================================
// 17. SMOOTH SCROLL for all anchor links
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ============================================================
// 18. EASTER EGG — Triple click footer
// ============================================================
(function easterEgg() {
  const footer = document.querySelector('.footer');
  let clicks = 0;
  let timer  = null;
  footer.addEventListener('click', () => {
    clicks++;
    clearTimeout(timer);
    timer = setTimeout(() => clicks = 0, 800);
    if (clicks >= 3) {
      clicks = 0;
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          const h = document.createElement('div');
          h.textContent = '❤️';
          h.style.cssText = `
            position: fixed;
            left: ${Math.random()*100}vw;
            bottom: 0;
            font-size: ${1 + Math.random() * 2}rem;
            z-index: 9000;
            pointer-events: none;
            animation: floatUp ${4 + Math.random()*3}s ease-in forwards;
          `;
          document.body.appendChild(h);
          setTimeout(() => h.remove(), 8000);
        }, i * 80);
      }
    }
  });
})();

// ============================================================
// 19. CURSOR SPARKLE TRAIL
// ============================================================
(function cursorTrail() {
  const symbols = ['✨','💫','⭐','🌟','💕'];
  let last = 0;

  document.addEventListener('mousemove', e => {
    const now = Date.now();
    if (now - last < 80) return;
    last = now;

    const s = document.createElement('div');
    s.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    s.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      pointer-events: none;
      font-size: ${0.8 + Math.random() * 0.6}rem;
      z-index: 9500;
      opacity: 1;
      transition: all 0.8s ease;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(s);

    requestAnimationFrame(() => {
      s.style.opacity   = '0';
      s.style.transform = `translate(${(Math.random()-0.5)*40 - 50}%, ${-60 - Math.random()*40}%)`;
    });

    setTimeout(() => s.remove(), 900);
  });
})();

// ============================================================
// DONE — Made with ❤️ by Guru Shankar for Sivaranjani
// ============================================================
