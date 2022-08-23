let cartItems = JSON.parse(localStorage.getItem('itemsAdded'));
let hasItems = false;

for (const key in cartItems) {
  if (Object.hasOwnProperty.call(cartItems, key)) {
    const item = cartItems[key];

    if (item.category === 'bodyAndHairProducts_bodyCare') {
      let [cartItem] = bodyAndHairProducts.bodyCare.filter((product) => product.id === item.id);
      $('.cartItemsWrapper').append(
        createCartItem(
          cartItem.title,
          cartItem.price,
          item.count,
          parseInt(cartItem.price) * parseInt(item.count),
          createFilePath(cartItem.img.src),
          cartItem.img.alt,
          key
        )
      );
    }
    localStorage.setItem('orders', JSON.stringify(cartItems));
    hasItems = true;
  }
}

if (!hasItems) {
  $('#cart_orderNowBtn').classList.add('disabled');
  let cartEmptyState = create('span');
  cartEmptyState.textContent = 'There is no items in your cart.';
  cartEmptyState.classList.add('fs-4', 'fw-bold', 'text-center', 'd-block', 'mt-5');
  $('.cart').append(cartEmptyState);
}

function showCartOverlay() {
  $('.cart_overlay').classList.remove('d-none');
}

function closeCartOverlay() {
  $('.cart_overlay').classList.add('d-none');
}

function showOrderFormWrapper() {
  $('#orderFormWrapper').classList.remove('d-none');
}

function closeOrderFormWrapper() {
  $('#orderFormWrapper').classList.add('d-none');
}

function showOrderCompleteMessage() {
  $('.orderFormWrapper_completeMessage').classList.remove('d-none');
}

function closeOrderCompleteMessage() {
  $('.orderFormWrapper_completeMessage').classList.add('d-none');
}

on('click', '#cart_orderNowBtn', () => {
  showCartOverlay();
  showOrderFormWrapper();
});

on('click', '#orderForm_closeBtn', () => {
  closeCartOverlay();
  closeOrderFormWrapper();
});

on('click', '#orderForm_orderNowBtn', () => {
  let name = $('#orderForm_name').value;
  let phNum = $('#orderForm_phNum').value;
  let address = $('#orderForm_address').value;
  if (name !== '' && phNum !== '' && address !== '') {
    $('#orderForm').classList.add('d-none');
    showOrderCompleteMessage();
    setTimeout(() => {
      localStorage.removeItem('itemsAdded');
      closeOrderCompleteMessage();
      closeCartOverlay();
      location.reload();
    }, 700);
  } else {
    alert('Fill Form');
  }
});
