const CONFIG = {
  currency: {
    symbol: '$',
    code: 'CUP',
    locale: 'es-CU',
  },
  theme: {
    '--cream': '#F5EFE6',
    '--warm-white': '#FAF7F2',
    '--sienna': '#A0522D',
    '--terracotta': '#C4704A',
    '--dusty-rose': '#C9977A',
    '--sage': '#7A9E7E',
    '--charcoal': '#2C2C2C',
    '--muted': '#8C7B6E',
    '--border': '#DDD3C8',
    '--shadow': 'rgba(44,44,44,0.12)',
  },
  whatsapp: {
    number: '50212345678',
  },
  store: {
    name: 'La Madeja',
    tagline: 'Tejidos Artesanales',
    email: 'hola@lamadeja.com',
    location: 'Ciudad de Guatemala, Guatemala',
    hours: {
      weekdays: '9:00 – 18:00',
      saturday: '10:00 – 14:00',
    },
    social: {
      facebook: '#',
      instagram: '#',
    },
  },
};

CONFIG.applyTheme = function () {
  const root = document.documentElement;
  Object.entries(this.theme).forEach(([key, val]) => {
    root.style.setProperty(key, val);
  });
};
