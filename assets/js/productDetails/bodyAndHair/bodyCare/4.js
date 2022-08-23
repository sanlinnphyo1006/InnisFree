let count = 1;
let productID = bodyAndHairProducts.bodyCare[3].id;
let category = bodyAndHairProducts.bodyCare[3].category;
let decreaseCountBtn = $('#productDetailsWrapper_decreaseCountBtn');
let increaseCountBtn = $('#productDetailsWrapper_increaseCountBtn');
let addToCartBtn = $('#productDetailsWrapper_addToCartBtn');
let countValueContainer = $('#productDetailsWrapper_countValue');

let itemsAddedToCart = JSON.parse(localStorage.getItem('itemsAdded'));
let size = 0;
for (const key in itemsAddedToCart) {
  if (Object.hasOwnProperty.call(itemsAddedToCart, key)) {
    size++;
  }
}

$('#productDetailsWrapper_img').src = createFilePath(bodyAndHairProducts.bodyCare[3].img.src);
$('#productDetailsWrapper_title').textContent = bodyAndHairProducts.bodyCare[3].title;
$('#productDetailsWrapper_price').textContent = bodyAndHairProducts.bodyCare[3].price + ' Ks';
$('#productDetailsWrapper_description').textContent = bodyAndHairProducts.bodyCare[3].description;

let hasItem = false;
for (const key in itemsAddedToCart) {
  if (Object.hasOwnProperty.call(itemsAddedToCart, key)) {
    const item = itemsAddedToCart[key];
    if (item.id === productID) {
      hasItem = true;
      count = item.count;
    }
  }
}
if (hasItem) {
  addToCartBtn.classList.replace('btn-success', 'btn-dark');
  addToCartBtn.textContent = 'added';
  addToCartBtn.dataset.added = 'true';
  decreaseCountBtn.classList.add('disabled');
  increaseCountBtn.classList.add('disabled');
  countValueContainer.disabled = 'true';
  addToCartBtn.dataset.added === 'true';
  countValueContainer.value = count;
}

on('click', decreaseCountBtn, () => {
  if (count > 1) {
    count--;
    countValueContainer.value = count;
  }
});

on('click', increaseCountBtn, () => {
  if (count < 30) {
    count++;
    countValueContainer.value = count;
  }
});

on('click', addToCartBtn, () => {
  if (logIn) {
    if (addToCartBtn.dataset.added === 'false') {
      addToCartBtn.classList.replace('btn-success', 'btn-dark');
      addToCartBtn.textContent = 'added';
      addToCartBtn.dataset.added = 'true';
      decreaseCountBtn.classList.add('disabled');
      increaseCountBtn.classList.add('disabled');
      countValueContainer.disabled = 'true';

      itemsAddedToCart[size] = { id: productID, count, category };
      localStorage.setItem('itemsAdded', JSON.stringify(itemsAddedToCart));
      size++;
    } else {
      addToCartBtn.classList.replace('btn-dark', 'btn-success');
      addToCartBtn.innerHTML = 'Add To Cart <i class="bi bi-cart-plus ms-3"></i>';
      addToCartBtn.dataset.added = 'false';
      decreaseCountBtn.classList.remove('disabled');
      increaseCountBtn.classList.remove('disabled');
      countValueContainer.removeAttribute('disabled');

      itemsAddedToCart = JSON.parse(localStorage.getItem('itemsAdded'));
      // index of the product added to cart
      let index = 0;
      for (const key in itemsAddedToCart) {
        if (Object.hasOwnProperty.call(itemsAddedToCart, key)) {
          const item = itemsAddedToCart[key];
          if (item.id === productID) index = key;
        }
      }
      if (size === 1) {
        itemsAddedToCart = {};
      } else {
        let temp = { ...itemsAddedToCart };
        itemsAddedToCart = {};
        for (let i = 0; i < size; i++) {
          if (i < index) {
            itemsAddedToCart[i] = temp[i];
          } else if (i > index) {
            itemsAddedToCart[i - 1] = temp[i];
          }
        }
      }
      localStorage.setItem('itemsAdded', JSON.stringify(itemsAddedToCart));
      size--;
    }
  } else {
    showFormsWrapper();
    showLoginForm();
    showOverLay();
    hideBodyOverFlowY();
  }
});
