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
const baseUrl = "https://tarmeezacademy.com/api/v1";
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
        let content = `
          <div class="card shadow">
            <div class="card-header">
              <img src="${author.profile_image}" class="rounded-circle border border-3" style="width: 40px; height: 40px;">
              <b>${author.username}</b>
            </div>
            <div class="card-body">
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

function loginButtonClicked(){
   const userName = document.getElementById('username-input').value 
   const password = document.getElementById('password-input').value 
const params = {
    "username": userName ,
    "password": password
}
const url = `${baseUrl}/login`
axios.post(url,params).then((response) => {
  const token = response.data.token
localStorage.setItem('token',token);
localStorage.setItem('user',JSON.stringify(response.data.user))
showSuccessAlert()
const modal = document.getElementById('login-modal')
const modalInstance = bootstrap.Modal.getInstance(modal)
modalInstance.hide()
console.log(response.data);
setupUI()
})

   
    
}
function logout(){
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  showLoggedoutSucccessAlert()
  setupUI()
 
}
function showLoggedoutSucccessAlert() {
  const alertPlaceholder = document.getElementById('logout-alert'); // Ensure you have an element with this ID in your HTML
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

  appendAlert('Logging out ...', 'success');
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





function showSuccessAlert(){
  const alertPlaceholder = document.getElementById('success-alert')
  const appendAlert = (message, type) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
          `<div class="alert alert-${type} alert-dismissible" role="alert">`,
          `   <div>${message}</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          '</div>'
      ].join('')

      alertPlaceholder.append(wrapper)
      setTimeout(() => {
        wrapper.style.display = 'none' 
      }, 2000);
  }

  const alertTrigger = document.getElementById('login-btn')
  if (alertTrigger) {
      alertTrigger.addEventListener('click', () => {
          // This will now trigger only if the login is successful
          const userName = document.getElementById('username-input').value 
          const password = document.getElementById('password-input').value 
          const params = {
              "username": userName,
              "password": password
          }
          const url = `${baseUrl}/login`
          axios.post(url, params).then((response) => {
              const token = response.data.token
              localStorage.setItem('token', token);
              localStorage.setItem('user', JSON.stringify(response.data.user))
              appendAlert('Login successful!', 'success')

              
              const modal = document.getElementById('login-modal')
              const modalInstance = bootstrap.Modal.getInstance(modal)
              modalInstance.hide()
              console.log(response.data);
              
          });
      });
  }

}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', showSuccessAlert);





function setupUI(){
const token = localStorage.getItem('token');
const loginDiv = document.getElementById('login-div')
const logoutDiv = document.getElementById('logout-div')
// add btn
const addBtn = document.getElementById('add-btn')
      if (token == null){
        loginDiv.style.setProperty('display', 'flex', 'important');
        addBtn.style.setProperty('display', 'none', 'important');

        logoutDiv.style.setProperty('display', 'none', 'important');

      }else{
         // for logged in user

        loginDiv.style.setProperty('display', 'none', 'important');
        addBtn.style.setProperty('display', 'flex', 'important');

        logoutDiv.style.setProperty('display', 'flex', 'important');
        const user = getCurrentUser()
        const defaultProfileImage = 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg'; // Set your default image path

document.getElementById('nav-username').innerHTML = user.username


let profilePic = document.getElementById('nav-user-image')
if (profilePic.src == null){
  profilePic.src = 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg'
}else{
  profilePic.src = user.profile_image

}

      }
}

function refreshPage(){}


function registerBtnClicked(){
  
  const userName = document.getElementById('register-username-input').value 
  const password = document.getElementById('register-password-input').value 
  const Name = document.getElementById('register-name-input').value 
  const image = document.getElementById('register-image-input').files[0]






  let formData = new FormData()
  formData.append("name",Name)
  formData.append("username",userName)
  formData.append("password",password)
  formData.append("image",image)



const url = `${baseUrl}/register`


axios.post(url,formData,{
  headers: {
    "Content-Type":"multipart/form-data" ,
  }
}).then((response) => {
  console.log(response.data);
  
localStorage.setItem('token',response.data.token);
localStorage.setItem('user',JSON.stringify(response.data.user))
showSuccessAlert()
const modal = document.getElementById('register-modal')
const modalInstance = bootstrap.Modal.getInstance(modal)
modalInstance.hide()
registeredSuccessfully()
setupUI()
}).catch((error) => {
  console.log();
  
alert(error.response.data.message)
})
 
  
}



function createNewpostClicked(){
  const title = document.getElementById('post-title-input').value 
  const body = document.getElementById('post-body-input').value 
  const image = document.getElementById('post-image-input').files[0]
  let formData = new FormData()
  formData.append("body",body)
  formData.append("title",title)
  formData.append("image",image)


const url = `${baseUrl}/posts`
const token = localStorage.getItem('token')
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

function getCurrentUser(){
  let user = null
  const storageUser =  localStorage.getItem('user')

if (storageUser != null){
  user = JSON.parse(storageUser)

}
return user
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
