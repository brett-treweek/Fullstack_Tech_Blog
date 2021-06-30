const viewBtn = document.querySelectorAll('.viewPost')
const title = document.querySelector('#selectTitle')
const comments = document.querySelector(".commentContainer");
const blogs = document.querySelectorAll(".selectBlog");

// ======== Show Blog and Comments when click on Blog Title ====================
blogs.forEach((blog) => {
    blog.addEventListener('click', showBlog)
    });

function showBlog(e){
    let id = e.target.id;
    console.log(id)
    document.location.replace(`/view/${id}`)
    }












