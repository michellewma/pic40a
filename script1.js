alert("This is a JavaScript calculator!");

// access elements
let first = document.getElementById("first");
let second = document.getElementById("second");
let operators = document.getElementsByName("ops");

function updateFirst(num){
    // update the value inside element "first" by appending num to it
    first.value += num;
}

function updateSecond(num){
    // update the value inside element "second" by appending num to it
    second.value += num;
}

function compute(){
    // access first value, second value
    let v1 = parseFloat(first.value);
    let v2 = parseFloat(second.value);
    let operator;
    let result;

    // loop through operator array to determine which operator is checked
    for(let i=0; i<operators.length; i++){
        if(operators[i].checked){
            operator = operators[i].value;
        }
    }

    switch(operator){
        case '+': 
            result = v1 + v2;
            break;
        case '-': 
            result = v1 - v2;
            break;
        case '*': 
            result = v1 * v2;
            break;
        case '/': 
            result = v1 / v2;
            break;
    }

    // print out the result
    document.getElementById("result").innerHTML = result;
}