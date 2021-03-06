'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

window.onload = function () {
  addBtnListeners();
};

var addBtnListeners = function addBtnListeners() {
  var calcInput = document.getElementById('input');
  var resultInput = document.getElementById('result');
  var calculation = [];
  var operatorPressed = false;
  var operator = void 0;
  var lastInput = void 0;
  var calcResult = null;

  // Add text values to input
  var btns = document.querySelectorAll('.num, .operator');
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function () {
      var val = this.textContent;

      /*  Don't allow operators to be added if input is empty
    and ensure two operators aren't used in a row
   */
      switch (this.dataset.type) {
        case 'num':

          // Reset input on calculator after equals is pressed else just add the input to existing value
          if ((typeof lastInput === 'undefined' ? 'undefined' : _typeof(lastInput)) === 'object' && lastInput.dataset.val === 'equals') {
            calcInput.textContent = val;
            resultInput.textContent = "";
            calcResult = null;
            calculation = [];
          } else {
            calcInput.textContent += val;
          }

          calculation.push(this.dataset.val);
          lastInput = this;
          break;

        case 'operator':

          if (!calcInput.textContent || lastInput.dataset.type === 'operator') {
            break;
          } else if (this.dataset.val === 'equals') {
            calcInput.textContent += val;
            calculation.push(this.dataset.val);
            calcResult = calculate(calculation, operator);
            resultInput.textContent = calcResult;

            // RESET VARIABLES AFTER EQUALS
            operatorPressed = false;
            lastInput = this;
          } else if (!operatorPressed) {
            calcInput.textContent += val;
            calculation.push(this.dataset.val);
            operator = this.dataset.val;
            lastInput = this;
            operatorPressed = true;
          }
      }
    });
  }

  // Reset Calculator on AC click
  document.getElementById('cancel').addEventListener('click', function () {
    calcInput.textContent = '';
    resultInput.textContent = '';
  });

  // Save result in CSV file
  document.getElementById('save').addEventListener('click', function () {
    save(calcResult, calculation);
  });
};

var calculate = function calculate(vals, op) {
  var firstStr = "";
  var firstNum = void 0;
  var secondStr = "";
  var secondNum = null;
  var findNxtNum = false;

  vals.forEach(function (val, index) {

    /*  Check if the array value is a number then concatenate the numbers
    into one single string and convert to a whole number. Then do the same for the
    set of numbers after the operator.
  */
    if (!findNxtNum && checkNum(val)) {
      firstStr += val;
      firstNum = Number(firstStr);
    } else if (!checkNum(val)) {
      // if an operator is found
      findNxtNum = true;
    } else {
      secondStr += val;
      secondNum = Number(secondStr);
    }
  });

  if (secondNum === null) {
    return firstNum.toLocaleString('en');
  } else {

    switch (op) {

      case "plus":
        return (firstNum + secondNum).toLocaleString('en');
        break;

      case "subtract":
        return (firstNum - secondNum).toLocaleString('en');
        break;

      case "multiply":
        return (firstNum * secondNum).toLocaleString('en');
        break;

      case "divide":
        return (firstNum / secondNum).toLocaleString('en');
    }
  }
};

// Checks if a value can be inputted as a number including decimal point
var checkNum = function checkNum(val) {

  if (Number.isInteger(Number(val)) || val === ".") {
    return true;
  }

  return false;
};

var save = function save(calcResult, calculation) {

  if (calcResult !== null) {
    console.log("Saving");
    var sum = "";

    for (var i = 0; i < calculation.length; i++) {

      switch (calculation[i]) {

        case "plus":
          sum += "+";
          break;

        case "subtract":
          sum += "-";
          break;

        case "multiply":
          sum += "x";
          break;

        case "divide":
          sum += "/";
          break;

        case "equals":
          sum += "=";
          break;

        default:
          sum += calculation[i];

      }
    }

    console.log(calculation);
    console.log(sum);
    console.log(calcResult);

    sum += calcResult.toString();

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        if (xmlhttp.status == 200) {
          console.log(xmlhttp.responseText);
        } else if (xmlhttp.status == 400) {
          console.log('Error 400');
        } else {
          console.log('Error');
        }
      }
    };

    xmlhttp.open("POST", "save.php", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send("sum=" + encodeURIComponent(sum));
    console.log("Saved");
  } else {
    alert("Nothing to save. Please calculate a result before saving");
  }
};