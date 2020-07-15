const $backBtn = document.querySelector('#back-btn');
const $userName = document.querySelector('#user-name');
const $email = document.querySelector('#created-by');
const $createdAt = document.querySelector('#created-at');
const $profession = document.querySelector('#profession');
const $infoList = document.querySelector('#category-list');
const $thoughtSection = document.querySelector('#thought-section');
const $newthoughtForm = document.querySelector('#new-thought-form');

let userId;

// add getuser() function, logic to retrieve user-id from URL and make a GET request for it
function getuser() {
  // get id of user
  const searchParams = new URLSearchParams(document.location.search.substring(1));
  const userId = searchParams.get('id');

  // get userInfo
  fetch(`/api/users/${userId}`)
    .then(response => {
      // error handling, check for a 4xx or 5xx error from server
      if (!response.ok) {
        throw new Error({ message: 'Something went wrong!' }); 
      }
      return response.json();
    })
    .then(printuser)
    .catch(err => {       // catch takes user back to home page if er
      console.log(err);
      alert('Cannot find a user with this id! Taking you back.');
      window.history.back();    // window history API allows us to control session state of browser, as if back button pressed
    });
}

function printuser(userData) {
  console.log(userData);

  userId = userData._id;

  const { userName, email, createdAt, profession, category, thoughts } = userData;

  $userName.textContent = userName;
  $email.textContent = email;
  $createdAt.textContent = createdAt;
  $profession.textContent = profession;
  $infoList.innerHTML = category
    .map(choice => `<span class="col-auto m-2 text-center btn">${choice}</span>`)
    .join('');

  if (thoughts && thoughts.length) {
    thoughts.forEach(printthought);
  } else {
    $thoughtSection.innerHTML = '<h4 class="bg-dark p-3 rounded">Add a thought!</h4>';
  }
}

// HTML divs with literals 
function printthought(thought) {
  // create div to hold thought and reactions
  const thoughtDiv = document.createElement('div');
    thoughtDiv.classList.add('my-2', 'card', 'p-2', 'w-100', 'text-dark', 'rounded');

  const thoughtContent = `
      <h5 class="text-dark">${thought.friend} thought on ${thought.createdAt}:</h5>
      <p>${thought.thoughtText}</p>
      <div class="bg-dark ml-3 p-2 rounded" >
        ${
          thought.reactions && thought.reactions.length
            ? `<h5>${thought.reactions.length} ${
                thought.reactions.length === 1 ? 'reaction' : 'reactions'
              }</h5>
          ${thought.reactions.map(printreaction).join('')}`
              : '<h5 class="p-1">No reactions yet!</h5>'
        }
      </div>
      <form class="reaction-form mt-3" data-thoughtid='${thought._id}'>
        <div class="mb-3">
          <label for="reaction-name">Friend name</label>
          <input class="form-input" name="reaction-name" required />
        </div>
        <div class="mb-3">
          <label for="reaction">Friend's reaction</label>
          <textarea class="form-textarea form-input"  name="reaction" required></textarea>
        </div>

        <button class="mt-2 btn display-block w-100">Add reaction</button>
      </form>
  `;
  thoughtDiv.innerHTML = thoughtContent;
  $thoughtSection.prepend(thoughtDiv);
  }
  function printreaction(reaction) {
    return `
    <div class="card p-2 rounded bg-secondary">
      <p>${reaction.friend} replied on ${reaction.createdAt}:</p>
      <p>${reaction.reactionBody}</p>
    </div>
  `;
  }


function handleNewthoughtSubmit(event) {
  event.preventDefault();
  const thoughtText = $newthoughtForm.querySelector('#thought').value;
  const friend = $newthoughtForm.querySelector('#written-by').value;
  if (!thoughtText || !friend) {
    return false;
  }
  const formData = { thoughtText, friend };
    // required to POST the form data
    fetch(`/api/thoughts/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
        .then(response => {
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
          response.json();
        })
        .then(thoughtResponse => {
          console.log(thoughtResponse);
          location.reload();
        })
        .catch(err => {
          console.log(err);
        });
  };

function handleNewreactionSubmit(event) {
  event.preventDefault();

  if (!event.target.matches('.reaction-form')) {
    return false;
  }
  const thoughtId = event.target.getAttribute('data-thoughtid');
  const friend = event.target.querySelector('[name=reaction-name]').value;
  const reactionBody = event.target.querySelector('[name=reaction]').value;
  if (!reactionBody || !friend) {
    return false;
  }
  const formData = { friend, reactionBody };
}

// PUT requests for new reactions
function handleNewreactionSubmit(event) {
  event.preventDefault();
  if (!event.target.matches('.reaction-form')) {
    return false;
  }
  const thoughtId = event.target.getAttribute('data-thoughtid');
  const friend = event.target.querySelector('[name=reaction-name]').value;
  const reactionBody = event.target.querySelector('[name=reaction]').value;
  if (!reactionBody || !friend) {
    return false;
  }
  const formData = { friend, reactionBody };
  fetch(`/api/thoughts/${userId}/${thoughtId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      response.json();
    })
    .then(thoughtResponse => {
      console.log(thoughtResponse);
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
}

$backBtn.addEventListener('click', function() {
  window.history.back();
});

// event
$newthoughtForm.addEventListener('submit', handleNewthoughtSubmit);
$thoughtSection.addEventListener('submit', handleNewreactionSubmit);


// on page load get user category 
getuser();