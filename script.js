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
    return a+b;
}
function subtract (a,b) {
    return a-b;
}
function multiply (a,b) {
    return a*b;
}
function divide (a,b) {
    // TODO: don't allow division be zero
    if (b==0) b=1; // change
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
    // Reset 'operation' and 'param2'
    operation = undefined;
    param2 = undefined;
}

// --- ENTERING SYMBOLS ---
// Manipulating the strings of firstParam/secondParam/operation

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
    if (onFirst && param1 != undefined) {
        param1 = changeSignAux(param1);
    }
    else if (!onFirst && param2 != undefined) {
        param2 = changeSignAux(param2);
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
    "sign": function() { changeSign(); },
    "=": function() { evaluate(); }
};

// CHECKING
addSymbol["1"]();
console.log("param1: " + param1); // should be 1
addSymbol["sign"]();
console.log("param1: " + param1); // should be -1
addSymbol["+"]();
console.log("param1: " + param1); // should be -1
addSymbol["4"]();
console.log("param1: " + param1); // should be -1
console.log("operation: " + operation); // should be +
console.log("param2: " + param2); // should be 4
addSymbol["0"]();
console.log("param2: " + param2); // should be 40
addSymbol["="]();
console.log("solution: " + param1); // should be 39
addSymbol["-"]();
console.log("param1: " + param1); // should be 39
addSymbol["2"]();
console.log("param1: " + param1); // should be 39
console.log("param2: " + param2); // should be 2
addSymbol["="]();
console.log("solution: " + param1); // should be 37

// --------------------------------------------
//                     DOM 
// --------------------------------------------

