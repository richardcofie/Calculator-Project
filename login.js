let signUpMode = true;
let users;
let currentUser;

//Get users from storage, else make a new array
if (localStorage.getItem('users') && localStorage.getItem('users').length > 0) {
    try {
        users = getUsersLocal();

    } catch (error){
        console.error("Error retrieving users from localstorage", error);
        users = [];
    }
} else {
    users = [];
}

const signUpBtn     = document.getElementById("signUpBtn");
const signInBtn     = document.getElementById("signInBtn");
const nameField     = document.getElementById("nameField");
const nameInput     = document.getElementById("nameInput");
const emailInput    = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const title         = document.getElementById("title");
const calcLink      = document.getElementsByClassName("calcLink");



function signInToUp() {
    nameField.style.maxHeight = "65px";
    title.innerHTML = "Sign Up";
    signInBtn.style.backgroundColor = "#f3f3f3";
    signUpBtn.style.backgroundColor = "#a7f7cc";
    signUpMode = true;
    
    signInBtn.onclick = signUpToIn;
    signUpBtn.onclick = signUp;
}

function signUpToIn() {
    nameField.style.maxHeight = "0";
    title.innerHTML = "Sign In";
    signInBtn.style.backgroundColor = "#a7f7cc";
    signUpBtn.style.backgroundColor = "#f3f3f3";
    signUpMode = false;
    signInBtn.onclick = signIn;
    signUpBtn.onclick = signInToUp;
}

function signUp() {

    if (validInfo(nameInput.value, emailInput.value, passwordInput.value) == true) {
        if (!(usedEmail())) {
            addNewUser(nameInput.value, emailInput.value, passwordInput.value);
            setCurrentUser(getUserIndex());
            goToHomePage();
        } else {
            alert("The email provide is already in use. try logging in");
        }
    } else {
        alert("Invalid information given. Please make any necessary changes");
    }

}
function signIn() {

    if (knownUser()) {
        console.log("user is known")
        setCurrentUser(getUserIndex());
        goToHomePage();
    } else {
        alert("Uknown email or password.");
    }
}
function addNewUser(name, email, password) {
    users.push({
        Name: name,
        Email: email,
        Password: password

    });
    console.log("Added new user:")
    console.log(users);
    saveUsersLocal();
    getUsersLocal();
}
function goToHomePage() {
    window.location.href = "index.html";
    console.log({calcLink});

}

//info checker for signing up
function validInfo(name, email, password) {

    const re = /\S+@\S+\.\S+/;

    //until one is invalid
    if (re.test(email)) {
        if (password.length >= 8) {
            if (name.length > 0) {
                return true;
            }
        }
    }

        return false;

}

function usedEmail() {
    const isEmailUsed = users.some((o) => o.Email === emailInput.value);
    
    return isEmailUsed;
}

//info checker for signing in specifically
function knownUser() {
    if (users.some((o) => o.Email === emailInput.value && o.Password === passwordInput.value)) {
        return true;
    } else {
        return false;
    }
}

//Get the array index of the valid user that has been input
function getUserIndex() {
    try {
        for (let i=0; i < users.length;i++) {
            if (users[i].Email == emailInput.value) {
                return i;
            }
        }
    } catch (error) {
        console.error("User not found.", error)
    }
}

//Set the current logged in user
function setCurrentUser(userArrayIndex) {
    localStorage.setItem("currentUser", userArrayIndex);
}

function getCurrentUser() {
    return localStorage.getItem("currentUser");
}

//Update local storage
function saveUsersLocal() {
    localStorage.setItem('users', JSON.stringify(users));
}

//retrieve local storage
function getUsersLocal() {
    return JSON.parse(localStorage.getItem('users'));
}
signInBtn.onclick = signUpToIn;
signUpBtn.onclick = signInToUp;

console.log("Users registered:");
console.log(users);

console.log("Last Session User:");
console.log(getCurrentUser());

/*
the ability to edit user info
*/ 