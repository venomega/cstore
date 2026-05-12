const products = [
  {
    id: 1,
    name: 'Suéter Andino',
    desc: 'Lana merino, patrón geométrico andino. Abrigo perfecto para días fríos.',
    price: 85000,
    badge: 'Popular',
    badgeType: 'hot',
    color: '#C4704A',
    pattern: 'sweater'
  },
  {
    id: 2,
    name: 'Gorro Bohemio',
    desc: 'Gorro tejido a crochet con pompón de lana, estilo libre y cálido.',
    price: 28000,
    badge: 'Nuevo',
    badgeType: '',
    color: '#7A9E7E',
    pattern: 'hat'
  },
  {
    id: 3,
    name: 'Bufanda Infinity',
    desc: 'Bufanda circular suave al tacto. Tela gruesa, perfecta para el invierno.',
    price: 42000,
    badge: null,
    color: '#C9977A',
    pattern: 'scarf'
  },
  {
    id: 4,
    name: 'Cobija de Apego',
    desc: 'Tejida en punto espigas con lana gruesa. 100x80cm, lista para personalizar.',
    price: 130000,
    badge: 'Bestseller',
    badgeType: 'hot',
    color: '#A0522D',
    pattern: 'blanket'
  },
  {
    id: 5,
    name: 'Bolso Macramé',
    desc: 'Bolso tejido a mano en macramé. Resistente, versátil y muy original.',
    price: 55000,
    badge: 'Nuevo',
    badgeType: '',
    color: '#B8860B',
    pattern: 'bag'
  },
  {
    id: 6,
    name: 'Medias Gruesas',
    desc: 'Medias artesanales hasta la rodilla. Lana suave con diseño nórdico.',
    price: 32000,
    badge: null,
    color: '#6B5B8E',
    pattern: 'socks'
  },
  {
    id: 7,
    name: 'Chaleco Tejido',
    desc: 'Chaleco sin mangas con textura trenzada. Unisex, tallas S a XL.',
    price: 72000,
    badge: 'Popular',
    badgeType: 'hot',
    color: '#8B4513',
    pattern: 'vest'
  },
  {
    id: 8,
    name: 'Cojín Decorativo',
    desc: 'Cubierta tejida en punto nudo. Para cojín 40x40cm. Varios colores.',
    price: 38000,
    badge: null,
    color: '#CD853F',
    pattern: 'cushion'
  }
];

let cart = [];

function getProductSVG(product) {
  const c = product.color;
  const patterns = {
    sweater: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
      <path d="M30 20 L10 50 L30 55 L30 100 L90 100 L90 55 L110 50 L90 20 L75 30 Q60 40 45 30 Z" fill="${c}" fill-opacity="0.3" stroke="${c}" stroke-width="2"/>
      <path d="M45 30 Q60 45 75 30" fill="none" stroke="${c}" stroke-width="2.5"/>
      <line x1="30" y1="65" x2="90" y2="65" stroke="${c}" stroke-width="1.5" stroke-dasharray="4,3"/>
      <line x1="30" y1="75" x2="90" y2="75" stroke="${c}" stroke-width="1.5" stroke-dasharray="4,3"/>
      <line x1="30" y1="85" x2="90" y2="85" stroke="${c}" stroke-width="1.5" stroke-dasharray="4,3"/>
    </svg>`,
    hat: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
      <ellipse cx="60" cy="90" rx="40" ry="10" fill="${c}" fill-opacity="0.5" stroke="${c}" stroke-width="2"/>
      <path d="M20 90 Q20 30 60 20 Q100 30 100 90" fill="${c}" fill-opacity="0.3" stroke="${c}" stroke-width="2"/>
      <path d="M25 75 Q60 65 95 75" stroke="${c}" stroke-width="1.5" fill="none" stroke-dasharray="4,3"/>
      <path d="M22 62 Q60 50 98 62" stroke="${c}" stroke-width="1.5" fill="none" stroke-dasharray="4,3"/>
      <circle cx="60" cy="20" r="10" fill="${c}"/>
    </svg>`,
    scarf: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
      <ellipse cx="60" cy="60" rx="38" ry="28" fill="${c}" fill-opacity="0.25" stroke="${c}" stroke-width="2.5"/>
      <ellipse cx="60" cy="60" rx="28" ry="18" fill="${c}" fill-opacity="0.2" stroke="${c}" stroke-width="1.5"/>
      <path d="M22 60 Q30 45 38 60 Q46 75 54 60" stroke="${c}" stroke-width="2.5" fill="none"/>
      <path d="M66 60 Q74 45 82 60 Q90 75 98 60" stroke="${c}" stroke-width="2.5" fill="none"/>
    </svg>`,
    blanket: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
      <rect x="10" y="10" width="100" height="100" rx="6" fill="${c}" fill-opacity="0.2" stroke="${c}" stroke-width="2"/>
      <path d="M10 30 L30 10 M10 50 L50 10 M10 70 L70 10 M10 90 L90 10 M10 110 L110 10 M30 110 L110 30 M50 110 L110 50 M70 110 L110 70 M90 110 L110 90" stroke="${c}" stroke-width="1" opacity="0.5"/>
      <rect x="20" y="20" width="80" height="80" rx="4" fill="none" stroke="${c}" stroke-width="1.5" stroke-dasharray="5,3"/>
    </svg>`,
    bag: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
      <path d="M35 40 Q35 25 60 25 Q85 25 85 40" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"/>
      <rect x="20" y="40" width="80" height="70" rx="8" fill="${c}" fill-opacity="0.25" stroke="${c}" stroke-width="2"/>
      <line x1="20" y1="60" x2="100" y2="60" stroke="${c}" stroke-width="1.5" stroke-dasharray="4,3"/>
      <line x1="20" y1="75" x2="100" y2="75" stroke="${c}" stroke-width="1.5" stroke-dasharray="4,3"/>
      <line x1="20" y1="90" x2="100" y2="90" stroke="${c}" stroke-width="1.5" stroke-dasharray="4,3"/>
      <circle cx="60" cy="50" r="5" fill="${c}" fill-opacity="0.5"/>
    </svg>`,
    socks: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
      <path d="M45 10 L45 70 Q45 110 80 110 Q100 110 100 90 Q100 75 85 75 L75 75 L75 10 Z" fill="${c}" fill-opacity="0.3" stroke="${c}" stroke-width="2"/>
      <line x1="45" y1="25" x2="75" y2="25" stroke="${c}" stroke-width="1.5" stroke-dasharray="4,3"/>
      <line x1="45" y1="38" x2="75" y2="38" stroke="${c}" stroke-width="1.5" stroke-dasharray="4,3"/>
      <line x1="45" y1="51" x2="75" y2="51" stroke="${c}" stroke-width="1.5" stroke-dasharray="4,3"/>
      <path d="M45 10 Q60 5 75 10" stroke="${c}" stroke-width="2.5" fill="none"/>
    </svg>`,
    vest: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
      <path d="M20 20 L20 110 L55 110 L55 55 L65 55 L65 110 L100 110 L100 20 L80 30 Q60 45 40 30 Z" fill="${c}" fill-opacity="0.3" stroke="${c}" stroke-width="2"/>
      <path d="M40 30 Q60 50 80 30" fill="none" stroke="${c}" stroke-width="2"/>
      <line x1="55" y1="20" x2="65" y2="20" stroke="${c}" stroke-width="2"/>
      <circle cx="60" cy="65" r="3" fill="${c}" fill-opacity="0.7"/>
      <circle cx="60" cy="80" r="3" fill="${c}" fill-opacity="0.7"/>
      <circle cx="60" cy="95" r="3" fill="${c}" fill-opacity="0.7"/>
    </svg>`,
    cushion: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
      <rect x="10" y="20" width="100" height="80" rx="12" fill="${c}" fill-opacity="0.3" stroke="${c}" stroke-width="2.5"/>
      <path d="M10 60 Q60 40 110 60 Q60 80 10 60" fill="${c}" fill-opacity="0.2" stroke="${c}" stroke-width="1.5"/>
      <circle cx="60" cy="60" r="15" fill="${c}" fill-opacity="0.2" stroke="${c}" stroke-width="1.5"/>
      <circle cx="60" cy="60" r="5" fill="${c}" fill-opacity="0.6"/>
      <circle cx="20" cy="30" r="4" fill="${c}" fill-opacity="0.5"/>
      <circle cx="100" cy="30" r="4" fill="${c}" fill-opacity="0.5"/>
      <circle cx="20" cy="90" r="4" fill="${c}" fill-opacity="0.5"/>
      <circle cx="100" cy="90" r="4" fill="${c}" fill-opacity="0.5"/>
    </svg>`
  };
  return patterns[product.pattern] || patterns.sweater;
}

function fmt(n) {
  return CONFIG.currency.symbol + n.toLocaleString(CONFIG.currency.locale);
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = products.map(p => `
    <div class="product-card">
      <div class="product-img">
        ${p.badge ? `<span class="badge ${p.badgeType}">${p.badge}</span>` : ''}
        ${getProductSVG(p)}
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="desc">${p.desc}</p>
        <div class="product-footer">
          <div class="price"><span>${CONFIG.currency.code}</span>${fmt(p.price)}</div>
          <button class="add-btn" onclick="addToCart(${p.id})" title="Agregar al carrito">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
  showToast(`✓ ${product.name} agregado`);
  bumpCount();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else updateCartUI();
}

function getTotal() {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function getTotalItems() {
  return cart.reduce((s, i) => s + i.qty, 0);
}

function updateCartUI() {
  const count = getTotalItems();
  document.getElementById('cartCount').textContent = count;
  document.getElementById('itemCount').textContent = count;

  const total = getTotal();
  document.getElementById('subtotalAmt').textContent = fmt(total);
  document.getElementById('totalAmt').textContent = fmt(total);

  const container = document.getElementById('drawerItems');
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8C7B6E" stroke-width="1.5">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <p>Tu carrito está vacío</p>
      </div>`;
  } else {
    container.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-img">${getProductSVG(item)}</div>
        <div>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${fmt(item.price)}</div>
          <div class="qty-control">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
      </div>
    `).join('');
  }

  updateWhatsAppLink();
}

function updateWhatsAppLink() {
  const btn = document.getElementById('waBtn');
  if (cart.length === 0) {
    btn.href = '#';
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.5';
    return;
  }

  btn.style.pointerEvents = 'auto';
  btn.style.opacity = '1';

  let msg = `¡Hola! Quiero hacer un pedido de *${CONFIG.store.name}* 🧶\n\n`;
  msg += '*📋 Mi pedido:*\n';
  cart.forEach(item => {
    msg += `• ${item.name} x${item.qty} — ${fmt(item.price * item.qty)}\n`;
  });
  msg += `\n*💰 Total: ${fmt(getTotal())}*\n`;
  msg += '\n¿Podría confirmarme disponibilidad y forma de pago? ¡Gracias!';

  const encoded = encodeURIComponent(msg);
  btn.href = `https://wa.me/${CONFIG.whatsapp.number}?text=${encoded}`;
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
}

function bumpCount() {
  const el = document.getElementById('cartCount');
  el.classList.remove('bump');
  void el.offsetWidth;
  el.classList.add('bump');
}

function scrollToProducts() {
  document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
}

CONFIG.applyTheme();
renderProducts();
updateCartUI();
