
// =====================
// COCO WEBSITE SCRIPTS
// =====================

// --- NAV TOGGLE ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

// --- CART STORAGE ---
let cart = JSON.parse(localStorage.getItem('cocoCart')) || [];

// --- ADD TO CART from Product list ---
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    const item = {
      id: card.dataset.id,
      name: card.dataset.name,
      price: parseFloat(card.dataset.price),
      image: card.dataset.image,
      quantity: 1
    };

    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push(item);
    }

    localStorage.setItem('cocoCart', JSON.stringify(cart));
    alert(`${item.name} added to your cart!`);
  });
});

// --- PRODUCT DETAILS PAGE LOGIC ---
if (window.location.pathname.includes('product.html')) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const products = {
    toy1: {
      name: 'Luxury Chew Toy',
      price: 24.99,
      description: 'Crafted from non-toxic rubber — durable yet elegant for everyday play.',
      image: 'images/toy1.jpg'
    },
    toy2: {
      name: 'Soft Plush Bone',
      price: 19.99,
      description: 'A snuggly soft bone toy designed with Coco’s favorite texture.',
      image: 'images/toy2.jpg'
    },
    toy3: {
      name: 'Deluxe Rope Toy',
      price: 21.50,
      description: 'A hand-wrapped rope toy with natural cotton fibers perfect for tug fun.',
      image: 'images/toy3.jpg'
    }
  };

  const product = products[id];
  if (product) {
    document.getElementById('productImage').src = product.image;
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('productDescription').textContent = product.description;

    document.getElementById('addToCartBtn').addEventListener('click', () => {
      const existing = cart.find(i => i.id === id);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ id, ...product, quantity: 1 });
      }
      localStorage.setItem('cocoCart', JSON.stringify(cart));
      alert(`${product.name} added to your cart!`);
    });
  }
}

// --- CART PAGE LOGIC ---
if (window.location.pathname.includes('cart.html')) {
  const cartTable = document.getElementById('cartItems');
  const totalElem = document.getElementById('cartTotal');

  function updateCartDisplay() {
    cartTable.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td><input type="number" min="1" value="${item.quantity}" data-index="${index}" class="qty-input"></td>
        <td>$${subtotal.toFixed(2)}</td>
        <td><button class="remove-btn" data-index="${index}">×</button></td>
      `;
      cartTable.appendChild(row);
    });

    totalElem.textContent = `$${total.toFixed(2)}`;
    localStorage.setItem('cocoCart', JSON.stringify(cart));
  }

  updateCartDisplay();

  // Update quantity
  cartTable.addEventListener('change', (e) => {
    if (e.target.classList.contains('qty-input')) {
      const index = e.target.dataset.index;
      cart[index].quantity = parseInt(e.target.value);
      if (cart[index].quantity <= 0) cart[index].quantity = 1;
      updateCartDisplay();
    }
  });

  // Remove items
  cartTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      updateCartDisplay();
    }
  });
}
