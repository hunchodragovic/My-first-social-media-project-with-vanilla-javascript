// // infinite scroll 
// window.addEventListener("scroll", function (){
//   const endOfPage = window.innerHeight+1 + window.scrollY >= document.body.offsetHeight;
//   console.log("scrolling");
  
// if (endOfPage && currentPage < lastPage){
//   currentPage = currentPage+1

//   getPosts(false,currentPage)
// }
    
// });

// // infinite scroll 


// setupUI()
// const baseUrl = "https://tarmeezacademy.com/api/v1" 
// let currentPage = 1
// let lastPage = 1
// function getPosts(reload = true,page = 1){

//   axios.get(`${baseUrl}/posts?limit=2&page=${page}`)
//   .then((response) => {
//       const posts = response.data.data
//       lastPage = response.data.meta.last_page
//       if(reload){
//         document.getElementById('posts').innerHTML = ""

//       }
//   for(post of posts){
//       console.log(response);
//       const author = post.author
//       let postTitle = ""
//       if (post.title != null){
//           postTitle = post.title
//       }
//   let content = `
//        <div class="card shadow">
//               <div class="card-header">
//                 <img src="${author.profile_image}" class="rounded-circle border border-3" style="width: 40px; height: 40px; ">
//   <b>${author.username}</b>     
//          </div>
//                    <div class="card-body">
//                       <img class="w-100" src="${post.image}" alt="">
//                    <h6 style="color: #9b9898;" class="mt-1">${post.created_at}</h6>
//                  <h5>${postTitle}</h5>
//                  <p>
//                  ${post.body}
//                  </p>
//              <hr>
//              <div>
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
//                   <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
//                 </svg>
//               <span>(${post.comments_count}) comments
//                   <span id="post-tags">
         
//           </span>
              
              
//               </span>
           
  
//              </div>
//               </div>
//             </div>
//   `
//   document.getElementById('posts').innerHTML += content
  
//   document.getElementById('post-tags').innerHTML = ""
//   for(tag of post.tags){
//   let tagsContent = `
//      <button class="btn btn-sm rounded-5"
//              style="background-color: gray; color: white;"
//             >
//                     ${tag.name}
//             </button>
//   `
//   document.getElementById('post-tags').innerHTML += tagsContent
//   }
//   }
//   })
  
// }
// getPosts()
// Infinite scroll
window.addEventListener("scroll", function () {
  const endOfPage = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;

  if (endOfPage && currentPage < lastPage) {
    currentPage += 1;
    getPosts(false, currentPage);
  }
});

// Initial setup and loading
setupUI();
let currentPage = 1;
let lastPage = 1;

function getPosts(reload = true, page = 1) {
  axios.get(`${baseUrl}/posts?limit=2&page=${page}`)
    .then((response) => {
      const posts = response.data.data;
      lastPage = response.data.meta.last_page;

      if (reload) {
        document.getElementById('posts').innerHTML = "";
      }

      for (const post of posts) {
        const author = post.author;
        let postTitle = post.title || "";
// show or hide edit btn
let user = getCurrentUser()
let isMyPost = user != null && post.author.id == user.id
let editButtonContent = ""
if(isMyPost){
editButtonContent =   `
<button class="btn btn-danger " style="margin-left: 5px ;float: right" onclick="deletePostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')">Delete</button>
<button class="btn btn-secondary" style="float: right" onclick="editPostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')">Edit</button>
`
}

        let content = `
          <div class="card shadow">
            <div class="card-header">
              <img src="${author.profile_image}" class="rounded-circle border border-3" style="width: 40px; height: 40px;">
              <b>${author.username}</b>
                       ${editButtonContent} 

            </div>
            <div class="card-body" onclick="postClicked(${post.id})" style="cursor: pointer">
              <img class="w-100" src="${post.image}" alt="">
              <h6 style="color: #9b9898;" class="mt-1">${post.created_at}</h6>
              <h5>${postTitle}</h5>
              <p>${post.body}</p>
              <hr>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                </svg>
                <span>(${post.comments_count}) comments</span>
                <span id="post-tags"></span>
              </div>
            </div>
          </div>
        `;
        document.getElementById('posts').innerHTML += content;

        // Insert tags
        const postTags = post.tags.map(tag => `<button class="btn btn-sm rounded-5" style="background-color: gray; color: white;">${tag.name}</button>`).join('');
        document.getElementById('post-tags').innerHTML += postTags;
      }
    })
    .catch(error => console.error("Error loading posts:", error));
}

// Initial load of posts
getPosts();


function logout(){
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  showLoggedoutSucccessAlert()
  setupUI()
 
}


function registeredSuccessfully() {
  const alertPlaceholder = document.getElementById('register-succefully'); // Ensure you have an element with this ID in your HTML
  const appendAlert = (message, type) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('');

    alertPlaceholder.append(wrapper);
    setTimeout(() => {
      wrapper.style.display = 'none';
    }, 2000);
  }

  appendAlert('Registred succefully ...', 'success');
}







// Call this function when the page loads
document.addEventListener('DOMContentLoaded', showSuccessAlert);






function refreshPage(){}





function createNewpostClicked(){
  let postId = document.getElementById("post-id-input").value;
  let isCreate = postId == null || postId == ""
 





  const title = document.getElementById('post-title-input').value 
  const body = document.getElementById('post-body-input').value 
  const image = document.getElementById('post-image-input').files[0]
 
 
 
  let formData = new FormData()
  formData.append("body",body)
  formData.append("title",title)
  formData.append("image",image)


let url = ""
const token = localStorage.getItem('token')

if (isCreate){
url = `${baseUrl}/posts`
axios.post(url,formData,{
  headers: {
    "Content-Type":"multipart/form-data" ,
    "authorization": `Bearer ${token}`
  }
}).then((response) => {

console.log(response);



    // Hide the modal after a successful post upload
    const modal = document.getElementById('create-post-modal');
    const bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();

    // Optionally, you can clear the input fields if desired
    document.getElementById('post-title-input').value = '';
    document.getElementById('post-body-input').value = '';
    document.getElementById('post-image-input').value = '';



}).catch((error)=>{
  alert(error.response.data.message)
})
}else{
  formData.append("_method","put")

  url = `${baseUrl}/posts/${postId}`
  axios.post(url,formData,{
  headers: {
    "Content-Type":"multipart/form-data" ,
    "authorization": `Bearer ${token}`
  }
}).then((response) => {

console.log(response);



    // Hide the modal after a successful post upload
    const modal = document.getElementById('create-post-modal');
    const bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();

    // Optionally, you can clear the input fields if desired
    document.getElementById('post-title-input').value = '';
    document.getElementById('post-body-input').value = '';
    document.getElementById('post-image-input').value = '';



}).catch((error)=>{
  alert(error.response.data.message)
})
}



}


function editPostBtnClicked(postObject){
  let post = JSON.parse(decodeURIComponent(postObject))
  console.log(post)
  document.getElementById("post-modal-submit-btn").innerHTML = "Update"

  document.getElementById("post-id-input").value = post.id
  document.getElementById("post-modal-title").innerHTML = "Edit Post"
  document.getElementById("post-title-input").value = post.title
  document.getElementById("post-body-input").value = post.body

let postModal = new bootstrap.Modal(document.getElementById("create-post-modal"),{})
postModal.toggle()
getPosts()


}

function deletePostBtnClicked(postObject){
  let post = JSON.parse(decodeURIComponent(postObject))
document.getElementById("delete-post-id-input").value = post.id
let postModal = new bootstrap.Modal(document.getElementById("delete-post-modal"),{})
postModal.toggle()


}


function confirmPostDelete(){
  const token = localStorage.getItem("token")
  const postId = document.getElementById("delete-post-id-input").value
 const url = `${baseUrl}/posts/${postId}`

 axios.delete(url,{
  headers: {
    "Content-Type":"multipart/form-data" ,
    "authorization": `Bearer ${token}`
  }
}).then((response) => {
  console.log(response);
  const modal = document.getElementById('delete-post-modal');
  const bootstrapModal = bootstrap.Modal.getInstance(modal);
  bootstrapModal.hide();
  getPosts()
 }).catch((error) => {
  alert(error.response.data.message)

 })

}




function addBtnClicked(){
  document.getElementById("post-modal-submit-btn").innerHTML = "Create"

  document.getElementById("post-id-input").value = ""
  document.getElementById("post-modal-title").innerHTML = "New Post"
  document.getElementById("post-title-input").value = ""
  document.getElementById("post-body-input").value = ""

let postModal = new bootstrap.Modal(document.getElementById("create-post-modal"),{})
postModal.toggle()
}



// function showSuccessAlert(){
//         const alertPlaceholder = document.getElementById('success-alert')
//       const appendAlert = (message, type) => {
//         const wrapper = document.createElement('div')
//         wrapper.innerHTML = [
//           `<div class="alert alert-${type} alert-dismissible" role="alert">`,
//           `   <div>${message}</div>`,
//           '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
//           '</div>'
//         ].join('')

//         alertPlaceholder.append(wrapper)
//       }

//       const alertTrigger = document.getElementById('login-btn')
//       if (alertTrigger) {
//         alertTrigger.addEventListener('click', () => {
//           appendAlert('Nice, you triggered this alert message!', 'success')
//         })
//       }
// }
