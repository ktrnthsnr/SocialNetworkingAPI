const $addToppingBtn = document.querySelector('#add-choice');
const $userForm = document.querySelector('#user-form');
const $custominfoList = document.querySelector('#custom-category-list');

const handleAddChoice = event => {
  event.preventDefault();

  const toppingValue = document.querySelector('#new-choice').value;

  if (!toppingValue) {
    return false;
  }

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'choice';
  checkbox.value = toppingValue;
  checkbox.id = toppingValue
    .toLowerCase()
    .split(' ')
    .join('-');

  const label = document.createElement('label');
  label.textContent = toppingValue;
  label.htmlFor = toppingValue
    .toLowerCase()
    .split(' ')
    .join('-');

  const divWrapper = document.createElement('div');

  divWrapper.appendChild(checkbox);
  divWrapper.appendChild(label);
  $custominfoList.appendChild(divWrapper);

  toppingValue.value = '';
};

const handleuserSubmit = event => {
  event.preventDefault();

  const userName = $userForm.querySelector('#user-name').value;
  const email = $userForm.querySelector('#created-by').value;
  const profession = $userForm.querySelector('#user-profession').value;
  const category = [...$userForm.querySelectorAll('[name=choice]:checked')].map(choice => {
    return choice.value;
  });

  if (!userName || !email || !category.length) {
    return;
  }

  const formData = { userName, email, profession, category };

  // add functionality to POST the form data
  fetch('/api/users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(postResponse => {
      alert('user created successfully!');
      console.log(postResponse);
    })
    .catch(err => {
      console.log(err);
    });
};

$userForm.addEventListener('submit', handleuserSubmit);
$addToppingBtn.addEventListener('click', handleAddChoice);
