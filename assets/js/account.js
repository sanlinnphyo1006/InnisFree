function showLoginForm() {
  $('#logInForm').classList.remove('d-none');
}

function closeLoginForm() {
  $('#logInForm').classList.add('d-none');
}

function showCreateAnAccountForm() {
  $('#createAnAccountForm').classList.remove('d-none');
}

function closeCreateAnAccountForm() {
  $('#createAnAccountForm').classList.add('d-none');
}

function showOverLay() {
  $('.overlay').classList.remove('d-none');
}

function hideOverLay() {
  $('.overlay').classList.add('d-none');
}

function showBodyOverFlowY() {
  $('body').style.overflowY = 'auto';
}

function hideBodyOverFlowY() {
  $('body').style.overflowY = 'hidden';
}

function validateLogIn(email, pwd) {
  let [user] = users.filter((user) => user.email === email && user.password === pwd);
  console.log(user);
  return user !== undefined ? [user, true] : [user, false];
}

function resetLogInForm() {
  $('#logInForm_email').value = '';
  $('#logInForm_pwd').value = '';
}

function resetCreateAnAccountForm() {
  $('#createAnAccountForm_name').value = '';
  $('#createAnAccountForm_email').value = '';
  $('#createAnAccountForm_pwd').value = '';
}

function saveInLocalStorage(name) {
  localStorage.setItem('name', name);
  localStorage.setItem('logIn', true);
}

function hasAccount(email) {
  let [user] = users.filter((user) => user.email === email);
  console.log(user);
  return user !== undefined ? true : false;
}

function addInUserDatabase(name, email, pwd) {
  users.push({ name, email, pwd });
}

function showLogInBtn() {
  $('#logInBtn').classList.remove('d-none');
}

function hideLogInBtn() {
  $('#logInBtn').classList.add('d-none');
}

function showPersonAvatar() {
  $('#person_avatar').classList.remove('d-none');
}

function hidePersonAvatar() {
  $('#person_avatar').classList.add('d-none');
  $('#person_avatar').parentNode.classList.add('d-none');
}

function showPersonNameFirstLetter(firstLetter) {
  $('#person_nameFirstLetter').textContent = firstLetter;
}

function showPersonOptions() {
  $('#person_options').classList.remove('d-none');
}

function hidePersonOptions() {
  $('#person_options').classList.add('d-none');
}

function logOut() {
  localStorage.removeItem('name');
  localStorage.removeItem('logIn');
}

function showFormsWrapper() {
  $('#formsWrapper').classList.remove('d-none');
}

function hideFormsWrapper() {
  $('#formsWrapper').classList.add('d-none');
}

function showCart() {
  $('#cartBtn').classList.remove('d-none');
}

function hideCart() {
  $('#cartBtn').classList.add('d-none');
}

function createCartItem(title, price, count, totalPrice, src, alt, index) {
  let col = create('div');
  col.classList.add('col');
  col.dataset.index = index;
  col.innerHTML = `<div class="card cartItem">
                      <img class="card-img-top" src="${src}" alt="${alt}" /> 
                      <div class="card-body text-center"> 
                        <h2 class="cart-title fs-6">${title}</h2> 
                        <div> 
                          <span class="fs-6 fw-bold">${price} Ks</span> 
                          <span>x</span> 
                          <span class="fs-6 fw-bold">${count}</span> 
                          <br/>
                          <span class="fs-5 fw-bold">${totalPrice} Ks</span>                                
                        </div>
                      </div>                         
                    </div>`;

  return col;
}

let logIn = localStorage.getItem('logIn');
if (logIn) {
  let name = localStorage.getItem('name');
  hideLogInBtn();
  showPersonAvatar();
  showPersonNameFirstLetter(name[0]);
  showCart();
}

on('click', '#logInBtn', () => {
  showFormsWrapper();
  showLoginForm();
  showOverLay();
  hideBodyOverFlowY();
});

on('click', '#logInForm_closeBtn', () => {
  hideFormsWrapper();
  closeLoginForm();
  resetLogInForm();
  hideOverLay();
  showBodyOverFlowY();
});

on('click', '#logInForm_createAnAccountBtn', () => {
  closeLoginForm();
  showCreateAnAccountForm();
  showOverLay();
  hideBodyOverFlowY();
});

on('click', '#createAnAccountForm_closeBtn', () => {
  hideFormsWrapper();
  resetCreateAnAccountForm();
  closeCreateAnAccountForm();
  hideOverLay();
  showBodyOverFlowY();
});

on('click', '#createAnAccountForm_logInBtn', () => {
  closeCreateAnAccountForm();
  showLoginForm();
  showOverLay();
  hideBodyOverFlowY();
});

on('click', '#logInForm_logInBtn', (e) => {
  e.preventDefault();
  let email = $('#logInForm_email').value;
  let pwd = $('#logInForm_pwd').value;
  if (email !== '' && pwd !== '') {
    let [user, validate] = validateLogIn(email, pwd);
    if (validate) {
      saveInLocalStorage(user.name);
      hideLogInBtn();
      showPersonAvatar();
      showPersonNameFirstLetter(user.name[0]);
      resetLogInForm();
      hideFormsWrapper();
      closeLoginForm();
      hideOverLay();
      showBodyOverFlowY();
    } else {
      alert('Wrong email or password');
    }
  } else {
    alert('Fill form');
  }
});

on('click', '#createAnAccountForm_createAnAccountBtn', (e) => {
  e.preventDefault();
  let name = $('#createAnAccountForm_name').value;
  let email = $('#createAnAccountForm_email').value;
  let pwd = $('#createAnAccountForm_pwd').value;
  if (name !== '' && email !== '' && pwd !== '') {
    if (hasAccount(email)) {
      let wantToLogIn = prompt('There is an account with this email. Do you want to login (y/n)?') === 'y' ? true : false;
      if (wantToLogIn) {
        resetCreateAnAccountForm();
        closeCreateAnAccountForm();
        showLoginForm();
        $('#logInForm_email').value = email;
      }
    } else {
      addInUserDatabase(name, email, pwd);
      saveInLocalStorage(name, true);
      hideLogInBtn();
      showPersonAvatar();
      showPersonNameFirstLetter(name[0]);
      showCart();
      resetCreateAnAccountForm();
      hideFormsWrapper();
      closeCreateAnAccountForm();
      hideOverLay();
      showBodyOverFlowY();
    }
  } else {
    alert('Fill form');
  }
});

on('click', '#person_avatar', () => {
  $('#person_options').classList.contains('d-none') ? showPersonOptions() : hidePersonOptions();
});

on('click', '#person_logOutBtn', () => {
  logOut();
  hidePersonOptions();
  hidePersonAvatar();
  showLogInBtn();
  hideCart();
});
