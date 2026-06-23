/**
 * Main Interactions - Escuela Técnica N°4 "República del Líbano"
 * Script central para animaciones, interactividad del menú responsive, acordeones y modales.
 */

/* ── MENÚ MÓVIL HAMBURGER ── */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('mobileNav');
  if (!btn || !nav) return;

  // Prevenir duplicación de listeners con un flag
  if (btn.dataset.initialized) return;
  btn.dataset.initialized = 'true';

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    nav.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });

  // Cerrar menú al hacer clic en un enlace
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      nav.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });
}

/* ── REVELAR ELEMENTOS AL HACER SCROLL ── */
function initReveal() {
  const elements = document.querySelectorAll('.reveal:not(.visible)');
  if (!elements.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ── BOTÓN VOLVER ARRIBA ── */
function initScrollTop() {
  // Inyectar el botón si no existe
  if (!document.getElementById('scrollTop')) {
    const btn = document.createElement('button');
    btn.id = 'scrollTop';
    btn.setAttribute('aria-label', 'Volver arriba');
    btn.textContent = '↑';
    document.body.appendChild(btn);
  }

  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── NOTIFICACIONES TOAST ── */
function showToast(msg = '✅ Operación realizada con éxito') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.add('show');

  // Estilo dinámico según tipo de mensaje
  toast.classList.toggle('toast-error', msg.includes('❌'));

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show', 'toast-error');
  }, 3500);
}

/* ── MODAL DE DETALLE DE NOVEDAD ── */
function openModal(newsItem) {
  const overlay = document.getElementById('modalOverlay');
  if (!overlay) return;

  document.getElementById('modalCat').textContent = newsItem.category;
  document.getElementById('modalTitle').textContent = newsItem.title;
  document.getElementById('modalMeta').textContent =
    `${newsItem.date}${newsItem.author ? ' · ' + newsItem.author : ''}`;

  const imgEl = document.getElementById('modalImg');
  if (newsItem.image) {
    imgEl.innerHTML = `<img src="${newsItem.image}" alt="${newsItem.title}" 
      style="width:100%;height:200px;object-fit:cover;border-radius:12px" 
      onerror="this.parentElement.innerHTML='<span style=font-size:3.5rem>${newsItem.emoji || '📰'}</span>'">`;
  } else {
    imgEl.innerHTML = `<span style="font-size:3.5rem">${newsItem.emoji || '📰'}</span>`;
  }

  document.getElementById('modalBody').textContent = newsItem.content || newsItem.excerpt;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function initModal() {
  const overlay = document.getElementById('modalOverlay');
  if (!overlay) return;

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ── ACORDEONES (FAQ, Requisitos, etc.) ── */
function initAccordions() {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    // Prevenir duplicación de listeners
    if (trigger.dataset.initialized) return;
    trigger.dataset.initialized = 'true';

    trigger.addEventListener('click', () => {
      const body = trigger.nextElementSibling;
      const isOpen = trigger.classList.contains('open');

      // Cerrar otros acordeones hermanos dentro del mismo grupo
      const parent = trigger.closest('.accordion');
      if (parent) {
        parent.querySelectorAll('.accordion-trigger').forEach(t => {
          t.classList.remove('open');
          if (t.nextElementSibling) t.nextElementSibling.classList.remove('open');
        });
      }

      if (!isOpen) {
        trigger.classList.add('open');
        if (body) body.classList.add('open');
      }
    });
  });
}

/* ── INICIALIZACIÓN GLOBAL ── */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initScrollTop();
  initModal();
  initAccordions();
});