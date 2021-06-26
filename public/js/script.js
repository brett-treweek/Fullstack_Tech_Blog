const newPostBtn = document.querySelector('#newPostBtn')
const postModal = document.querySelector('.postModal')
const body = document.querySelector('.body')
const closeModal = document.querySelector('#closePost')

newPostBtn.addEventListener('click', showPostModal)
closeModal.addEventListener('click', backToDashboard)

function showPostModal(){
    postModal.classList.add('display')
    body.classList.add('blur')
}
function backToDashboard(){
    postModal.classList.remove('display')
    body.classList.remove('blur')
}

const newPostHandler = async (event) => {
    event.preventDefault();
    console.log('on click:')
    const title = document.querySelector("#titleInput").value.trim();
    const content = document.querySelector("#postTextarea").value.trim();
    if (title && content) {
      const response = await fetch("/dashboard", {
        method: "POST",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });
      console.log('Fetch post request')
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to sign up.");
      }
    }
  };

  document
  .querySelector("#submitBlog")
  .addEventListener("click", newPostHandler);