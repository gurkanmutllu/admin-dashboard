export const STRINGS = {
    LOGIN: '/',
    LOADING: 'Yükleniyor...',
    LOGIN_TITLE: 'Admin Dashboard - Giriş Yap',
    USERNAME_PLACEHOLDER: 'Kullanıcı Adı',
    PASSWORD_PLACEHOLDER: 'Şifre',
    LOGIN_BUTTON: 'Giriş Yap',
    LOGOUT_BUTTON: 'Çıkış Yap',
    STATS_BUTTON: 'Istatistik Sayfasına Git',
    USER_LIST_TITLE: 'Kullanıcı Listesi',
    USER_LIST_HEADERS: {
        USERNAME: 'Kullanıcı Adı',
        NAME: 'İsim',
        CREATED_DATE: 'Yaratılma Tarihi'
    },
    NOT_LOGGED_IN: 'Giriş yapılmamış',
    AUTH_ERRORS: {
        INVALID_CREDENTIALS: 'Kullanıcı adı veya şifre hatalı',
        UNAUTHORIZED: 'Yetkisiz erişim',
        SESSION_VERIFY_ERROR: 'Kullanıcı oturumu doğrulanamadı'
    },
    STATS: {
        TITLE: 'İstatistikler',
        PURCHASES: 'Satın Alma',
        DOWNLOADS: 'İndirme',
        SIGNIN: 'Giriş Yap',
        DAILY_EARNINGS: 'Son 90 Günlük Günlük Kazanç',
        DAILY_EARNINGS_LABEL: 'Günlük Kazanç (USD)'
    },
    BACK_TO_USERS: 'Kullanıcı Listesine Dön'
} as const;
  
  // Type-safe route helper
  export const getString = (string: keyof typeof STRINGS) => STRINGS[string]; 