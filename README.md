# 🏫 Portal Escolar — Escuela Técnica N°4 D.E. 5 "República del Líbano"

Este proyecto es la plataforma web oficial de la **Escuela Técnica N°4 D.E. 5 "República del Líbano"**, especializada en **Gestión y Administración de las Organizaciones**.

Ha sido diseñado y optimizado como una aplicación web frontend estática moderna y responsiva, con persistencia híbrida en la nube (**Supabase**) y en el almacenamiento local (**LocalStorage**), ideal para ser alojada de manera gratuita y automática en **Vercel**.

---

## 🏛️ Características Principales

1. **Persistencia Dual Inteligente (Nube + Local):**
   - **Modo Supabase (Nube):** Si el proyecto está conectado a Supabase (vía Vercel Integration o variables en `config.js`), todos los datos se leen y escriben en tiempo real en la base de datos en la nube.
   - **Modo Local (LocalStorage Fallback):** Si no hay conexión o claves configuradas, el sitio web entra automáticamente en modo de respaldo. Siembra datos semilla por defecto en el navegador para que el sitio sea 100% interactivo de inmediato (haciendo doble clic en `index.html`).
2. **Edición Administrativa Directa (CMS Front-End):**
   - Los visitantes públicos ven la información normalmente.
   - Al iniciar sesión como Administrador, se habilitan botones flotantes de edición rápida (lápices ✏️) sobre cada directivo y fecha del calendario en `institucional.html`, y controles completos para publicar, editar o borrar noticias en `novedades.html`.
3. **Registro de Auditoría (Audit Logs):**
   - Guarda un historial detallado de quién realiza cada cambio (crear/editar/eliminar noticias, directivos, calendario o inicios de sesión), accesible únicamente para administradores en `logs.html`.
4. **Diseño Premium y Responsivo:**
   - Hoja de estilos `styles.css` altamente optimizada para celulares, tablets y pantallas de escritorio.
   - Animaciones suaves de revelado al hacer scroll y carga fluida de componentes comunes (Topbar, Header, Footer) usando `layout.js` para evitar duplicar código (principio DRY).

---

## 🚀 Guía de Instalación y Despliegue en Vercel

Vercel compila e integra automáticamente este proyecto. Para conectar la base de datos de Supabase de manera profesional:

### 1. Crear el Proyecto en Supabase
1. Registrate de forma gratuita en [Supabase](https://supabase.com).
2. Creá un nuevo proyecto escolar.
3. Ve a **SQL Editor** en tu panel de Supabase y ejecuta el siguiente script SQL para crear las tablas necesarias:

```sql
-- 1. Tabla de Novedades
CREATE TABLE news (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT,
  date TEXT,
  "dateISO" TEXT,
  excerpt TEXT NOT NULL,
  content TEXT,
  emoji TEXT,
  image TEXT
);

-- 2. Tabla de Calendario
CREATE TABLE calendar (
  id BIGINT PRIMARY KEY,
  month_group TEXT NOT NULL,
  day TEXT NOT NULL,
  title TEXT NOT NULL,
  "desc" TEXT,
  important BOOLEAN DEFAULT false
);

-- 3. Tabla de Autoridades
CREATE TABLE authorities (
  id BIGINT PRIMARY KEY,
  name TEXT NOT NULL,
  cargo TEXT NOT NULL,
  avatar TEXT
);

-- 4. Tabla de Historial (Logs)
CREATE TABLE audit_logs (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  "user" TEXT NOT NULL,
  action TEXT NOT NULL,
  description TEXT NOT NULL
);

-- Habilitar Row Level Security (RLS) para permitir lectura pública
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir lectura pública de news" ON news FOR SELECT USING (true);
CREATE POLICY "Permitir todo a usuarios autenticados" ON news FOR ALL TO authenticated USING (true);

ALTER TABLE calendar ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir lectura pública de calendar" ON calendar FOR SELECT USING (true);
CREATE POLICY "Permitir todo a usuarios autenticados" ON calendar FOR ALL TO authenticated USING (true);

ALTER TABLE authorities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir lectura pública de authorities" ON authorities FOR SELECT USING (true);
CREATE POLICY "Permitir todo a usuarios autenticados" ON authorities FOR ALL TO authenticated USING (true);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir lectura pública de audit_logs" ON audit_logs FOR SELECT USING (true);
CREATE POLICY "Permitir todo a usuarios autenticados" ON audit_logs FOR ALL TO authenticated USING (true);
```

### 2. Crear el Usuario Administrador en Supabase Auth
Para poder loguearte en la nube:
1. En tu panel de Supabase, ve a **Authentication** -> **Users**.
2. Haz clic en **Add User** -> **Create User**.
3. Ingresa un email (ej: `admin@escuela.edu.ar`) y una contraseña segura.
4. Desmarca la casilla "Send email confirmation" para activarlo inmediatamente y haz clic en Guardar.

### 3. Vincular con Vercel
1. Sube este repositorio a tu cuenta de GitHub.
2. Crea un nuevo proyecto en **Vercel** y conecta este repositorio.
3. En el paso de configuración, puedes usar la integración oficial de Supabase de Vercel, o agregar manualmente las siguientes **Variables de Entorno (Environment Variables)**:
   - `SUPABASE_URL`: La URL del proyecto (ej: `https://xyz.supabase.co`).
   - `SUPABASE_ANON_KEY`: La clave pública anónima de tu API.
4. Haz clic en **Deploy**. ¡Listo! Vercel detectará el endpoint `/api/config.js` y transmitirá de forma segura las credenciales al frontend sin exponerlas públicamente en el código.

---

## 💻 Desarrollo Local (Sin Base de Datos)

Si deseas probar el proyecto localmente en tu computadora:
1. Abre la carpeta `PP-Libano` y haz doble clic en `index.html`.
2. El sitio cargará de inmediato con datos simulados autosembrados.
3. Para acceder al panel de administración local, ve a la sección de ingreso e inicia sesión con las credenciales de prueba:
   - **Usuario o Email:** `admin`
   - **Contraseña:** `admin123`
4. Al loguearte, podrás realizar modificaciones en directivos, calendario y novedades directamente sobre la pantalla. Estos cambios se guardarán en la memoria de tu navegador (`localStorage`).