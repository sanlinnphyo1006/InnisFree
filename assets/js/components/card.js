function createCard(href = '#', src, alt, title, price) {
  let col = create('div');
  col.classList.add('col');
  col.innerHTML = `<a class="text-decoration-none text-body" href=${href}>
                      <div class="card">
                        <img class="card-img-top" src=${src} alt=${alt}/>
                        <div class="card-body text-center">
                          <h3 class="card-title fs-6">${title}</h3>
                          <span class="card-price fw-bold fs-5">${price !== null ? price : ''} Ks</span>
                        </div>
                      </div>
                    </a>`;
  return col;
}
