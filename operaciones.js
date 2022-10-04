$(function() {
    var num1 = '0';
    var num2 = '0';
    var operator = '';
    var result = '';
    var msg = '';
    const contenedor = document.querySelector('#contenedor')
    const btndelete = document.querySelector('#btndelete')
    let historial = []

    var displayTop = $('.display__top');
    var displayBottom = $('.display__bottom');

    display();

    $('.keyboard').on('click', function(e) {
        switch(e.target.id) {
            case 'delete-one':
                deleteOne();
                break;
            case 'ce':
                deleteDisplayBottom();
                break;
            case 'c':
                deleteAll();
                break;
            case '1':
                addDigit('1');
                break;
            case '2':
                addDigit('2');
                break;
            case '3':
                addDigit('3');
                break;
            case '4':
                addDigit('4');
                break;
            case '5':
                addDigit('5');
                break;
            case '6':
                addDigit('6');
                break;
            case '7':
                addDigit('7');
                break;
            case '8':
                addDigit('8');
                break;
            case '9':
                addDigit('9');
                break;
            case '0':
                addDigit('0');
                break;
            case 'div':
                addOperator('/');
                break;
            case 'mul':
                addOperator('*');
                break;
            case 'sub':
                addOperator('-');
                break;
            case 'sum':
                addOperator('+');
                break;
            case 'point':
                addPoint();
                break;
            case 'equal':
                calculate();
        }
        display();
    });

    function display() {
        if (msg !== '') {
            displayBottom.val(msg);
            msg = '';
        } else if (result !== '') {
            displayBottom.val(result);
        } else if (operator === '') {
            displayTop.val('');
            displayBottom.val(num1);
        } else {
            displayTop.val(num1 + ' ' + operator);
            displayBottom.val(num2);
        }
    }

    function deleteOne() {
        if (operator === '') {
            num1 = deleteDigit(num1);
        } else {
            num2 = deleteDigit(num2);
        }
    }

    function deleteDigit(num) {
        if (num.length > 1) {
            return num.substring(0, num.length - 1);
        }
        return '0';
    }

    function deleteDisplayBottom() {
        if (result !== '') {
            result = '';
        }
        if (operator === '') {
            num1 = '0';
        } else {
            num2 = '0';
        }
    }

    function deleteAll() {
        num1 = '0';
        num2 = '0';
        operator = '';
        result = '';
    }

    function addDigit(digit) {
        if (result !== '') {
            result = '';
        }
        if (operator === '') {
            num1 = getNewNumber(num1, digit);
        } else {
            num2 = getNewNumber(num2, digit);
        }
    }

    function getNewNumber(num, digit) {
        if (num === '0') {
            return digit;
        }
        return num + digit;
    }

    function addOperator(ope) {
        if (result !== '') {
            num1 = result;
            result = '';
        }
        if (operator === '') {
            operator = ope;
        } else if (parseFloat(num2) === 0) {
            operator = ope;
        } else {
            calculate();
            addOperator(ope);
        }
    }

    function addPoint() {
        if (operator === '') {
            num1 = getNumberWithPoint(num1);
        } else {
            num2 = getNumberWithPoint(num2);
        }
    }

    function getNumberWithPoint(num) {
        if (num.indexOf('.') === -1) {
            return num + '.';
        }
        return num;
    }

    function calculate(res) {
        if (num1 === '' || num2 === '' || operator === '') {
            return; 
            
        }
        if (operator === '/') {
            makeDivision();
        } else {
            
           let resultado = eval(num1 + operator + num2)
            let objeto = {
                numero1: num1,
                operador: operator,
                numero2: num2,
                resultado: resultado
            }
            historial.push(objeto)
            
            localStorage.setItem('historial', JSON.stringify(historial))
            Render() 
            showResult(resultado)
            
           
        }
    }

    function makeDivision() {
        let resultado = eval(num1 + operator + num2)
        let objeto = {
            numero1: num1,
            operador: operator,
            numero2: num2,
            resultado: resultado
        }
        historial.push(objeto)
        
        localStorage.setItem('historial', JSON.stringify(historial))
        Render() 
        if (parseFloat(num2) === 0) {
            deleteAll();
            msg = 'Indefinido';
            return;
        }
        showResult(eval(num1 + operator + num2));
    }

    function showResult(res) {
        deleteAll();
        result = res;
        
    }


     function Render(){
        contenedor.innerHTML = ''

        historial = JSON.parse(localStorage.getItem('historial'))
       
        

        if(historial === null){
            historial = []
        }
        else{
           historial.map(h => {
            contenedor.innerHTML += `<div class="alert alert-info text-center">${h.numero1}${h.operador}${h.numero2}=${h.resultado}</div>`

           })
        }
    }

    $("#btndelete").click(function(){
        Swal.fire({
            title: 'Seguro que deseas eliminar el historial?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
          }).then((result) => {
            if (result.isConfirmed) {

                    localStorage.removeItem('historial')
                    Render()
                }
            })
        
         })
     document.querySelector('DOMContentLoaded', Render) 
})

