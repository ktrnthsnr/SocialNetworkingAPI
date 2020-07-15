const $userList = document.querySelector('#user-list');

// connect API to front-end
      const getuserList = () => {
        fetch('/api/users')
          .then(response => response.json())
          .then(userListArr => {
            userListArr.forEach(printuser);
          })
          .catch(err => {
            console.log(err);
          });
      };


  // HTML card with literals 
const printuser = ({ _id, userName, category, profession, thoughtCount, email, createdAt }) => {
  const userCard = `
    <div class="col-12 col-lg-6 flex-row">
      <div class="card w-100 flex-column">
        <h3 class="card-header">${userName}</h3>
        <div class="card-body flex-column col-auto">
          <h4 class="text-dark">Email: ${email}</h4>
          <p>On ${createdAt}</p>
          <p>${thoughtCount} thoughts</p>
          <h5 class="text-dark">Profession: ${profession}
          <h5 class="text-dark">category</h5>
          <ul>
            ${category
              .map(choice => {
                return `<li>${choice}</li>`;
              })
              .join('')}
          </ul>
          <a class="btn display-block w-100 mt-auto" href="/user?id=${_id}">Conversations</a>
        </div>
      </div>
    </div>
  `;

  $userList.innerHTML += userCard;
};

// call the function on load
getuserList();