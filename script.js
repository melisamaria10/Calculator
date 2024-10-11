document.addEventListener('DOMContentLoaded', function() {
    const calculator=document.querySelector('.calculator');
    const calculator_keys=calculator.querySelector('.keys');
    calculator_keys.addEventListener('click', b => {
        const key=b.target;
        const action=key.dataset.action;
        const display=document.querySelector('.display-calculator');
        const value=key.textContent;
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('clicked'))
        const prevKey = calculator.dataset.prevKey;

        const calculate=(elem1,op,elem2)=>{
            let result='';
            if(op==='add'){
                result=parseFloat(elem1)+parseFloat(elem2);
            } else if(op==='minus'){
                result=parseFloat(elem1)-parseFloat(elem2);
            } else if(op==='multiply'){
                result=parseFloat(elem1)*parseFloat(elem2);
            } else if(op==='division'){
                result=parseFloat(elem1)/parseFloat(elem2);
            }
            return result
        }

        if(!action){
            calculator.dataset.prevKey='number';
            if(display.textContent==='0' || prevKey=== 'operator' || prevKey==='equal'){
                display.textContent=value;
            }
            else
            {
                display.textContent+=value;
            }
        }

        if(action==='decimal'){
            if(!display.textContent.includes('.'))
                display.textContent+='.';
            else if(prevKey==='operator')
                display.textContent='0.';

            calculator.dataset.prevKey='decimal';
        }

        if(action==='add' || action==='minus' || action==='multiply' || action==='division'){
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = display.textContent;

            if (firstValue && operator && prevKey !== 'operator' && prevKey !== 'equal') {
                display.textContent = calculate(firstValue, operator, secondValue);
                calculator.dataset.firstValue = display.textContent;
            } else {
                calculator.dataset.firstValue= display.textContent;
            }
            key.classList.add('clicked');
            calculator.dataset.prevKey='operator';
            calculator.dataset.operator=action;
            calculator.dataset.secondValue = '';
        }

        if(action==='equal'){
            
            let firstValue=calculator.dataset.firstValue;
            let secondValue=display.textContent;
            const operator=calculator.dataset.operator;

            if (prevKey === 'equal') {
                firstValue = display.textContent; 
                secondValue = calculator.dataset.secondValue; 
            } else {
                calculator.dataset.secondValue = secondValue; 
            }

            if (firstValue && operator) {


                if (secondValue === '0' && operator === 'division') {
                    display.textContent = 'Cannot divide by zero'; 
                } else {
                    const result = calculate(firstValue, operator, secondValue); 
                    display.textContent = result; 
                    calculator.dataset.firstValue = result; 
                }
        }

            calculator.dataset.prevKey = 'equal';
    }

        if(action==='clear'){
            display.textContent='0';
            calculator.dataset.firstValue = '';
            calculator.dataset.operator = '';
            calculator.dataset.secondValue = '';
            calculator.dataset.prevKey='clear';
        }      
    })
});