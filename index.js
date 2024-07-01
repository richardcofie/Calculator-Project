const textDisplay = document.getElementById("textDisplay");

function appendToTextDisplay(char){
    if (textDisplay.value.length <= 10) { 
        textDisplay.value += char;
    } else {
        console.log("Character limit reached");
    }
}

//Turn the last number into a decimal or divide by 100
function appendPercentage() {
    let operand = parseFloat(lastNumber(textDisplay.value));
    let decimalForm = operand / 100;

    textDisplay.value = textDisplay.value.slice(0, (textDisplay.value.length - String(operand).length)) + String(decimalForm);
}
//Make the last number positive or negative
function invertNumber() {
    let operand = parseFloat(lastNumber(textDisplay.value));
    let prefix = textDisplay.value.charAt((textDisplay.value.length - String(operand).length - 1));
    let displayValue = textDisplay.value;
    
    textDisplay.value = displayValue.slice(0, displayValue.length - String(operand).length-1);
    console.log(textDisplay.value);
    if (prefix =="/") {
        textDisplay.value += "/-" + String(operand);
    } else if (prefix == "*") {
        textDisplay.value += "*-" + String(operand);
    } else if (prefix == "+") {
        textDisplay.value += "-" + String(operand);
    } else if (prefix == "-") {
        textDisplay.value += "+" + String(operand);
    } else if (prefix == "") {
        textDisplay.value = "+" + String(operand);
    }
}
    

//Evaluate the expression
function calculate(){
    try{
        textDisplay.value  = eval(textDisplay.value);
        
    } 
    catch {
        textDisplay.value = "Error"
        console.log(textDisplay.value);
    }
    
}

function clearTextDisplay(){
    textDisplay.value = "";
    console.log("Display cleared.");
}

//To keep the UI in line with the template, this only works with the keyboard
function backspace(){
    textDisplay.value = textDisplay.value.slice(0, (textDisplay.value.length-1));
}

function checkForError(){
    if (textDisplay.value == "Error" || textDisplay.value == "undefined" || textDisplay.value == "NaN"){
        const thisTimeout = setTimeout(clearTextDisplay, 1500);
    }
}

//function used to obtain a string of the last number in the text input box, to be used for calculations
function lastNumber(str) {
    let lastNumber = '';
    let foundDigit = false;
    let foundDecimal = false;

    for (let i = str.length - 1; i >= 0; i--) {
        const char = str[i];
        
        if (!isNaN(char) && char !== ' ') {
            lastNumber = char + lastNumber;
            foundDigit = true;
        } else if(char === '.' && !foundDecimal && foundDigit) {
            lastNumber = char + lastNumber;
            foundDecimal = true;
        } else if (foundDigit || foundDecimal) {
            break;
        }
    }

    return foundDigit ? lastNumber : null;
}

//Additional keyboard support
validNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

document.addEventListener("keydown", event => {

    checkForError();
    //Number and basic operators input
    console.log(event.key);

    if (event.key in validNumbers ){
        appendToTextDisplay(event.key);
    } else if (event.key == "-"){
        appendToTextDisplay(event.key);
    } else if (event.key == "+"){
        appendToTextDisplay(event.key);
    } else if (event.key == "/"){
        appendToTextDisplay(event.key);
    } else if (event.key == "*"){
        appendToTextDisplay(event.key);
    } else if (event.key == "%"){
        appendPercentage();
    } else if (event.key == "=" || event.key == "Enter"){
        calculate();
    } else if (event.key == "c"){
        clearTextDisplay();
    } else if (event.key == "Backspace"){
        backspace();
    }


})

document.addEventListener("click", event => {
    checkForError();
})

//Code from here for the login page
//Get user who is logged in from local storage, and append their name to the webpage
let users = JSON.parse(localStorage.getItem('users'));
let currentUser = users[localStorage.getItem("currentUser")];
console.log(currentUser);


const userDisplayText = document.getElementById("userDisplayText");

firstName = currentUser.Name.split(" ")[0];
userDisplayText.innerHTML = "Welcome back, " + String(firstName);


//The ability to delete profiles
const deleteButton = document.getElementById("deleteProfile");

function deleteAccount() {
    users = users.filter(user => user.Email != currentUser.Email);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", null);

    window.location.href = "login.html";
}

deleteButton.onclick = deleteAccount;



//If the user is idle, send them back to login.
const idleDuration = 60*5; //In seconds
let idleTimer;

function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(goToLogin, idleDuration * 1000);
}

function goToLogin() {
    localStorage.setItem("currentUser", null);
    alert("5 minutes session expired, log in again.")
    window.location.href = "login.html";
}

resetIdleTimer();
