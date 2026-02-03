 document.addEventListener('DOMContentLoaded', function() { 
  const cartTable = document.getElementById('cartItems');
  const totalElem = document.getElementById('cartTotal');
  var finalAmount;

 
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
	finalAmount = `${total.toFixed(2)}`;

	
paypal.Buttons({
  createOrder: function(data, actions) {
    // Dynamically get your amount here



    return actions.order.create({
      purchase_units: [{
        amount: {
          value: finalAmount
        }
      }]
    });
  },
  onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
      alert('Transaction completed by ' + details.payer.name.given_name);
    });
  }
}).render('#paypal-button-container');
 });