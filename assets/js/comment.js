const formComment = document.querySelector('.form-comment');
const targetComment = document.querySelector('.target-comment');

if(formComment) {
  formComment.addEventListener('submit', async e => {
    e.preventDefault();
    const text = document.getElementById('text').value
    await fetch(`${location.origin}/comment/${formComment.dataset.doc}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({ text })
      }
    )
    location.href = `${location.origin}/post`;
  })
}

targetComment.addEventListener('click', async e => {
  if(e.target.classList.contains('prova')) {
    await fetch(`${location.origin}/comment/${e.target.dataset.doc}`,
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