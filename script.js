// --------------------------------------------
//                  GLOBALS
// --------------------------------------------

let param1 = undefined;
let param2 = undefined;
let operation = undefined;
let onFirst = true;

// --------------------------------------------
//                  CALCULATOR 
// --------------------------------------------

// --- EVALUATE ---
// Do the actual calculation
function add (a,b) {
    console.log("Adding: "+ a + " with " + b);
    return a+b;
}
function subtract (a,b) {
    console.log("Subtracting: "+ a + " with " + b);
    return a-b;
}
function multiply (a,b) {
    console.log("Multiplying: "+ a + " with " + b);
    return a*b;
}
function divide (a,b) {
    // TODO: don't allow division be zero
    if (b==0) b=1; // change
    console.log("Dividing: "+ a + " with " + b);
    return a/b;
}

const evaluateOperation = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide
}

function evaluate() {
    // Update 'param1' (also represents solution)
    if (param1 == undefined) {
        solution = 0;
    }
    else if (operation == undefined) {
        param1 = Number(param1);
    }
    else if (param2 == undefined) {
        param1 = evaluateOperation[operation]( Number(param1),  Number(param1));
    }
    else {
        param1 = evaluateOperation[operation]( Number(param1),  Number(param2));
    }
    param1 = param1.toString(10);
    // Reset 'operation' and 'param2'
    console.log("Calculation solution: "+ param1);
    operation = undefined;
    param2 = undefined;
}

// --- ENTERING SYMBOLS ---
// Manipulating the strings of param1/param2/operation

function reset() {
    param1 = undefined;
    operation = undefined;
    param2 = undefined;
    onFirst = true;
}

function setOperation(symbol) {
    if (onFirst && param1==undefined) {
        param1 = "0";
    }
    onFirst = false;
    if (operation == undefined) {
        operation = symbol;
    } else {
        evaluate();
        param2 = undefined;
        operation = symbol;
    }
}

function increaseString(symbol) {
    if (onFirst && param1 == undefined) {
        param1 = symbol;
    }
    else if (!onFirst && operation == undefined) {
        // happens when the previous solution is param1
        onFirst = true;
        param1 = symbol;
    }
    else if (!onFirst && param2 == undefined) {
        param2 = symbol
    }
    else if (onFirst) {
        param1 += symbol;
    } else {
        param2 += symbol;
    }
}

function increaseStringZero() {
    if (onFirst && param1 != undefined) {
        param1 += "0";
    }
    else if (!onFirst && param2 != undefined) {
        param2 += "0"
    }
}

function changeSignAux(param) {
    if (param[0] == "-") {
        return param.slice(1, param.length);
    }
    return "-" + param;
}

function changeSign() {
    if ((onFirst && param1 != undefined) || (!onFirst && operation == undefined)) {
        param1 = changeSignAux(param1);
    }
    else if (!onFirst && param2 != undefined) {
        param2 = changeSignAux(param2);
    }
}

function addPoint() {
    if (onFirst && param1 == undefined) {
        param1 = "0.";
    }
    else if (!onFirst && operation == undefined) {
        // happens when the previous solution is param1
        onFirst = true;
        param1 == undefined ? param1 = "0." : ((!param1.includes('.')) ? param1 = param1 + "." : null);
    }
    else if (!onFirst && param2 == undefined) {
        param2 = "0."
    }
    else if (onFirst && !param1.includes('.')) {
        param1 += ".";
    } else if (!onFirst && !param2.includes('.')) {
        param2 += ".";
    }
}

const addSymbol = {
    "+": function() { setOperation("+"); },
    "-": function() { setOperation("-"); },
    "*": function() { setOperation("*"); },
    "/": function() { setOperation("/"); },
    "1": function() { increaseString("1"); },
    "2": function() { increaseString("2"); },
    "3": function() { increaseString("3"); },
    "4": function() { increaseString("4"); },
    "5": function() { increaseString("5"); },
    "6": function() { increaseString("6"); },
    "7": function() { increaseString("7"); },
    "8": function() { increaseString("8"); },
    "9": function() { increaseString("9"); },
    "0": function() { increaseStringZero(); },
    ".": function() { addPoint(); },
    "sign": function() { changeSign(); },
    "=": function() { evaluate(); },
    "ac": function() { reset(); }
};

// --------------------------------------------
//              CONSOLE FUNCTIONS 
// --------------------------------------------

function printCurrentEntries() {
    let full = "";
    param1 == undefined ? full += "___" : full += param1;
    operation == undefined ? full += " ? " : full += operation;
    param2 == undefined ? full += "___" : full += param2;
    console.log(full);
    return full;
}

// --------------------------------------------
//                     DOM 
// --------------------------------------------

// COLLECT
const buttons = document.querySelectorAll('.calculator-btn');
let buttonsArr = Array.from(buttons);
let result = document.querySelector('#result');
let description = document.querySelector('#description-div');

// FUNCTIONS
function callAddSymbol(event) {
    let symbol = event.target.getAttribute('data-operation');
    addSymbol[symbol]();
    description.textContent = printCurrentEntries();
    if (param1 == undefined) {
        result.textContent = "0"; 
    }
    else if(param2 == undefined) {
        result.textContent = param1;
    }
    else {
        result.textContent = param2;
    }
}


// APPLY LISTENERS
buttonsArr.forEach( (btn) => {
    btn.addEventListener("click", (event) => callAddSymbol(event) );
});




