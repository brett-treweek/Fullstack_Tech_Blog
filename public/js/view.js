const comments = document.querySelector(".commentModal");
const closeModal = document.querySelector('#closePost')
const body = document.querySelector('.body')

// ============ Close Modal Button ================
closeModal.addEventListener('click', () => {
    comments.classList.remove('display')
    body.classList.remove('blur')
})

// ============= Hide Blog Modal ================
document
.querySelector('.selectBlog')
.addEventListener('click', () => document.location.replace('/dashboard'))


// ============= Submit New Comment =====================
document
.querySelector('#submitComment')
.addEventListener('click', async (e) => {
    e.preventDefault();
    let postId = document.querySelector('.selectBlog').getAttribute('id')
    let content = document.querySelector('#postTextarea').value.trim();
    console.log('commentData', postId, content)
    if (postId && content) {
        const response = await fetch("/comment", {
          method: "POST",
          body: JSON.stringify({ postId, content }),
          headers: { "Content-Type": "application/json" },
        });
        console.log('Fetch post request')
        if (response.ok) {
          document.location.replace(`/view/${postId}`);
        } else {
          alert("Failed to create comment.");
        }
      }
})

// ============ Display Add Comment Modal ===================
document
.querySelector('#addComment')
.addEventListener('click', () => {
    comments.classList.add('display')
    body.classList.add('blur')
})