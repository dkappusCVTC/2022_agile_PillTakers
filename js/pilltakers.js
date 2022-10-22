/* jshint curly: true, esversion: 6, eqeqeq: true, latedef: true, laxbreak: true */
// account.html JS Code Start
var modal2 = document.getElementById("createModal2");
var modal = document.getElementById("myModal");
var btn2 = document.getElementById("createbtn");
var btn = document.getElementById("myBtn");
var span2 = document.getElementsByClassName("close2")[0];
var span = document.getElementsByClassName("close")[0];
btn.style.visibility = "hidden";
btn2.onclick = function() {
  modal2.style.display = "block";
}
btn.onclick = function() {
    modal.style.display = "block";
  }
span2.onclick = function() {
  modal2.style.display = "none";
}
span.onclick = function() {
    modal.style.display = "none";
  }
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}
function newUser(uname, pwd, fname, lname, e_mail, icon) {
    this.uname = uname;
    this.pwd = pwd;
    this.fname = fname;
    this.lname = lname;
    this.e_mail = e_mail;
    this.icon = icon;
}

var acctNumber = 0;
var accounts = [];

function createAccount() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var userEmail = document.getElementById("emailtext").value;
    var userFirstName = document.getElementById("firstnametext").value;
    var userLastName = document.getElementById("lastnametext").value;
    
    
    changeIcon();
    
    if (username == "" || password == "" || userFirstName == "" || userLastName == "" || userEmail == "") {
      alert("Please enter the required information.");
      
    } else {
        document.getElementById("dun").innerHTML = "username: " + username;
        document.getElementById("dfnln").innerHTML = "name: " + userFirstName + " " + userLastName;
        document.getElementById("de").innerHTML = "email: " + userEmail;
  
    
         document.getElementById("new").style.visibility = "hidden";
        btn2.style.visibility = "hidden";
        modal2.style.display = "none";
        btn.style.visibility = "visible";

        accounts[acctNumber] = new newUser(username, password, userFirstName, userLastName, userEmail, mainIcon);
        acctNumber++;
        user = JSON.stringify(accounts);
        localStorage.setItem("user", user);
    }
    
  

} // end createAccount()
// choose profile icon
var mainIcon = document.getElementById("mainicon");
var icons = document.getElementById("icons");
var value = icons.value;
var text = icons.options[icons.selectedIndex].text;

// fix this
function changeIcon() {
  if (icons.options[icons.selectedIndex].text == "007") {
    mainIcon.src = "images/007.jpg";
  } else if (icons.options[icons.selectedIndex].text == "Afro") {
    mainIcon.src = "images/Afro.png";
  } else if (icons.options[icons.selectedIndex].text == "Clown") {
    mainIcon.src = "images/Clown.png";
  } else if (icons.options[icons.selectedIndex].text == "Cowboy") {
    mainIcon.src = "images/Cowboy.png";
  } else if (icons.options[icons.selectedIndex].text == "Doctor") {
    mainIcon.src = "images/Doctor.png";
  } else if (icons.options[icons.selectedIndex].text == "Elvis") {
    mainIcon.src = "images/Elvis.png";
  } else if (icons.options[icons.selectedIndex].text == "FatherXmas") {
    mainIcon.src = "images/FatherXmas.png";
  } else if (icons.options[icons.selectedIndex].text == "Ghost") {
    mainIcon.src = "images/Ghost.png";
  } else if (icons.options[icons.selectedIndex].text == "Pirate") {
    mainIcon.src = "images/Pirate.png";
  } else if (icons.options[icons.selectedIndex].text == "Policeman") {
    mainIcon.src = "images/Policeman.png";
  } else if (icons.options[icons.selectedIndex].text == "Superhero") {
    mainIcon.src = "images/Superhero.png";
  } else if (icons.options[icons.selectedIndex].text == "TeddyBear") {
    mainIcon.src = "images/TeddyBear.png";
  } else {
    mainIcon.src = "images/add-user.png";
  }
}
function saveNewAcctInfo() {

// get current info
const user = JSON.parse(localStorage.getItem("user"));

var nusername = document.getElementById("newun").value;
var npassword = document.getElementById("newpw").value;
var nuserEmail = document.getElementById("newemail").value;
var nuserFirstName = document.getElementById("newfn").value;
var nuserLastName = document.getElementById("newln").value;

if (nusername == "" || npassword == "" || nuserFirstName == "" || nuserLastName == "" || nuserEmail == "") {
  alert("Please enter the required information or go back to cancel.");
} else {
    //save new
    var nuser = new newUser(nusername, npassword, nuserFirstName, nuserLastName, nuserEmail);
  
    localStorage.setItem("editinfo", nuser);
    document.getElementById("dun").innerHTML = "username: " + nusername;
    document.getElementById("dfnln").innerHTML = "name: " + nuserFirstName + " " + nuserLastName;
    document.getElementById("de").innerHTML = "email: " + nuserEmail;
    document.getElementById("dpw").innerHTML = "password: " + npassword;

    modal.style.display = "none";
}
}
// account.html JS Code End
