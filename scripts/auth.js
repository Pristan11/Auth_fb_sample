
//listen for auth status changes
auth.onAuthStateChanged(user=>{
    if(user){
      //  console.log('user logged In :', user);
      //get data
     

db.collection('guide').onSnapshot(snapshot=>{
    
    setupGuides(snapshot.docs);
    setupUI(user);
});

    }else{
       // console.log("user logged out")
       setupGuides([]);
       setupUI();
    }
});
//create form
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    
    db.collection('guide').add({
        titile : createForm['title'].value,
        district : createForm['content'].value
    
    }).then(()=>{
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(res=>{
        console.log(res.message);
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    })
})
//signup
const signupform = document.querySelector('#signup-form');

//get user info
signupform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email = signupform['signup-email'].value;
    const password = signupform['signup-password'].value;
    
    //signup with user
auth.createUserWithEmailAndPassword(email,password).then(cred=>{
    return db.collection('user').doc(cred.user.uid).set({
        bio : signupform['signup-bio'].value
    });
}).then(()=>{
 // console.log(cred);
 const model = document.querySelector('#modal-signup');
 M.Modal.getInstance(model).close();
 signupform.reset();

})

});

const logout = document.querySelector('#logout');
logout.addEventListener('click',(e)=>{
    e.preventDefault();
    auth.signOut().then(()=>{
//console.log('user signed out');
    })
   
});


// login
const loginform = document.querySelector('#login-form');
loginform.addEventListener('submit',(e)=>{
    e.preventDefault();
    // get user info
    const email = loginform['login-email'].value;
    const password = loginform['login-password'].value;

    auth.signInWithEmailAndPassword(email,password).then(cred=>{
       // console.log(cred.user)
        //close the modal
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginform.reset();
    })
})
