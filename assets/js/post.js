const formPost = document.querySelector('.form-post');
const targetPost = document.querySelector('.target-post');
const inputCity = document.getElementById('inputCity');


if(formPost) {
  formPost.addEventListener('submit', async e => {
    e.preventDefault();
    const title = document.querySelector('.title').value
    await fetch(`${location.origin}/post/${formPost.dataset.doc}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({ title })
      }
    )
    location.href = `${location.origin}/post`;
  })
}

targetPost.addEventListener('click', async e => {
  if(e.target.classList.contains('bi-trash-fill')) {
    await fetch(`${location.origin}/post/${e.target.dataset.doc}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'DELETE',
      }
    )
    location.href = `${location.origin}/post`
  }
})

inputCity.addEventListener('keypress', e => {
  if (e.key === 'Enter') location.href=`${location.origin}/post/comments/city?city=${inputCity.value}`
  
})