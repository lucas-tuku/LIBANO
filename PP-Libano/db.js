/**
 * DB Manager - Escuela Técnica N°4 "República del Líbano"
 * Módulo de persistencia dual: Supabase (Nube) y LocalStorage (Respaldo Local).
 */

// Semillas de datos por defecto (Mock Database)
const SEED_NEWS = [
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

const SEED_AUTHORITIES = [
  { id: 1, name: "Lic. Marta Gómez", cargo: "Rectora", avatar: "👩‍💼" },
  { id: 2, name: "Ing. Carlos Rossi", cargo: "Vicerrector", avatar: "👨‍💼" },
  { id: 3, name: "Prof. Ana López", cargo: "Secretaría", avatar: "👩‍🏫" },
  { id: 4, name: "Lic. Esteban Peralta", cargo: "Coord. Tutoría", avatar: "👨‍🏫" },
  { id: 5, name: "Dra. Lucía Ferraro", cargo: "Coord. Áreas", avatar: "👩‍🔬" },
  { id: 6, name: "Soporte Técnico", cargo: "Administrador T.I.", avatar: "👨‍💻" }
];

const SEED_CALENDAR = [
  { id: 1, month_group: "Febrero / Marzo", day: "17/2", title: "Inicio de clases 1° año", desc: "Jornada de bienvenida e inducción", important: true },
  { id: 2, month_group: "Febrero / Marzo", day: "3/3", title: "Inicio de clases 2° a 6° año", desc: "Retorno al ciclo lectivo", important: true },
  { id: 3, month_group: "Abril", day: "14/4", title: "Feriado — Semana Santa", desc: "Sin actividad escolar", important: false },
  { id: 4, month_group: "Abril", day: "17/4", title: "Feriado — Semana Santa", desc: "Sin actividad escolar", important: false },
  { id: 5, month_group: "Abril", day: "18/4", title: "Reunión de padres 1° año", desc: "18:00 hs — Aula Magna", important: false },
  { id: 6, month_group: "Mayo / Junio", day: "26/5", title: "Acto 25 de Mayo", desc: "9:00 hs — Patio central", important: true },
  { id: 7, month_group: "Mayo / Junio", day: "2/6", title: "Inicio período de exámenes", desc: "1° bimestre — todos los años", important: false },
  { id: 8, month_group: "Mayo / Junio", day: "20/6", title: "Feriado — Día de la Bandera", desc: "Sin actividad escolar", important: false },
  { id: 9, month_group: "Julio", day: "7/7", title: "Inicio receso invernal", desc: "Hasta el 18 de julio inclusive", important: true },
  { id: 10, month_group: "Julio", day: "21/7", title: "Regreso a clases", desc: "Todos los turnos", important: false },
  { id: 11, month_group: "Julio", day: "28/7", title: "Mesa de exámenes complementaria", desc: "Materias previas — inscripción previa", important: false },
  { id: 12, month_group: "Agosto / Septiembre", day: "4/8", title: "EXPO Escuela 2025", desc: "9:00 a 17:00 hs — Entrada libre", important: true },
  { id: 13, month_group: "Agosto / Septiembre", day: "1/9", title: "Inicio período de exámenes", desc: "2° bimestre — todos los años", important: false },
  { id: 14, month_group: "Agosto / Septiembre", day: "15/9", title: "Reunión de padres 6° año", desc: "18:00 hs — Orientación egreso", important: false },
  { id: 15, month_group: "Octubre", day: "14/10", title: "Expo Técnica", desc: "Muestra anual de proyectos técnicos", important: false },
  { id: 16, month_group: "Octubre", day: "17/10", title: "Feriado", desc: "Día del Respeto a la Diversidad Cultural", important: false },
  { id: 17, month_group: "Noviembre / Diciembre", day: "10/11", title: "Presentación proyectos 6° año", desc: "Proyecto de Empresa — Aula Magna", important: false },
  { id: 18, month_group: "Noviembre / Diciembre", day: "28/11", title: "Último día de clases", desc: "Cierre del ciclo lectivo general", important: true },
  { id: 19, month_group: "Noviembre / Diciembre", day: "2/12", title: "Mesa exámenes diciembre", desc: "Del 2 al 13 de diciembre", important: true },
  { id: 20, month_group: "Noviembre / Diciembre", day: "19/12", title: "Acto de egresados 6° año", desc: "19:00 hs — SUM", important: false }
];

class DatabaseManager {
  constructor() {
    this.config = window.ENV_CONFIG || { SUPABASE_URL: "", SUPABASE_KEY: "" };
    this.supabase = null;
    this.mode = 'local'; // 'supabase' o 'local'
    
    // Sembrar local de inmediato para tener datos instantáneos
    this.seedLocal();

    // Guardar la promesa de inicialización
    this.initPromise = this.init();
  }

  async init() {
    // 1. Intentar obtener credenciales de la API de Vercel (si está disponible)
    try {
      const res = await fetch('/api/config');
      if (res.ok) {
        const apiConfig = await res.json();
        if (apiConfig.SUPABASE_URL && apiConfig.SUPABASE_KEY) {
          this.config.SUPABASE_URL = apiConfig.SUPABASE_URL;
          this.config.SUPABASE_KEY = apiConfig.SUPABASE_KEY;
          console.log("⚡ Configuración de Supabase cargada desde Vercel Integration.");
        }
      }
    } catch (e) {
      // Ignorar error al correr localmente o si no existe la API
    }

    // 2. Inicializar cliente de Supabase si tenemos credenciales
    if (this.config.SUPABASE_URL && this.config.SUPABASE_KEY && window.supabase) {
      try {
        this.supabase = window.supabase.createClient(this.config.SUPABASE_URL, this.config.SUPABASE_KEY);
        this.mode = 'supabase';
        console.log("🔌 Conectado a la base de datos en la nube (Supabase).");
      } catch (err) {
        console.error("❌ Error inicializando Supabase. Usando LocalStorage Fallback.", err);
        this.mode = 'local';
      }
    } else {
      console.log("📦 Modo de Respaldo local activo (LocalStorage).");
      this.mode = 'local';
    }
  }

  seedLocal() {
    if (!localStorage.getItem('escuela_news')) {
      localStorage.setItem('escuela_news', JSON.stringify(SEED_NEWS));
    }
    if (!localStorage.getItem('escuela_authorities')) {
      localStorage.setItem('escuela_authorities', JSON.stringify(SEED_AUTHORITIES));
    }
    if (!localStorage.getItem('escuela_calendar')) {
      localStorage.setItem('escuela_calendar', JSON.stringify(SEED_CALENDAR));
    }
    if (!localStorage.getItem('escuela_audit_logs')) {
      localStorage.setItem('escuela_audit_logs', JSON.stringify([]));
    }
  }

  // ==========================================
  // AUTENTICACIÓN (LOGIN/LOGOUT)
  // ==========================================
  async login(username, password) {
    await this.initPromise;

    // Intentar primero Supabase
    if (this.mode === 'supabase') {
      try {
        const { data, error } = await this.supabase.auth.signInWithPassword({
          email: username,
          password: password
        });

        if (error) throw error;

        // Guardar también un indicador local
        localStorage.setItem("sesion_activa", "true");
        localStorage.setItem("user_name", data.user.email);

        await this.addLog(
        "INICIO_SESION",
        `Inicio de sesión: ${data.user.email}`
        );

        return data.user;

      } catch (err) {
      console.warn("Login Supabase falló. Intentando modo local...");
      }
    }

    // Fallback local
    if (username.toLowerCase() === "admin" && password === "admin123") {

      localStorage.setItem("sesion_activa", "true");
      localStorage.setItem("user_name", "admin");

      await this.addLog(
        "INICIO_SESION",
        "Inicio de sesión administrador (modo local)."
      );

      return {
        email: "admin@escuela.edu.ar",
        role: "admin"
      };
    }
      throw new Error("Credenciales inválidas.");
  }

  async logout() {
    await this.initPromise;
    if (this.mode === 'supabase') {
      try {
        const user = await this.getUserEmail();
        await this.addLog('CERRAR_SESION', `Cierre de sesión: ${user}`);
        await this.supabase.auth.signOut();
      } catch (err) {
        console.error("Error en logout Supabase", err);
      }
    }
    // Siempre limpiar estado local
    await this.addLog('CERRAR_SESION', 'Cierre de sesión de usuario.');
    localStorage.removeItem('sesion_activa');
    localStorage.removeItem('user_name');
  }

  async isLoggedIn() {
    await this.initPromise;

    // Si existe sesión local, devolver true
    if (localStorage.getItem("sesion_activa") === "true") {
      return true;
    }

    if (this.mode === "supabase") {
      try {
        const { data: { session } } =
        await this.supabase.auth.getSession();

        return session !== null;
      } catch {
      return false;
      }
    }

    return false;
  }

  async getUserEmail() {
    await this.initPromise;
    if (this.mode === 'supabase') {
      try {
        const { data: { session } } = await this.supabase.auth.getSession();
        return session ? session.user.email : null;
      } catch (err) {
        return localStorage.getItem('sesion_activa') === 'true' ? 'admin@escuela.edu.ar' : null;
      }
    } else {
      return this.isLoggedIn() ? 'admin@escuela.edu.ar' : null;
    }
  }

  // ==========================================
  // LOGS (AUDITORÍA)
  // ==========================================
  async addLog(action, description) {
    await this.initPromise;
    const user = await this.getUserEmail() || 'Invitado';
    const dateStr = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
    const logItem = {
      id: Date.now() + '-' + Math.floor(Math.random() * 1000),
      date: dateStr,
      user: user,
      action: action,
      description: description
    };

    let savedOnSupabase = false;
    if (this.mode === 'supabase') {
      try {
        const { error } = await this.supabase.from('audit_logs').insert([logItem]);
        if (error) throw error;
        savedOnSupabase = true;
      } catch (err) {
        console.error("Error guardando log en Supabase", err);
      }
    }

    // Siempre guardamos copia en localstorage por seguridad y rendimiento
    const logs = JSON.parse(localStorage.getItem('escuela_audit_logs') || '[]');
    logs.unshift(logItem);
    if (logs.length > 200) logs.pop();
    localStorage.setItem('escuela_audit_logs', JSON.stringify(logs));
  }

  async getLogs() {
    await this.initPromise;
    if (this.mode === 'supabase') {
      try {
        const { data, error } = await this.supabase
          .from('audit_logs')
          .select('*')
          .order('id', { ascending: false });
        if (error) throw error;
        return data;
      } catch (err) {
        console.warn("⚠️ Error consultando 'audit_logs' en Supabase. Usando LocalStorage Fallback.", err);
      }
    }
    return JSON.parse(localStorage.getItem('escuela_audit_logs') || '[]');
  }

  async clearLogs() {
    await this.initPromise;
    await this.addLog('VACIAR_LOGS', 'Se vació el registro de auditoría escolar.');
    
    if (this.mode === 'supabase') {
      try {
        const { error } = await this.supabase.from('audit_logs').delete().neq('id', '0');
        if (error) throw error;
        await this.addLog('VACIAR_LOGS', 'Se vació el registro de auditoría escolar.');
        return;
      } catch (err) {
        console.warn("Error vaciando logs en Supabase, vaciando localmente", err);
      }
    }
    
    const clearLog = {
      id: Date.now() + '-clear',
      date: new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }),
      user: 'admin@escuela.edu.ar',
      action: 'VACIAR_LOGS',
      description: 'Se vació el registro de auditoría escolar.'
    };
    localStorage.setItem('escuela_audit_logs', JSON.stringify([clearLog]));
  }

  // ==========================================
  // NOVEDADES (NEWS)
  // ==========================================
  async getNews() {
    await this.initPromise;
    if (this.mode === 'supabase') {
      try {
        const { data, error } = await this.supabase
          .from('news')
          .select('*')
          .order('id', { ascending: false });
        if (error) throw error;
        return data;
      } catch (err) {
        console.warn("⚠️ Error consultando 'news' en Supabase. Usando LocalStorage Fallback.", err);
      }
    }
    return JSON.parse(localStorage.getItem('escuela_news') || '[]');
  }

  async saveNews(item) {
    await this.initPromise;
    const isNew = !item.id;
    if (isNew) {
      item.id = Date.now();
      const now = new Date();
      item.date = now.toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' });
      item.dateISO = now.toISOString().split('T')[0];
    }

    let savedOnSupabase = false;
    if (this.mode === 'supabase') {
      try {
        const { error } = await this.supabase.from('news').upsert([item]);
        if (error) throw error;
        savedOnSupabase = true;
      } catch (err) {
        console.warn("❌ Error al guardar novedad en Supabase. Se guardará localmente.", err);
      }
    }

    // Guardar en localstorage
    const news = JSON.parse(localStorage.getItem('escuela_news') || '[]');
    if (isNew) {
      news.unshift(item);
    } else {
      const idx = news.findIndex(n => n.id === item.id);
      if (idx !== -1) news[idx] = item;
    }
    localStorage.setItem('escuela_news', JSON.stringify(news));

    const logAction = isNew ? 'CREAR_NOVEDAD' : 'EDITAR_NOVEDAD';
    const logDesc = isNew 
      ? `Se creó la novedad: "${item.title}" en la categoría "${item.category}".`
      : `Se editó la novedad "${item.title}" (ID: ${item.id}).`;
    await this.addLog(logAction, logDesc);

    // Si Supabase falló pero estamos en modo supabase, tirar el error para alertar al front
    if (this.mode === 'supabase' && !savedOnSupabase) {
      throw new Error("Guardado parcialmente: guardado local exitoso, pero falló la sincronización con Supabase.");
    }
  }

  async deleteNews(id) {
    await this.initPromise;
    let deletedTitle = `ID: ${id}`;
    let deletedOnSupabase = false;

    if (this.mode === 'supabase') {
      try {
        const { data } = await this.supabase.from('news').select('title').eq('id', id).single();
        if (data) deletedTitle = data.title;
        const { error } = await this.supabase.from('news').delete().eq('id', id);
        if (error) throw error;
        deletedOnSupabase = true;
      } catch (err) {
        console.warn("❌ Error al eliminar novedad en Supabase.", err);
      }
    }

    // Eliminar localmente
    const news = JSON.parse(localStorage.getItem('escuela_news') || '[]');
    const idx = news.findIndex(n => n.id === id);
    if (idx !== -1) {
      deletedTitle = news[idx].title;
      news.splice(idx, 1);
      localStorage.setItem('escuela_news', JSON.stringify(news));
    }

    await this.addLog('ELIMINAR_NOVEDAD', `Se eliminó la novedad: "${deletedTitle}" (ID: ${id}).`);

    if (this.mode === 'supabase' && !deletedOnSupabase) {
      throw new Error("Eliminado parcialmente: eliminado de la caché local, pero falló la sincronización con Supabase.");
    }
  }

  // ==========================================
  // CALENDARIO (CALENDAR)
  // ==========================================
  async getCalendar() {
    await this.initPromise;
    if (this.mode === 'supabase') {
      try {
        const { data, error } = await this.supabase
          .from('calendar')
          .select('*');
        if (error) throw error;
        return data;
      } catch (err) {
        console.warn("⚠️ Error consultando 'calendar' en Supabase. Usando LocalStorage Fallback.", err);
      }
    }
    return JSON.parse(localStorage.getItem('escuela_calendar') || '[]');
  }

  async saveCalendar(item) {
    await this.initPromise;
    const isNew = !item.id;
    if (isNew) {
      item.id = Date.now();
    }

    let savedOnSupabase = false;
    if (this.mode === 'supabase') {
      try {
        const { error } = await this.supabase.from('calendar').upsert([item]);
        if (error) throw error;
        savedOnSupabase = true;
      } catch (err) {
        console.warn("❌ Error al guardar fecha en Supabase.", err);
      }
    }

    const calendar = JSON.parse(localStorage.getItem('escuela_calendar') || '[]');
    if (isNew) {
      calendar.push(item);
    } else {
      const idx = calendar.findIndex(c => c.id === item.id);
      if (idx !== -1) calendar[idx] = item;
    }
    localStorage.setItem('escuela_calendar', JSON.stringify(calendar));

    const logAction = isNew ? 'CREAR_CALENDARIO' : 'EDITAR_CALENDARIO';
    const logDesc = isNew 
      ? `Se agregó una fecha al calendario (${item.month_group}): "${item.day}" - "${item.title}".`
      : `Se editó la fecha "${item.title}" (ID: ${item.id}). Nuevo: ${item.day} - ${item.title}.`;
    await this.addLog(logAction, logDesc);

    if (this.mode === 'supabase' && !savedOnSupabase) {
      throw new Error("Guardado parcialmente: guardado en la caché local, pero falló la sincronización con Supabase.");
    }
  }

  async deleteCalendar(id) {
    await this.initPromise;
    let deletedTitle = `ID: ${id}`;
    let deletedOnSupabase = false;

    if (this.mode === 'supabase') {
      try {
        const { data } = await this.supabase.from('calendar').select('title, day').eq('id', id).single();
        if (data) deletedTitle = `${data.day} - ${data.title}`;
        const { error } = await this.supabase.from('calendar').delete().eq('id', id);
        if (error) throw error;
        deletedOnSupabase = true;
      } catch (err) {
        console.warn("❌ Error al eliminar evento del calendario en Supabase.", err);
      }
    }

    const calendar = JSON.parse(localStorage.getItem('escuela_calendar') || '[]');
    const idx = calendar.findIndex(c => c.id === id);
    if (idx !== -1) {
      deletedTitle = `${calendar[idx].day} - ${calendar[idx].title}`;
      calendar.splice(idx, 1);
      localStorage.setItem('escuela_calendar', JSON.stringify(calendar));
    }

    await this.addLog('ELIMINAR_CALENDARIO', `Se eliminó del calendario: "${deletedTitle}" (ID: ${id}).`);

    if (this.mode === 'supabase' && !deletedOnSupabase) {
      throw new Error("Eliminado parcialmente: eliminado localmente, pero falló la sincronización con Supabase.");
    }
  }

  // ==========================================
  // AUTORIDADES (AUTHORITIES)
  // ==========================================
  async getAuthorities() {
    await this.initPromise;
    if (this.mode === 'supabase') {
      try {
        const { data, error } = await this.supabase
          .from('authorities')
          .select('*');
        if (error) throw error;
        return data;
      } catch (err) {
        console.warn("⚠️ Error consultando 'authorities' en Supabase. Usando LocalStorage Fallback.", err);
      }
    }
    return JSON.parse(localStorage.getItem('escuela_authorities') || '[]');
  }

  async saveAuthority(item) {
    await this.initPromise;
    const isNew = !item.id;
    if (isNew) {
      item.id = Date.now();
    }

    let savedOnSupabase = false;
    if (this.mode === 'supabase') {
      try {
        const { error } = await this.supabase.from('authorities').upsert([item]);
        if (error) throw error;
        savedOnSupabase = true;
      } catch (err) {
        console.warn("❌ Error al guardar autoridad en Supabase.", err);
      }
    }

    const authorities = JSON.parse(localStorage.getItem('escuela_authorities') || '[]');
    if (isNew) {
      authorities.push(item);
    } else {
      const idx = authorities.findIndex(a => a.id === item.id);
      if (idx !== -1) authorities[idx] = item;
    }
    localStorage.setItem('escuela_authorities', JSON.stringify(authorities));

    const logAction = isNew ? 'CREAR_AUTORIDAD' : 'EDITAR_AUTORIDAD';
    const logDesc = isNew 
      ? `Se agregó un directivo a la nómina: "${item.name}" como "${item.cargo}".`
      : `Se editó el directivo "${item.name}" (ID: ${item.id}) como "${item.cargo}".`;
    await this.addLog(logAction, logDesc);

    if (this.mode === 'supabase' && !savedOnSupabase) {
      throw new Error("Guardado parcialmente: guardado localmente, pero falló la sincronización con Supabase.");
    }
  }

  async deleteAuthority(id) {
    await this.initPromise;
    let deletedTitle = `ID: ${id}`;
    let deletedOnSupabase = false;

    if (this.mode === 'supabase') {
      try {
        const { data } = await this.supabase.from('authorities').select('name, cargo').eq('id', id).single();
        if (data) deletedTitle = `${data.name} (${data.cargo})`;
        const { error } = await this.supabase.from('authorities').delete().eq('id', id);
        if (error) throw error;
        deletedOnSupabase = true;
      } catch (err) {
        console.warn("❌ Error al eliminar autoridad en Supabase.", err);
      }
    }

    const authorities = JSON.parse(localStorage.getItem('escuela_authorities') || '[]');
    const idx = authorities.findIndex(a => a.id === id);
    if (idx !== -1) {
      deletedTitle = `${authorities[idx].name} (${authorities[idx].cargo})`;
      authorities.splice(idx, 1);
      localStorage.setItem('escuela_authorities', JSON.stringify(authorities));
    }

    await this.addLog('ELIMINAR_AUTORIDAD', `Se eliminó de la nómina directiva: "${deletedTitle}" (ID: ${id}).`);

    if (this.mode === 'supabase' && !deletedOnSupabase) {
      throw new Error("Eliminado parcialmente: eliminado localmente, pero falló la sincronización con Supabase.");
    }
  }
}

// Iniciar e inyectar globalmente el manejador de base de datos
window.db = new DatabaseManager();
