/* ============================================
   SMID PLATFORM — SHARED JAVASCRIPT
   Social Media Identification System
   ============================================ */

// ========== I18N TRANSLATIONS ==========
const translations = {
    en: {
        nav_home: 'Home', nav_categories: 'Categories', nav_register: 'Register',
        nav_dashboard: 'Dashboard', nav_idcard: 'ID Card', nav_cloud: 'Cloud',
        nav_languages: 'Languages', nav_founder: 'Founder',
        nav_login: 'Login', nav_logout: 'Logout',
        cloud_sync: 'Cloud Sync: Active', cloud_sync_off: 'Cloud Sync: Offline',
        saved_items: 'Saved Items', no_saved: 'No saved items yet', clear_all: 'Clear All',
        offline: 'You are offline', online: 'You are back online',
        loading: 'Loading...', error: 'Error', success: 'Success', warning: 'Warning',
        submit: 'Submit', cancel: 'Cancel', save: 'Save', delete: 'Delete',
        back: 'Back', next: 'Next', close: 'Close', copy: 'Copy', share: 'Share',
        search: 'Search', filter: 'Filter', settings: 'Settings', profile: 'Profile',
        notifications: 'Notifications', security: 'Security', privacy: 'Privacy',
        help: 'Help', about: 'About', contact: 'Contact',
        terms: 'Terms of Service', privacy_policy: 'Privacy Policy',
        language: 'Language', theme: 'Theme', dark: 'Dark', light: 'Light', neon: 'Neon',
        required_field: 'This field is required', invalid_email: 'Invalid email address',
        invalid_phone: 'Invalid phone number', password_mismatch: 'Passwords do not match',
        registration_success: 'Registration successful!', login_success: 'Login successful!',
        logout_success: 'Logged out successfully', session_expired: 'Session expired. Please log in again.'
    },
    fr: {
        nav_home: 'Accueil', nav_categories: 'Catégories', nav_register: "S'inscrire",
        nav_dashboard: 'Tableau de bord', nav_idcard: "Carte d'identité", nav_cloud: 'Cloud',
        nav_languages: 'Langues', nav_founder: 'Fondateur',
        nav_login: 'Connexion', nav_logout: 'Déconnexion',
        cloud_sync: 'Sync Cloud: Active', cloud_sync_off: 'Sync Cloud: Hors ligne',
        saved_items: 'Éléments sauvegardés', no_saved: 'Aucun élément sauvegardé', clear_all: 'Tout effacer',
        offline: 'Vous êtes hors ligne', online: 'Vous êtes de retour en ligne',
        loading: 'Chargement...', error: 'Erreur', success: 'Succès', warning: 'Avertissement',
        submit: 'Soumettre', cancel: 'Annuler', save: 'Sauvegarder', delete: 'Supprimer',
        back: 'Retour', next: 'Suivant', close: 'Fermer', copy: 'Copier', share: 'Partager',
        search: 'Rechercher', filter: 'Filtrer', settings: 'Paramètres', profile: 'Profil',
        notifications: 'Notifications', security: 'Sécurité', privacy: 'Confidentialité',
        help: 'Aide', about: 'À propos', contact: 'Contact',
        terms: "Conditions d'utilisation", privacy_policy: 'Politique de confidentialité',
        language: 'Langue', theme: 'Thème', dark: 'Sombre', light: 'Clair', neon: 'Néon',
        required_field: 'Ce champ est requis', invalid_email: 'Adresse email invalide',
        invalid_phone: 'Numéro de téléphone invalide', password_mismatch: 'Les mots de passe ne correspondent pas',
        registration_success: 'Inscription réussie !', login_success: 'Connexion réussie !',
        logout_success: 'Déconnexion réussie', session_expired: 'Session expirée. Veuillez vous reconnecter.'
    },
    es: {
        nav_home: 'Inicio', nav_categories: 'Categorías', nav_register: 'Registrarse',
        nav_dashboard: 'Panel', nav_idcard: 'Tarjeta de ID', nav_cloud: 'Nube',
        nav_languages: 'Idiomas', nav_founder: 'Fundador',
        nav_login: 'Iniciar sesión', nav_logout: 'Cerrar sesión',
        cloud_sync: 'Sincronización: Activa', cloud_sync_off: 'Sincronización: Desconectada',
        saved_items: 'Elementos guardados', no_saved: 'No hay elementos guardados', clear_all: 'Borrar todo',
        offline: 'Estás desconectado', online: 'Has vuelto a estar en línea',
        loading: 'Cargando...', error: 'Error', success: 'Éxito', warning: 'Advertencia',
        submit: 'Enviar', cancel: 'Cancelar', save: 'Guardar', delete: 'Eliminar',
        back: 'Atrás', next: 'Siguiente', close: 'Cerrar', copy: 'Copiar', share: 'Compartir',
        search: 'Buscar', filter: 'Filtrar', settings: 'Configuración', profile: 'Perfil',
        notifications: 'Notificaciones', security: 'Seguridad', privacy: 'Privacidad',
        help: 'Ayuda', about: 'Acerca de', contact: 'Contacto',
        terms: 'Términos de servicio', privacy_policy: 'Política de privacidad',
        language: 'Idioma', theme: 'Tema', dark: 'Oscuro', light: 'Claro', neon: 'Neón',
        required_field: 'Este campo es obligatorio', invalid_email: 'Correo electrónico inválido',
        invalid_phone: 'Número de teléfono inválido', password_mismatch: 'Las contraseñas no coinciden',
        registration_success: '¡Registro exitoso!', login_success: '¡Inicio de sesión exitoso!',
        logout_success: 'Sesión cerrada correctamente', session_expired: 'Sesión expirada. Por favor, inicia sesión de nuevo.'
    },
    pt: {
        nav_home: 'Início', nav_categories: 'Categorias', nav_register: 'Registrar',
        nav_dashboard: 'Painel', nav_idcard: 'Cartão de ID', nav_cloud: 'Nuvem',
        nav_languages: 'Idiomas', nav_founder: 'Fundador',
        nav_login: 'Entrar', nav_logout: 'Sair',
        cloud_sync: 'Sincronização: Ativa', cloud_sync_off: 'Sincronização: Offline',
        saved_items: 'Itens salvos', no_saved: 'Nenhum item salvo', clear_all: 'Limpar tudo',
        offline: 'Você está offline', online: 'Você está online novamente',
        loading: 'Carregando...', error: 'Erro', success: 'Sucesso', warning: 'Aviso',
        submit: 'Enviar', cancel: 'Cancelar', save: 'Salvar', delete: 'Excluir',
        back: 'Voltar', next: 'Próximo', close: 'Fechar', copy: 'Copiar', share: 'Compartilhar',
        search: 'Pesquisar', filter: 'Filtrar', settings: 'Configurações', profile: 'Perfil',
        notifications: 'Notificações', security: 'Segurança', privacy: 'Privacidade',
        help: 'Ajuda', about: 'Sobre', contact: 'Contato',
        terms: 'Termos de serviço', privacy_policy: 'Política de privacidade',
        language: 'Idioma', theme: 'Tema', dark: 'Escuro', light: 'Claro', neon: 'Neon',
        required_field: 'Este campo é obrigatório', invalid_email: 'Email inválido',
        invalid_phone: 'Número de telefone inválido', password_mismatch: 'As senhas não coincidem',
        registration_success: 'Registro bem-sucedido!', login_success: 'Login bem-sucedido!',
        logout_success: 'Logout realizado com sucesso', session_expired: 'Sessão expirada. Por favor, faça login novamente.'
    },
    yo: {
        nav_home: 'Ile', nav_categories: 'Àwọn Ẹka', nav_register: 'Forukọsilẹ',
        nav_dashboard: 'Dasibodu', nav_idcard: 'Kaadi ID', nav_cloud: 'Kuraadu',
        nav_languages: 'Awọn Ede', nav_founder: 'Oludasile',
        nav_login: 'Wọle', nav_logout: 'Jade',
        cloud_sync: 'Aṣiṣe Kuraadu: Nṣiṣẹ', cloud_sync_off: 'Aṣiṣe Kuraadu: Laiṣiṣẹ',
        saved_items: 'Awọn Ohun Ti A Fipamọ', no_saved: 'Ko si ohun ti a fipamọ', clear_all: 'Pa Gbogbo Rẹ',
        offline: 'O wa laiṣiṣẹ', online: 'O ti pada siṣẹ',
        loading: 'Nṣe igbasilẹ...', error: 'Aṣiṣe', success: 'Aṣeyọri', warning: 'Ikilo',
        submit: 'Firanṣẹ', cancel: 'Fagilee', save: 'Fipamọ', delete: 'Paarẹ',
        back: 'Pada', next: 'Tẹle', close: 'Tii', copy: 'Kọpọ', share: 'Pọpin',
        search: 'Wa', filter: 'Yan', settings: 'Eto', profile: 'Profaili',
        notifications: 'Awọn Ifitonileti', security: 'Aabo', privacy: 'Asiri',
        help: 'Iranlowo', about: 'Nipa', contact: 'Kan si',
        terms: 'Awọn Ofin Ilo', privacy_policy: 'Eto Asiri',
        language: 'Ede', theme: 'Akọle', dark: 'Dudu', light: 'Imọlẹ', neon: 'Neon',
        required_field: 'A nilo aaye yii', invalid_email: 'Imeeli ti ko tọ',
        invalid_phone: 'Nọmba foonu ti ko tọ', password_mismatch: 'Awọn ọrọ igbaniwọle ko yatọ',
        registration_success: 'Forukọsilẹ aṣeyọri!', login_success: 'Wiwọle aṣeyọri!',
        logout_success: 'Jade aṣeyọri', session_expired: 'Akoko ipari. Jọwọ wọle lẹẹkansi.'
    },
    ar: {
        nav_home: 'الرئيسية', nav_categories: 'الفئات', nav_register: 'تسجيل',
        nav_dashboard: 'لوحة التحكم', nav_idcard: 'بطاقة الهوية', nav_cloud: 'السحابة',
        nav_languages: 'اللغات', nav_founder: 'المؤسس',
        nav_login: 'تسجيل الدخول', nav_logout: 'تسجيل الخروج',
        cloud_sync: 'المزامنة: نشطة', cloud_sync_off: 'المزامنة: غير متصلة',
        saved_items: 'العناصر المحفوظة', no_saved: 'لا توجد عناصر محفوظة', clear_all: 'مسح الكل',
        offline: 'أنت غير متصل', online: 'أنت متصل مرة أخرى',
        loading: 'جاري التحميل...', error: 'خطأ', success: 'نجاح', warning: 'تحذير',
        submit: 'إرسال', cancel: 'إلغاء', save: 'حفظ', delete: 'حذف',
        back: 'رجوع', next: 'التالي', close: 'إغلاق', copy: 'نسخ', share: 'مشاركة',
        search: 'بحث', filter: 'تصفية', settings: 'الإعدادات', profile: 'الملف الشخصي',
        notifications: 'الإشعارات', security: 'الأمان', privacy: 'الخصوصية',
        help: 'المساعدة', about: 'حول', contact: 'اتصال',
        terms: 'شروط الخدمة', privacy_policy: 'سياسة الخصوصية',
        language: 'اللغة', theme: 'السمة', dark: 'داكن', light: 'فاتح', neon: 'نيون',
        required_field: 'هذا الحقل مطلوب', invalid_email: 'بريد إلكتروني غير صالح',
        invalid_phone: 'رقم هاتف غير صالح', password_mismatch: 'كلمات المرور غير متطابقة',
        registration_success: 'تم التسجيل بنجاح!', login_success: 'تم تسجيل الدخول بنجاح!',
        logout_success: 'تم تسجيل الخروج بنجاح', session_expired: 'انتهت الجلسة. يرجى تسجيل الدخول مرة أخرى.'
    },
    zh: {
        nav_home: '首页', nav_categories: '分类', nav_register: '注册',
        nav_dashboard: '仪表板', nav_idcard: '身份证', nav_cloud: '云',
        nav_languages: '语言', nav_founder: '创始人',
        nav_login: '登录', nav_logout: '登出',
        cloud_sync: '云同步: 活跃', cloud_sync_off: '云同步: 离线',
        saved_items: '已保存项目', no_saved: '尚无保存项目', clear_all: '全部清除',
        offline: '您已离线', online: '您已重新在线',
        loading: '加载中...', error: '错误', success: '成功', warning: '警告',
        submit: '提交', cancel: '取消', save: '保存', delete: '删除',
        back: '返回', next: '下一步', close: '关闭', copy: '复制', share: '分享',
        search: '搜索', filter: '筛选', settings: '设置', profile: '个人资料',
        notifications: '通知', security: '安全', privacy: '隐私',
        help: '帮助', about: '关于', contact: '联系',
        terms: '服务条款', privacy_policy: '隐私政策',
        language: '语言', theme: '主题', dark: '深色', light: '浅色', neon: '霓虹',
        required_field: '此字段为必填项', invalid_email: '无效的电子邮件地址',
        invalid_phone: '无效的电话号码', password_mismatch: '密码不匹配',
        registration_success: '注册成功!', login_success: '登录成功!',
        logout_success: '登出成功', session_expired: '会话已过期。请重新登录。'
    }
};

let currentLang = localStorage.getItem('smid_lang') || 'en';

// ========== LANGUAGE FUNCTIONS ==========
function toggleLangDropdown() {
    const dropdown = document.getElementById('langDropdown');
    if (dropdown) dropdown.classList.toggle('show');
}

function selectLang(lang) {
    currentLang = lang;
    localStorage.setItem('smid_lang', lang);
    applyLanguage(lang);

    const dropdown = document.getElementById('langDropdown');
    if (dropdown) dropdown.classList.remove('show');

    const currentLangEl = document.getElementById('currentLang');
    if (currentLangEl) {
        const labels = { en: 'English', fr: 'Français', es: 'Español', pt: 'Português', yo: 'Yorùbá', ar: 'العربية', zh: '中文' };
        currentLangEl.textContent = labels[lang] || 'English';
    }

    // Update RTL
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }

    showNotification('Language Changed', `Switched to ${labels[lang] || lang}`, 'success');
}

function applyLanguage(lang) {
    const t = translations[lang] || translations.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
    });
}

function loadLanguage() {
    const saved = localStorage.getItem('smid_lang');
    if (saved && translations[saved]) {
        currentLang = saved;
        applyLanguage(saved);
        if (saved === 'ar') document.documentElement.setAttribute('dir', 'rtl');

        const currentLangEl = document.getElementById('currentLang');
        if (currentLangEl) {
            const labels = { en: 'English', fr: 'Français', es: 'Español', pt: 'Português', yo: 'Yorùbá', ar: 'العربية', zh: '中文' };
            currentLangEl.textContent = labels[saved] || 'English';
        }

        // Highlight active language option
        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.classList.toggle('active', opt.getAttribute('data-lang') === saved);
        });
    }
}

// ========== THEME FUNCTIONS ==========
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('smid_theme', theme);

    // Update active button state
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        const btnTheme = btn.getAttribute('onclick');
        if (btnTheme && btnTheme.includes("'" + theme + "'")) {
            btn.classList.add('active');
        }
    });
}

function loadTheme() {
    const saved = localStorage.getItem('smid_theme') || 'dark';
    document.body.setAttribute('data-theme', saved);

    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        const btnTheme = btn.getAttribute('onclick');
        if (btnTheme && btnTheme.includes("'" + saved + "'")) {
            btn.classList.add('active');
        }
    });
}

// ========== MOBILE MENU ==========
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    if (menu) menu.classList.toggle('open');
    if (hamburger) hamburger.classList.toggle('active');
}

// ========== NOTIFICATIONS ==========
function showNotification(title, text, type) {
    const container = document.getElementById('notificationContainer');
    if (!container) return;
    const notif = document.createElement('div');
    notif.className = 'notification ' + type;
    const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ', ai: '🤖' };
    notif.innerHTML = '<div class="notification-title">' + (icons[type] || 'ℹ') + ' ' + title + '</div><div class="notification-text">' + text + '</div>';
    container.appendChild(notif);
    requestAnimationFrame(function() { notif.classList.add('show'); });
    setTimeout(function() {
        notif.style.transform = 'translateX(400px)';
        notif.style.opacity = '0';
        setTimeout(function() { notif.remove(); }, 400);
    }, 4000);
}

// ========== PARTICLES ==========
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId = null;

    function resize() { 
        canvas.width = window.innerWidth; 
        canvas.height = window.innerHeight; 
    }
    resize();
    window.addEventListener('resize', resize);

    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
    }
    Particle.prototype.update = function() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    };
    Particle.prototype.draw = function() {
        const primary = getComputedStyle(document.body).getPropertyValue('--primary').trim() || '#6366f1';
        ctx.fillStyle = primary;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    };

    function init() {
        particles = [];
        const count = Math.min(80, (canvas.width * canvas.height) / 15000);
        for (let i = 0; i < count; i++) particles.push(new Particle());
    }
    init();

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(function(p) { p.update(); p.draw(); });
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.strokeStyle = 'rgba(99, 102, 241, ' + (0.15 * (1 - dist / 150)) + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        animId = requestAnimationFrame(animate);
    }
    animate();
}

// ========== CLOUD STATUS ==========
function showCloudInfo() {
    const saved = JSON.parse(localStorage.getItem('smid_saved') || '[]');
    showNotification('Cloud Storage', saved.length + ' items saved locally. Sync when online.', 'info');
}

function updateSavedCount() {
    const saved = JSON.parse(localStorage.getItem('smid_saved') || '[]');
    const el = document.getElementById('savedCount');
    if (el) el.textContent = '(' + saved.length + ' saved)';
}

// ========== AUTH STATE ==========
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('smid_user') || 'null');
    const authNav = document.getElementById('authNav');
    if (authNav) {
        if (user) {
            authNav.innerHTML = '<a href="#" onclick="logout()" style="color:var(--text-muted);text-decoration:none;font-weight:500;font-size:0.9rem;">' + (translations[currentLang]?.nav_logout || 'Logout') + '</a>';
        } else {
            authNav.innerHTML = '<a href="login.html" style="color:var(--text-muted);text-decoration:none;font-weight:500;font-size:0.9rem;">' + (translations[currentLang]?.nav_login || 'Login') + '</a>';
        }
    }
}

function logout() {
    localStorage.removeItem('smid_user');
    showNotification('Logged Out', 'You have been logged out successfully.', 'success');
    setTimeout(function() { window.location.href = 'index.html'; }, 1000);
}

// ========== PASSWORD STRENGTH ==========
function checkPasswordStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
}

// ========== FORM VALIDATION ==========
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/.test(phone);
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', function() {
    loadTheme();
    loadLanguage();
    initParticles();
    checkAuth();
    updateSavedCount();

    // Close dropdowns on outside click
    document.addEventListener('click', function(e) {
        const dropdown = document.getElementById('langDropdown');
        const switcher = document.querySelector('.lang-switcher');
        if (dropdown && switcher && !switcher.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });

    // Online/offline detection
    window.addEventListener('online', function() {
        showNotification('Online', translations[currentLang]?.online || 'You are back online', 'success');
        const cloudStatus = document.querySelector('.cloud-status span');
        if (cloudStatus) cloudStatus.textContent = translations[currentLang]?.cloud_sync || 'Cloud Sync: Active';
    });
    window.addEventListener('offline', function() {
        showNotification('Offline', translations[currentLang]?.offline || 'You are offline', 'warning');
        const cloudStatus = document.querySelector('.cloud-status span');
        if (cloudStatus) cloudStatus.textContent = translations[currentLang]?.cloud_sync_off || 'Cloud Sync: Offline';
    });
});
