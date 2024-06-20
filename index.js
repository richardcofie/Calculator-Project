const textDisplay = document.getElementById("textDisplay");

function appendToTextDisplay(char){
    textDisplay.value += char;
}

//Turn the last number into a decimal or divide by 100
function appendPercentage() {
    let operand = parseFloat(lastNumber(textDisplay.value))
    let decimalForm = operand / 100

    textDisplay.value = textDisplay.value.slice(0, (textDisplay.value.length - String(operand).length)) + String(decimalForm)
}
//Make the last number positive or negative
function invertNumber() {
    let operand = parseFloat(lastNumber(textDisplay.value))
    let prefix = textDisplay.value.charAt((textDisplay.value.length - String(operand).length - 1))
    let displayValue = textDisplay.value
    
    textDisplay.value = displayValue.slice(0, displayValue.length - String(operand).length-1)
    console.log(textDisplay.value)
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
        console.log(textDisplay.value)
    } 
    catch {
        textDisplay.value = "Error"
        console.log(textDisplay.value);
    }
    
}

function clearTextDisplay(){
    textDisplay.value = "";
    console.log("Display cleared.")
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
            lastNumber = char + lastNumber
            foundDecimal = true
        } else if (foundDigit || foundDecimal) {
            break;
        }
    }

    return foundDigit ? lastNumber : null;
}

//Additional Num row keys input
validNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
document.addEventListener("keydown", event => {

    if (event.key in validNumbers) {
        textDisplay.value += event.key
        console.log(event)
    }
})