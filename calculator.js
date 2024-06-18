
 /* class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    
    clear() {
        this.currentOperand = ' '
        this.previousOperand = ' '
        this.operation = undefined

    }

    delete() {
    }

    appendnumber(number){
        this.currentOperand = number

    }

    chooseoperation(operation){

    }

    compute(){

    }

    updatedDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand

    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationsButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelectorAll('[data-equals]')
const deleteButton = document.querySelectorAll('[data-delete]')
const allClearButton = document.querySelectorAll('[data-all-clear]')
const previousOperandTextElement= document.querySelectorAll('[data-previous-operand]')
const currentOperandTextElement= document.querySelectorAll('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => { 
    button.addEventListener('click' , () => {
        calculator.appendnumber(button.innerText)
        calculator.updatedDisplay()
    })

}) 

*/


class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
        this.updatedDisplay()
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
        this.updatedDisplay()
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    updatedDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationsButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => { 
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updatedDisplay()
    })
})

operationsButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updatedDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updatedDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
})

