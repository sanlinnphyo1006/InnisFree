let orderItems = JSON.parse(localStorage.getItem('orders'));
let hasOrderItems = false;

for (const key in orderItems) {
  if (Object.hasOwnProperty.call(orderItems, key)) {
    const item = orderItems[key];

    if (item.category === 'bodyAndHairProducts_bodyCare') {
      let [orderItem] = bodyAndHairProducts.bodyCare.filter((product) => product.id === item.id);
      $('.orderItemsWrapper').append(
        createCartItem(
          orderItem.title,
          orderItem.price,
          item.count,
          parseInt(orderItem.price) * parseInt(item.count),
          createFilePath(orderItem.img.src),
          orderItem.img.alt,
          key
        )
      );
    }
    hasOrderItems = true;
  }
}

if (!hasOrderItems) {
  let orderEmptyState = create('span');
  orderEmptyState.textContent = 'There is no order.';
  orderEmptyState.classList.add('fs-4', 'fw-bold', 'text-center', 'd-block', 'mt-5');
  $('.order').append(orderEmptyState);
}
