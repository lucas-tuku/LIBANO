const DEFAULT_NEWS = [
  {
    id: 1,
    title: "Inscripción 2025 — Resultados disponibles",
    category: "Inscripciones",
    author: "Secretaría Académica",
    date: "5 dic 2024",
    dateISO: "2024-12-05",
    excerpt: "Ya están publicados los listados de ingresantes 2025. Consultá el resultado en el portal o acercate en el horario de atención.",
    content: "Los listados de ingresantes 2025 ya se encuentran publicados en el portal institucional. Horario de atención: 9:30 a 12:00 y 14:00 a 16:00 hs. Ante cualquier consulta comunicarse con Secretaría. Se recuerda que los alumnos deberán presentar la documentación completa dentro de los 10 días hábiles posteriores a la publicación.",
    emoji: "📋",
    image: ""
  },
  {
    id: 2,
    title: "EXPO Escuela 2025 — ¡Vení a conocernos!",
    category: "Eventos",
    author: "Extensión Escolar",
    date: "12 ago 2024",
    dateISO: "2024-08-12",
    excerpt: "Vivé la experiencia de nuestra escuela en acción. Actividades, muestras de proyectos y recorridos el sábado 6 de septiembre.",
    content: "Te invitamos a vivir la experiencia de nuestra escuela en acción. El próximo sábado 6 de septiembre, de 9 a 17 hs, vas a poder recorrer aulas, laboratorios y conocer nuestra especialidad en Administración de Empresas. Habrá muestras de proyectos de alumnos, charlas con docentes y autoridades, y actividades para toda la familia. ¡Entrada libre y gratuita!",
    emoji: "🎪",
    image: ""
  },
  {
    id: 3,
    title: "Programa de Acompañamiento Estudiantil 2025",
    category: "Académico",
    author: "Departamento Pedagógico",
    date: "25 may 2024",
    dateISO: "2024-05-25",
    excerpt: "Abrimos las inscripciones para el programa de acompañamiento y tutorías para todos los años.",
    content: "El Departamento Pedagógico informa que se encuentran abiertas las inscripciones para el Programa de Acompañamiento Estudiantil 2025. Incluye tutorías individuales, talleres de estudio y orientación vocacional. El programa está dirigido a todos los alumnos de la institución que deseen reforzar sus conocimientos o recibir orientación para su trayectoria académica.",
    emoji: "🤝",
    image: ""
  },
  {
    id: 4,
    title: "Alumnos de 5° año depararon proyectos empresariales",
    category: "Logros",
    author: "Coordinación Técnica",
    date: "10 nov 2024",
    dateISO: "2024-11-10",
    excerpt: "Los alumnos del último año de Administración de Empresas expusieron sus planes de negocio ante un jurado externo.",
    content: "En el marco de la materia Gestión Empresarial, los alumnos de 5° año de la especialidad en Administración de Empresas presentaron sus proyectos finales ante un jurado compuesto por profesionales del sector privado y docentes de la institución. Los trabajos destacados serán postulados al concurso provincial de emprendimientos estudiantiles 2025.",
    emoji: "🏆",
    image: ""
  },
  {
    id: 5,
    title: "Calendario de exámenes — Mesa de diciembre",
    category: "Calendario",
    author: "Secretaría Académica",
    date: "18 nov 2024",
    dateISO: "2024-11-18",
    excerpt: "Se publicaron las fechas y horarios de los exámenes de diciembre para materias previas y completar estudios.",
    content: "La Secretaría Académica informa que ya se encuentran disponibles las fechas de la mesa de exámenes de diciembre 2024. Los alumnos con materias previas deberán inscribirse hasta el 25 de noviembre a través del portal Mi Escuela. Los exámenes se desarrollarán del 2 al 13 de diciembre en los horarios publicados en cartelera.",
    emoji: "📅",
    image: ""
  },
  {
    id: 6,
    title: "Charla sobre emprendimiento y finanzas personales",
    category: "Eventos",
    author: "Cooperadora Escolar",
    date: "3 oct 2024",
    dateISO: "2024-10-03",
    excerpt: "La Cooperadora organiza una charla abierta sobre finanzas personales y emprendimiento para alumnos de 3° a 5° año.",
    content: "La Cooperadora Escolar, en colaboración con el área de Administración, organiza una charla abierta y gratuita sobre finanzas personales y emprendimiento. La actividad está destinada a alumnos de 3° a 5° año. El evento se realizará en el Salón de Usos Múltiples el próximo jueves 17 de octubre a las 14 hs. Cupos limitados.",
    emoji: "💡",
    image: ""
  }
];

function getNewsList() {
  try {
    const stored = localStorage.getItem('escuela_news');
    return stored ? JSON.parse(stored) : DEFAULT_NEWS;
  } catch { return DEFAULT_NEWS; }
}

function saveNewsList(list) {
  try { localStorage.setItem('escuela_news', JSON.stringify(list)); } catch {}
}

function initHamburger() {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('mobileNav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => nav.classList.toggle('open'));
}

function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function showToast(msg = '✅ Novedad publicada con éxito') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3400);
}

function openModal(newsItem) {
  const overlay = document.getElementById('modalOverlay');
  if (!overlay) return;
  document.getElementById('modalCat').textContent     = newsItem.category;
  document.getElementById('modalTitle').textContent   = newsItem.title;
  document.getElementById('modalMeta').textContent    = `${newsItem.date}${newsItem.author ? ' · ' + newsItem.author : ''}`;
  const imgEl = document.getElementById('modalImg');
  if (newsItem.image) {
    imgEl.innerHTML = `<img src="${newsItem.image}" alt="${newsItem.title}" style="width:100%;height:200px;object-fit:cover;border-radius:12px" onerror="this.parentElement.innerHTML='<span style=font-size:3.5rem>${newsItem.emoji || '📰'}</span>'">`;
  } else {
    imgEl.innerHTML = `<span style="font-size:3.5rem">${newsItem.emoji || '📰'}</span>`;
  }
  document.getElementById('modalBody').textContent = newsItem.content || newsItem.excerpt;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) { overlay.classList.remove('open'); document.body.style.overflow = ''; }
}

function initModal() {
  const overlay = document.getElementById('modalOverlay');
  if (!overlay) return;
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function initAccordions() {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const body  = trigger.nextElementSibling;
      const isOpen = trigger.classList.contains('open');
      trigger.closest('.accordion')?.querySelectorAll('.accordion-trigger').forEach(t => {
        t.classList.remove('open');
        t.nextElementSibling?.classList.remove('open');
      });
      if (!isOpen) {
        trigger.classList.add('open');
        body.classList.add('open');
      }
    });
  });
}

function publishNews() {
  const title    = document.getElementById('newsTitle')?.value.trim();
  const category = document.getElementById('newsCategory')?.value;
  const excerpt  = document.getElementById('newsExcerpt')?.value.trim();
  if (!title || !category || !excerpt) {
    alert('Por favor completá los campos obligatorios: Título, Categoría y Descripción corta.');
    return;
  }
  const now = new Date();
  const dateStr = now.toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' });
  const list = getNewsList();
  list.unshift({
    id: Date.now(),
    title,
    category,
    author: document.getElementById('newsAuthor')?.value.trim() || 'Secretaría',
    date: dateStr,
    dateISO: now.toISOString().split('T')[0],
    excerpt,
    content: document.getElementById('newsContent')?.value.trim() || excerpt,
    emoji: document.getElementById('newsEmoji')?.value.trim() || '📢',
    image: document.getElementById('newsImage')?.value.trim() || ''
  });
  saveNewsList(list);
  clearForm();
  showToast();
  if (typeof renderNews === 'function') renderNews();
}

function clearForm() {
  ['newsTitle','newsCategory','newsAuthor','newsEmoji','newsExcerpt','newsContent','newsImage'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.tagName === 'SELECT') el.selectedIndex = 0;
    else el.value = '';
  });
}

// ── COMPORTAMIENTO INTERACTIVO DEL LOGIN ──
function initLogin() {
  const loginForm = document.getElementById('loginForm');
  const btnLogin = document.getElementById('btnLogin');
  const forgotPasswordLink = document.getElementById('forgotPassword');

  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('ℹ️ Contactar a soporte o secretaría para restablecer la contraseña.');
    });
  }

  if (loginForm && btnLogin) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const user = document.getElementById('username').value.trim();
      const pass = document.getElementById('password').value;

      btnLogin.innerHTML = 'Verificando credenciales...';
      btnLogin.style.opacity = '0.7';
      btnLogin.style.pointerEvents = 'none';

      setTimeout(() => {
        if (user && pass) {
          // 🌟 NUEVO: Guardamos el estado de la sesión en el navegador
          localStorage.setItem('sesion_activa', 'true');
          
          showToast('✅ ¡Ingreso exitoso! Redireccionando...');
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 1500);
        } else {
          showToast('❌ Por favor, ingresa tus datos.');
          btnLogin.innerHTML = 'Ingresar al sistema →';
          btnLogin.style.opacity = '1';
          btnLogin.style.pointerEvents = 'all';
        }
      }, 1200);
    });
  }
}


function verificarSesion() {
  const sesionActiva = localStorage.getItem('sesion_activa');
  
  if (sesionActiva === 'true') {
    // Buscamos el botón "Ingresar" en el menú normal y en el menú móvil
    const btnIngresarNav = document.querySelector('nav .nav-cta');
    const btnIngresarMobile = document.querySelector('.mobile-nav a[href="login.html"]');
    
    // Si existen en la página actual, los removemos por completo de la vista
    if (btnIngresarNav) {
      btnIngresarNav.remove();
    }
    if (btnIngresarMobile) {
      btnIngresarMobile.remove();
    }
  }
}

// ── INICIALIZACIÓN ÚNICA DEL DOM ──
document.addEventListener('DOMContentLoaded', () => {
  initHamburger();
  initReveal();
  initScrollTop();
  initModal();
  initAccordions();
  initLogin();
  verificarSesion(); // 🌟 Se ejecuta en todas las páginas al cargar
});