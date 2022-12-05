const form = document.querySelector('.form');
const tbody = document.querySelector('.tbody');

if(form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const nickname = document.getElementById('nickname').value;
    const city = document.getElementById('city').value;
    const age = document.getElementById('age').value;
    await fetch(`${location.origin}/user/${form.dataset.doc}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({ nickname, city, age })
      }
    )
    location.href = `${location.origin}/user`;
  })
}

tbody.addEventListener('click', async e => {
  if(e.target.classList.contains('bi-trash-fill')) {
    await fetch(`${location.origin}/user/${e.target.dataset.doc}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'DELETE',
      }
    )
    location.href = `${location.origin}/user`
  }
})

