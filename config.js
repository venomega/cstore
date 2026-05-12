const CONFIG = {
  currency: {
    symbol: '',
    code: 'CUP',
    locale: 'es-CU',
  },
  logo: {
    type: 'svg',
    svg: `<svg class="logo-knot" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="18" stroke="#A0522D" stroke-width="2.5" fill="none"/>
      <path d="M12 20 Q20 8 28 20 Q20 32 12 20Z" stroke="#A0522D" stroke-width="2" fill="#C4704A" fill-opacity="0.3"/>
      <circle cx="20" cy="20" r="3" fill="#A0522D"/>
    </svg>`,
    img: '',
    alt: 'Logo',
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
    number: '5358436249',
  },
  store: {
    name: 'DinKnit',
    tagline: 'Tejidos Artesanales',
    email: 'hola@lamadeja.com',
    location: 'La Habana, Cuba',
    hours: {
      weekdays: '9:00 – 18:00',
      saturday: '10:00 – 14:00',
    },
    social: {
      facebook: 'https://www.facebook.com/profile.php?id=61579900713393',
      instagram: 'https://www.instagram.com/dinknit.crochet',
    },
  },
};

CONFIG.applyTheme = function () {
  const root = document.documentElement;
  Object.entries(this.theme).forEach(([key, val]) => {
    root.style.setProperty(key, val);
  });
};

CONFIG.applyLogo = function (containerId) {
  const container = document.getElementById(containerId || 'logoIcon');
  if (!container) return;
  if (this.logo.type === 'image' && this.logo.img) {
    container.innerHTML = `<img src="${this.logo.img}" alt="${this.logo.alt}" class="logo-knot">`;
  } else {
    container.innerHTML = this.logo.svg;
  }
};
