function clearOrder() {
  order = [];
  totalOrder = 0; 
  updateTotalOrder();
  updateOrderList();
  disableFinalizeOrderButton();
}




function updateTotal() {
  const cash = parseInt(document.getElementById("cash").value);
  const change = cash - totalOrder;

  document.getElementById("total").value = totalOrder;
  document.getElementById("paymentMessage").style.display = "block";

  if (change >= 0) {
    document.getElementById("changeMessage").textContent = `Change: ${change} Pesos`;
  } else {
    document.getElementById("changeMessage").textContent = "Insufficient cash. Please add more.";
  }

  document.getElementById("changeMessage").style.display = "block";
}

function updateChangeMessage() {
  const cash = parseInt(document.getElementById("cash").value);
  const change = cash - totalOrder;

  if (change >= 0) {
    document.getElementById("changeMessage").textContent = `Change: ${change} Pesos`;
  } else {
    document.getElementById("changeMessage").textContent = "Insufficient cash. Please add more.";
  }

  document.getElementById("changeMessage").style.display = "block";
}







const payForm = document.querySelector('form');
payForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const cash = parseFloat(document.getElementById('cash').value);
  const total = parseFloat(document.getElementById('total').value);

  if (cash >= total) {
    const change = cash - total;
    const changeMessage = document.getElementById('changeMessage');
    changeMessage.textContent = `Your change is ${change} Pesos.`;
    changeMessage.style.display = 'block';

    const paymentMessage = document.getElementById('paymentMessage');
    paymentMessage.style.display = 'block';

    clearOrder();
  } else {
    alert('Insufficient cash. Please add more cash.');
  }
});

// ...

function clearOrder() {
  order = [];
  updateTotalOrder();
  updateOrderList();
  disableFinalizeOrderButton();
}

// ...

function updateTotalOrder() {
  totalOrder = order.reduce((total, item) => total + item.total, 0);
  document.getElementById("totalOrder").value = totalOrder;
}

// ...

function updateOrderList() {
  const orderList = document.getElementById("orderList");
  orderList.innerHTML = "";

  order.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.food} - Quantity: ${item.quantity} - Total: ${item.total}`;
    orderList.appendChild(listItem);
  });
}

// ...

function enableFinalizeOrderButton() {
  document.getElementById("finalizeOrderButton").disabled = false;
}

function disableFinalizeOrderButton() {
  document.getElementById("finalizeOrderButton").disabled = true;
}




document.getElementById("payButton").addEventListener("click", function () {
  const totalOrder = parseInt(document.getElementById("totalOrder").value);

  if (totalOrder < 50) {

    document.getElementById("cashOnlyPayment").style.display = "block";
    document.getElementById("otherPaymentMethods").style.display = "none";
  } else {

    document.getElementById("cashOnlyPayment").style.display = "none";
    document.getElementById("otherPaymentMethods").style.display = "block";
  }
});




document.getElementById("payButton").addEventListener("click", function () {
  const totalOrder = parseInt(document.getElementById("totalOrder").value);

  if (totalOrder < 50) {

    document.getElementById("cashOnlyPayment").style.display = "block";
    document.getElementById("otherPaymentMethods").style.display = "none";

    const cash = parseFloat(document.getElementById('cash').value);
    const total = parseFloat(document.getElementById('total').value);

    if (cash >= total) {
      const change = cash - total;
      const changeMessage = document.getElementById('changeMessage');
      changeMessage.textContent = `Your change is ${change} Pesos.`;
      changeMessage.style.display = 'block';

      const paymentMessage = document.getElementById('paymentMessage');
      paymentMessage.style.display = 'block';

      clearOrder();
    } else {
      alert('Insufficient cash. Please add more cash.');
    }
  } else {

    document.getElementById("cashOnlyPayment").style.display = "none";
    document.getElementById("otherPaymentMethods").style.display = "block";
  }
});





document.addEventListener('DOMContentLoaded', function () {
  const streetFoodsSelect = document.getElementById('street-foods');
  const quantityInput = document.getElementById('quantity');
  const addToOrderButton = document.getElementById('addToOrderButton');
  const finalizeOrderButton = document.getElementById('finalizeOrderButton');
  const totalOrderInput = document.getElementById('totalOrder');
  const orderList = document.getElementById('orderList');
  const totalInput = document.getElementById('total');
  const clearOrderButton = document.getElementById('clearOrderButton');
  const cashInput = document.getElementById('cash');
  const payButton = document.getElementById('payButton');
  const cashOnlyPayment = document.getElementById('cashOnlyPayment');
  const otherPaymentMethods = document.getElementById('otherPaymentMethods');
  const paymentMessage = document.getElementById('paymentMessage');
  const changeMessage = document.getElementById('changeMessage');

  let order = [];
  let totalOrder = 0;

  addToOrderButton.addEventListener('click', function () {
    const selectedFood = streetFoodsSelect.options[streetFoodsSelect.selectedIndex].value;
    const quantity = parseInt(quantityInput.value);

    order.push({ food: selectedFood, quantity: quantity });

    const listItem = document.createElement('li');
    listItem.textContent = `${selectedFood} x ${quantity}`;
    orderList.appendChild(listItem);

    updateTotalOrder();
    enableFinalizeOrderButton();
  });

  finalizeOrderButton.addEventListener('click', function () {
    finalizeOrderButton.disabled = true;
    clearOrderButton.disabled = true;
    addToOrderButton.disabled = true;
    quantityInput.disabled = true;
    streetFoodsSelect.disabled = true;
    payButton.disabled = true;
    cashInput.disabled = false;
    updateTotalOrder();
    orderFinalizedMessage.style.display = 'block'; 
    orderFinalizedMessage.textContent = 'Your order is finalized.';
  });

  clearOrderButton.addEventListener('click', function () {
    order = [];
    orderList.innerHTML = '';
    totalOrderInput.value = '';
    totalInput.value = '';
    disableFinalizeOrderButton();
  });

  payButton.addEventListener('click', function () {
    const cash = parseInt(cashInput.value);

    if (cash >= totalOrder) {
      paymentMessage.style.display = 'block';
      paymentMessage.textContent = 'Thank you for your payment. Your order is now being prepared.';
      changeMessage.style.display = 'block';
      changeMessage.textContent = `Change: ${cash - totalOrder} Pesos`;
      clearOrderButton.disabled = true;
      payButton.disabled = true;
    } else {
      alert('Insufficient payment. Please pay the exact amount or more.');
    }
  });

  function updateTotalOrder() {
    totalOrder = 0;

    for (const item of order) {
      if (item.food === 'burger') {
        totalOrder += 60 * item.quantity;
      } else if (item.food === 'fries') {
        totalOrder += 50 * item.quantity;
      } else if (item.food === 'fishball') {
        totalOrder += 20 * item.quantity;
      } else if (item.food === 'kikiam') {
        totalOrder += 25 * item.quantity;
      }
    }

    totalOrderInput.value = totalOrder;
    totalInput.value = totalOrder;
  }

  function enableFinalizeOrderButton() {
    finalizeOrderButton.disabled = false;
  }

  function disableFinalizeOrderButton() {
    finalizeOrderButton.disabled = true;
  }
});


