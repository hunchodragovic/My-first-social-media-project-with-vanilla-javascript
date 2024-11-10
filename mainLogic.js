const baseUrl = "https://tarmeezacademy.com/api/v1";



function setupUI(){
    const token = localStorage.getItem('token');
    const loginDiv = document.getElementById('login-div')
    const logoutDiv = document.getElementById('logout-div')
    // add btn
    const addBtn = document.getElementById('add-btn')
          if (token == null){
            if (addBtn != null){
                addBtn.style.setProperty('display', 'none', 'important');

            }
            loginDiv.style.setProperty('display', 'flex', 'important');
    
            logoutDiv.style.setProperty('display', 'none', 'important');
    
          }else{
             // for logged in user
             if (addBtn != null){
                addBtn.style.setProperty('display', 'flex', 'important');

             }
            loginDiv.style.setProperty('display', 'none', 'important');
    
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

    // AUTH FUNCTIONS
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

      

      function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        showLoggedoutSucccessAlert()
        setupUI()
       
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

      function getCurrentUser(){
        let user = null
        const storageUser =  localStorage.getItem('user')
      
      if (storageUser != null){
        user = JSON.parse(storageUser)
      
      }
      return user
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
      function postClicked(postId) {
        // alert(postId)
        window.location = `Postdetails.html?postId=${postId}`
      }
      