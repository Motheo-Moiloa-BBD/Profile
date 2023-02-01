let calculator = document.querySelector(".calculator");
let keys = document.querySelector(".calculator_keys");
let display = document.querySelector(".calculator_display")

keys.addEventListener('click', (event) => {
    if(event.target.matches('button'))
    {
        let pressed_key = event.target;
        let data_action = pressed_key.dataset.action;
        let keyContent = pressed_key.textContent;
        let displayedNum = display.textContent;
        let previousKeyType = calculator.dataset.previousKeyType

        Array.from(pressed_key.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'))

        if(!data_action)
        {
            if(displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate')
            {
                display.textContent = keyContent;
            }
            else
            {
                display.textContent = displayedNum + keyContent;
            }
            calculator.dataset.previousKeyType = 'number';
        }

        if(data_action === 'add' || data_action === 'minus' || data_action === 'multiply' || data_action === 'divide')
        {
           let first_number = calculator.dataset.first_number;
           let operator = calculator.dataset.operator; 
           let second_number = displayedNum;

           if(first_number && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate')
           {
                let calculated_value = calculate(first_number, operator, second_number);
                display.textContent = calculated_value;

                calculator.dataset.first_number = calculated_value;
           }
           else{
                calculator.dataset.first_number = displayedNum;
           }

            pressed_key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.operator = data_action;
        }

        if(data_action === 'decimal')
        {
            if(!displayedNum.includes('.'))
            {
                display.textContent = displayedNum + '.';
            }
            else if(previousKeyType === 'operator' || previousKeyType === 'calculate')
            {
                display.textContent = '0.'
            }

           calculator.dataset.previousKeyType = 'decimal';
        }

        if(data_action === 'clear_all')
        {
            calculator.dataset.first_number = '';
            calculator.dataset.modified_number = '';
            calculator.operator = '';
            /*calculate.dataset.previousKeyType = ''*/

            display.textContent = '0';
            calculator.dataset.previousKeyType = 'clear';
        }

        if(data_action === 'calculate')
        {
           let first_number = calculator.dataset.first_number;
           let operator = calculator.dataset.operator; 
           let second_number = displayedNum;

           if(first_number)
           {
                if(previousKeyType === 'calculate')
                {
                    first_number = displayedNum;
                    second_number = calculator.dataset.modified_number;
                }

                display.textContent = calculate(first_number, operator, second_number);
           }

          
           calculator.dataset.modified_number = second_number;
           calculator.dataset.previousKeyType = 'calculate';
        }

        
    }
});

let calculate = (number1, operator, number2) =>
{
    switch(operator)
    {
        case 'add' :
            return (parseFloat(number1) + parseFloat(number2));
            break;
        case 'minus' :
            return (parseFloat(number1) - parseFloat(number2));
            break;
        case 'multiply' :
            return (parseFloat(number1) * parseFloat(number2));
            break;
        case 'divide' :
            return (parseFloat(number1) / parseFloat(number2));
            break;
    }
}





