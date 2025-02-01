document.addEventListener("DOMContentLoaded", function() {
    let display = document.getElementById('display');
    let buttons = Array.from(document.getElementsByClassName('btn'));
    let currentInput = '';
    let operator = '';
    let firstOperand = null;
  
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        const buttonText = button.innerText;
  
        // Clear button (AC)
        if (buttonText === 'AC') {
          display.value = '';
          currentInput = '';
          firstOperand = null;
          operator = '';
          return;
        }
  
        // Equal button (=)
        if (buttonText === '=') {
          if (operator && firstOperand !== null) {
            let result = operate(firstOperand, currentInput, operator);
            display.value = result;
            currentInput = result;
            firstOperand = null;
            operator = '';
          }
          return;
        }
  
        // Square button (x²)
        if (buttonText === 'x²') {
          display.value = Math.pow(parseFloat(display.value), 2);
          return;
        }
  
        // Modulo button (%)
        if (buttonText === '%') {
          display.value = parseFloat(display.value) / 100;
          return;
        }
  
        // Operators (+, -, *, /)
        if (['+', '-', '*', '/'].includes(buttonText)) {
          if (firstOperand === null) {
            firstOperand = currentInput;
          } else {
            firstOperand = operate(firstOperand, currentInput, operator);
          }
          operator = buttonText;
          currentInput = '';
          return;
        }
  
        // Add number or decimal point to the current input
        currentInput += buttonText;
        display.value = currentInput;
      });
    });
  
    function operate(firstOperand, secondOperand, operator) {
      firstOperand = parseFloat(firstOperand);
      secondOperand = parseFloat(secondOperand);
      switch (operator) {
        case '+':
          return firstOperand + secondOperand;
        case '-':
          return firstOperand - secondOperand;
        case '*':
          return firstOperand * secondOperand;
        case '/':
          return firstOperand / secondOperand;
        default:
          return secondOperand;
      }
    }
  });
  