/**
 * Layout Manager - Escuela Técnica N°4 "República del Líbano"
 * Inyecta dinámicamente Topbar, Header, Footer y Modal en todas las páginas
 * para evitar duplicación de código (principio DRY).
 */

document.addEventListener('DOMContentLoaded', async () => {
  const path = window.location.pathname;
  const pageName = path.split('/').pop() || 'index.html';
  const loggedIn = await window.db.isLoggedIn();

  injectTopbar(loggedIn);
  injectHeader(loggedIn, pageName);
  injectFooter();
  injectModal();
});


/* ── TOPBAR ── */
function injectTopbar(loggedIn) {
  const el = document.getElementById('topbar-placeholder');
  if (!el) return;

  el.outerHTML = `
    <div class="topbar">
      <div class="topbar-left">
        <a href="tel:1143076051">📞 11 4307-6051</a>
        <a href="mailto:det_4_de5@bue.edu.ar">✉ det_4_de5@bue.edu.ar</a>
      </div>
      <div class="topbar-right">
        ${loggedIn
          ? `
            <span class="admin-topbar-tag">🛠️ Modo Admin</span>
            <a href="logs.html" class="topbar-link-admin">Historial</a>
            <a href="#" id="btnLogoutAction" class="topbar-link-logout">Cerrar Sesión</a>
          `
          : ``
        }
      </div>
    </div>
  `;
}

  // Evento de cierre de sesión
  const btnLogout = document.getElementById('btnLogoutAction');
  if (btnLogout) {
    btnLogout.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await window.db.logout();
        showToast('✅ Sesión cerrada correctamente. Redireccionando...');
        setTimeout(() => { window.location.href = 'index.html'; }, 1500);
      } catch (err) {
        showToast('❌ Error al cerrar sesión.');
      }
    });
  }



/* ── HEADER Y NAVEGACIÓN ── */
function injectHeader(loggedIn, pageName) {
  const el = document.getElementById('header-placeholder');
  if (!el) return;

  const isInicio = pageName === 'index.html' || pageName === '';
  const isNovedades = pageName === 'novedades.html';
  const isInst = pageName === 'institucional.html';

  el.outerHTML = `
    <header>
      <a href="index.html" class="logo">
       <div class="logo">
  <img src="img/logo.png" alt="Logo Escuela" style="height: 50px; width: auto; margin-right: 10px;">
  <div class="logo-text">
    <strong>Escuela Técnica N°4 D.E. 5 "República del Líbano"</strong>
    <span>Gestión y Administración de las Organizaciones</span>
  </div>
</div>
      </a>
      <nav>
        <a href="index.html" class="${isInicio ? 'active' : ''}">Inicio</a>
        <a href="novedades.html" class="${isNovedades ? 'active' : ''}">Novedades</a>
        <a href="institucional.html" class="${isInst ? 'active' : ''}">Institucional</a>
        ${loggedIn
          ? `<a href="novedades.html#publicar" class="nav-cta">+ Publicar</a>`
          : `<a href="login.html" class="${pageName === 'login.html' ? 'active nav-cta' : 'nav-cta'}">Ingresar</a>`
        }
      </nav>
      <button class="hamburger" id="hamburger" aria-label="Abrir menú de navegación">
        <span></span><span></span><span></span>
      </button>
    </header>

    <div class="mobile-nav" id="mobileNav">
      <a href="index.html" class="${isInicio ? 'active' : ''}">Inicio</a>
      <a href="novedades.html" class="${isNovedades ? 'active' : ''}">Novedades</a>
      <a href="institucional.html" class="${isInst ? 'active' : ''}">Institucional</a>
      ${loggedIn
        ? `<a href="novedades.html#publicar">+ Publicar novedad</a>`
        : `<a href="login.html" class="${pageName === 'login.html' ? 'active' : ''}">Ingresar</a>`
      }
    </div>
  `;

  // Re-inicializar menú hamburguesa después de inyectar el DOM
  if (typeof initHamburger === 'function') {
    initHamburger();
  }
}


/* ── FOOTER ── */
function injectFooter() {
  const el = document.getElementById('footer-placeholder');
  if (!el) return;

  el.outerHTML = `
    <footer>
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo">
          <img src="img/logo.png" alt="Logo Escuela" style="height: 50px; width: auto; margin-right: 10px;">
            <div class="logo-text">
              <strong>Escuela Técnica N°4 D.E. 5 "República del Líbano"</strong>
              <span>Gestión y Administración de las Organizaciones</span>
            </div>
          </div>
          <p class="footer-desc">Formando Técnicos en Gestión y Administración de las Organizaciones profesionales desde 1965.</p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Escuela Técnica N°4 D.E. 5 "República del Líbano" — Todos los derechos reservados</span>
      </div>
    </footer>
  `;
}


/* ── MODAL DE DETALLE ── */
function injectModal() {
  const el = document.getElementById('modal-placeholder');
  if (!el) return;

  el.outerHTML = `
    <div class="modal-overlay" id="modalOverlay">
      <div class="modal">
        <button class="modal-close" onclick="closeModal()" aria-label="Cerrar modal">✕</button>
        <div class="modal-tag" id="modalCat"></div>
        <h2 id="modalTitle"></h2>
        <div class="modal-meta" id="modalMeta"></div>
        <div class="modal-img" id="modalImg"></div>
        <p class="modal-body" id="modalBody" style="white-space: pre-wrap;"></p>
      </div>
    </div>
  `;

  // Re-inicializar listeners del modal
  if (typeof initModal === 'function') {
    initModal();
  }
}
