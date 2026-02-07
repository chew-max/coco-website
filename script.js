
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
	document.querySelector('.cart-full').style.display = 'inline';
	window.scrollTo(0, 0);
	
	
  });
});

// --- PRODUCT DETAILS PAGE LOGIC ---
if (window.location.pathname.includes('products.html')) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const products = {
    blue_ball: {
      name: 'Luxury Chew Toy',
      price: 1.99,
      description: 'Crafted from non-toxic rubber — durable yet elegant for everyday play.',
      image: 'images/blue_ball.jpg'
    },
    orange_ball: {
      name: 'Luxury Chew Toy',
      price: 1.99,
      description: 'Crafted from non-toxic rubber — durable yet elegant for everyday play.',
      image: 'images/orange_ball.jpg'
    },
    yellow_ball: {
      name: 'Luxury Chew Toy',
      price: 1.99,
      description: 'Crafted from non-toxic rubber — durable yet elegant for everyday play.',
      image: 'images/yellow_ball.jpg'
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
	window.scrollTo(0, 0);
    document.querySelector('.cart-full').style.display = 'inline'
	location.reload();
    });
  }
}

// --- CART PAGE LOGIC ---
if (window.location.pathname.includes('cart.html') || window.location.pathname.includes('thank-you.html') ) {
  const cartTable = document.getElementById('cartItems');
  const totalElem = document.getElementById('cartTotal');
  var paypalElem = document.getElementById('paypal-amount');
  var subTotal = document.getElementById('Subtotal');

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
        <td><button class="remove-btn x-button" data-index="${index}">×</button></td>
      `;
      cartTable.appendChild(row);
    });
	
  	paypalElem = +total + + 4.99;
	const inthis = String(paypalElem);
	subTotal.textContent = total
    if (!window.location.pathname.includes('thank-you.html')){totalElem.textContent = inthis;}
    localStorage.setItem('cocoCart', JSON.stringify(cart));
	window.scrollTo(0, 0);

  }

  updateCartDisplay();

  // Update quantity
  cartTable.addEventListener('change', (e) => {
    if (e.target.classList.contains('qty-input')) {
      const index = e.target.dataset.index;
      cart[index].quantity = parseInt(e.target.value);
      if (cart[index].quantity <= 0) cart[index].quantity = 1;
      updateCartDisplay();
	  location.reload();
	  window.scrollTo(0,0)
    }
  });

  // Remove items
  cartTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      updateCartDisplay();
	location.reload();
	window.scrollTo(0, 0);
    }
  });

}

//Check cart
if (localStorage.cocoCart.length > 2) {
	document.querySelector('.cart-full').style.display = 'inline';
	const navLinks = document.getElementById('orderNumber');
	
	if (window.location.pathname.includes('cart.html')) {
		document.querySelector('#shipping').style.display = 'inline';
		document.querySelector('.cartTotal').style.display = 'inline';
	}
	if (window.location.pathname.includes('thank-you.html')) {
		var storeOrder =  getRandomInt(9999);
		orderNumber.textContent = "#" + storeOrder;
		//document.getElementById('itemDetails').value = localStorage.cocoCart
		localStorage.setItem('orderID', storeOrder);
		
		//page change
		window.addEventListener('beforeunload', (e) => {
		  // Logic to check for unsaved changes, etc.
		  const hasUnsavedChanges = true; // Replace with actual check

		  if (hasUnsavedChanges) {
			// Prevent the default navigation
			e.preventDefault();
			// Chrome requires returnValue to be set
			e.returnValue = '';
			// Most browsers will display a standard warning dialog
		  } else {
			  	location.reload();
				window.scrollTo(0, 0);
				//localStorage.clear();
		  }
		});
		
		document.addEventListener('visibilitychange', () => {
		  if (document.visibilityState === 'hidden') {
			// Page is now hidden (user switched tabs, minimized, etc.)
				location.reload();
				window.scrollTo(0, 0);
				//localStorage.clear();
			// Useful for sending analytics data using navigator.sendBeacon
		  } else {
			// Page is now visible
				location.reload();
				window.scrollTo(0, 0);
				//localStorage.clear();
		  }
		});
		
		setTimeout(function() {
		//const details = await response.json();

			document.getElementById('itemDetails').value = localStorage.cocoCart;
			document.getElementById('email').value = localStorage.customerEmail;
			document.getElementById('name').value = localStorage.customerName
			
			const button = document.getElementById('submitForm');

			// Call the submit() method
			if (button) {
				button.click();
				localStorage.clear();
			}
			
		}, 2000);

	}
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max); 
}
