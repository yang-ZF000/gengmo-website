// ===== Tabs (product lines) =====
(function () {
  const tabs = document.querySelectorAll('#prodTabs .tab');
  const panels = document.querySelectorAll('.panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const el = document.getElementById(target);
      if (el) el.classList.add('active');
    });
  });
})();

// ===== 昂瑞微 accordion =====
(function () {
  const items = document.querySelectorAll('#line-onmicro .acc-item');
  items.forEach(it => {
    const head = it.querySelector('.acc-head');
    head.addEventListener('click', () => {
      const isOpen = it.classList.contains('open');
      items.forEach(o => {
        o.classList.remove('open');
        o.querySelector('.acc-head').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        it.classList.add('open');
        head.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

// ===== Mobile nav =====
(function () {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        nav.classList.remove('open');
      })
    );
  }
})();

// ===== Scroll reveal =====
(function () {
  const els = document.querySelectorAll('.section-head, .about-card, .spec, .sensor-card, .subcat, .app-card, .bt-card, .highlight, .panel-media');
  els.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach(el => io.observe(el));
})();

// ===== To top button =====
(function () {
  const btn = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) btn.classList.add('show');
    else btn.classList.remove('show');
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ===== Hero stat count-up =====
(function () {
  const nums = document.querySelectorAll('.stat .num');
  const animate = el => {
    const txt = el.textContent;
    if (/^\d+$/.test(txt)) {
      const end = parseInt(txt, 10);
      let cur = 0;
      const step = Math.max(1, Math.floor(end / 40));
      const tick = () => {
        cur += step;
        if (cur >= end) el.textContent = end;
        else { el.textContent = cur; requestAnimationFrame(tick); }
      };
      tick();
    }
  };
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.5 });
  nums.forEach(n => io.observe(n));
})();

// ===== Contact form (front-end only) =====
(function () {
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      if (!name || !email) {
        note.hidden = false;
        note.textContent = '请填写称呼与邮箱，方便我们与您联系。';
        note.style.color = '#ffb4a0';
        return;
      }
      note.hidden = false;
      note.textContent = '感谢您的留言，我们会尽快与您联系！';
      note.style.color = '';
      form.reset();
    });
  }
})();
