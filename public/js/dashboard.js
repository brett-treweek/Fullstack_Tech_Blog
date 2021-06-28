// ================= Selectors ========================

const newPostBtn = document.querySelector("#newPostBtn");
const postModal = document.querySelector(".postModal");
const editModal = document.querySelector(".editModal");
const body = document.querySelector(".body");
const closeModal = document.querySelectorAll(".closeBtn");
const deleteBtn = document.querySelectorAll(".deletePost");
const editBtn = document.querySelectorAll(".editPost");

// ================= Event Listeners =======================

newPostBtn.addEventListener("click", showPostModal);
closeModal.forEach((btn) => {
  btn.addEventListener("click", backToDashboard);
});

// ================ Display/Hide New Post Modal =========================

function showPostModal() {
  postModal.classList.add("display");
  body.classList.add("blur");
}
function backToDashboard() {
  postModal.classList.remove("display");
  editModal.classList.remove("display");
  body.classList.remove("blur");
}
// ================ Display/Hide Edit Post Modal =========================

function showEditModal() {
  editModal.classList.add("display");
  body.classList.add("blur");
}

// ================== Create New Post =====================

const newPostHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector("#titleInput").value.trim();
  const content = document.querySelector("#postTextarea").value.trim();
  if (title && content) {
    const response = await fetch("/dashboard", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });
    console.log("Fetch post request");
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create new post.");
    }
  }
};

document.querySelector("#submitBlog").addEventListener("click", newPostHandler);

//======================== Delete Post ======================

deleteBtn.forEach((btn) => {
  btn.addEventListener("click", deleteBlog);
});

async function deleteBlog(e) {
  let postId = e.target.id;
  console.log("deletePostId:", postId);
  response = await fetch("/dashboard", {
    method: "DELETE",
    body: JSON.stringify({ postId }),
    headers: { "Content-Type": "application/json" },
  });
  console.log("post deleted:", postId);
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("failed to delete post");
  }
}

// ===================== Edit Post ========================

editBtn.forEach((btn) => {
  btn.addEventListener("click", editBlogModal);
});

async function editBlogModal(e) {
  let post = e.target;
  let postId = post.id;
  let postTitle = post.parentNode.previousSibling.previousSibling.innerText;
  let postContent = post.parentNode.parentNode.nextSibling.nextSibling.innerText;

  showEditModal();
  let saveBtn = document.querySelector("#editBlog");
  let Title = document.querySelector("#editInput");
  console.log("Title:", Title, postId);
  let Content = document.querySelector("#editTextarea");
  Title.value = postTitle;
  Content.value = postContent;
  // console.log("AAAAAAAAAAAAAAAAAA", Title, Content);

  saveBtn.addEventListener("click", editBlogRequest);

  async function editBlogRequest(e) {
    e.preventDefault();
    const title = document.querySelector("#editInput").value.trim();
    const content = document.querySelector("#editTextarea").value.trim();

    console.log("POSTID;", Title);
    response = await fetch("/dashboard", {
      method: "PUT",
      body: JSON.stringify({ title, content, postId }),
      headers: { "Content-Type": "application/json" },
    });
    console.log("post edited:", postId);
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("failed to edit post");
    }
  }
}
