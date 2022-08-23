bodyAndHairProducts.bodyCare.map((product) => {
  $('#productsWrapper-bodyCare').append(
    createCard(createFilePath(product.href), createFilePath(product.img.src), product.img.alt, product.title, product.price)
  );
});
