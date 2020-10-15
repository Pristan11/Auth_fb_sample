const guidelist = document.querySelector('.guides');
const LogoutLinks = document.querySelectorAll('.logged-out');
const LogInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI=(user)=>{
    if(user){
         //account info
         db.collection('user').doc(user.uid).get().then(doc=>{
            const html = `
        <div>Logged in as ${user.email}</div>
        <div>bio :  ${doc.data().bio}</div>

        `;

        accountDetails.innerHTML = html;
         })
       

        LogoutLinks.forEach(item=> item.style.display = "none");
        LogInLinks.forEach(item=> item.style.display = "block");
    } else {
       
        accountDetails.innerHTML = '';
        LogoutLinks.forEach(item=> item.style.display = 'block');
        LogInLinks.forEach(item=> item.style.display = "none");
    }
}

const setupGuides=(data)=>{

    if(data.length){ 
    let html = '';
    data.forEach(doc=>{
        const guide = doc.data();
        const li = `
        <li>
        <div class="collapsible-header grey lighten-4">${guide.titile}</div>
        <div class="collapsible-body white">${guide.district}</div>
      </li>
        `;
        html += li
    });
    guidelist.innerHTML=html;
}else{

    guidelist.innerHTML='<h5 class="center-align ">Login to View Guides</h5>';
}
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });