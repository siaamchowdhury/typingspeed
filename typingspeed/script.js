let countCLTap = 1;
let nonLetterKey = new Map([
    ['1', 'one'],
    ['2', 'two'],
    ['3', 'three'],
    ['4', 'four'],
    ['5', 'five'],
    ['6', 'six'],
    ['7', 'seven'],
    ['8', 'eight'],
    ['9', 'nine'],
    ['0', 'zero'],
    ['Backspace', 'backspace'],
    ['Tab', 'tab'],
    ['CapsLock', 'capsLock'],
    ['Shift', 'leftShift'],
    [' ', 'btnSpacebar'],
    ['Enter', 'enter'],
])


let upper = 'qwertyuiop'
let home = 'asdfghjkl'
let bottom = 'zxcvbnm'
let number = '0123456789'
const RANDOM_QUOTE_API = 'http://api.quotable.io/random'
const randomQuote = document.getElementById('randomQuote')
const inputedWord = document.getElementById('inputWord')



inputedWord.addEventListener('input', ()=> {
    const arrayRandomQuote = randomQuote.querySelectorAll('span')
    const arrayInputedValue = inputedWord.value.split('')
    let isCorrect = true
    arrayRandomQuote.forEach((characterSpan, index) => {
        const character = arrayInputedValue[index]

        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            isCorrect = false   
        }
        else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }
        else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            isCorrect = false
        }
    })
    if (isCorrect) {
        randomQuote.innerText = ''
        inputedWord.value = ''
        renderNewQuote()
    }

})

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        randomQuote.appendChild(characterSpan)
    })
}

renderNewQuote()



document.onkeydown = function (e) {
    keypressColor(e.key)
}

document.onkeyup = function (e) {
    keyupColor(e.key)
}


function focusCapsLock(countCLTap) {
    let letters = 'qwertyuiopasdfghjklzxcvbnm'
    if (countCLTap % 2 == 0) {
        for (let i = 0; i < letters.length; i++) {
            document.getElementById(letters[i]).innerHTML = letters[i].toUpperCase()
        }
    } else {
        for (let i = 0; i < letters.length; i++) {
            document.getElementById(letters[i]).innerHTML = letters[i]
        }
    }
}


function keypressColor(k) {

    if (nonLetterKey.has(k)) {
        document.getElementById(nonLetterKey.get(k)).style.backgroundColor = "#d7d4d4"
        document.getElementById('capsLockSound').play()
    }

    if (k == 'CapsLock') {
        countCLTap = countCLTap + 1
        focusCapsLock(countCLTap)
    }
    if (number.includes(k)) {
        document.getElementById('bottomRowSound').play()
    }

    if (home.includes(k)) {
        document.getElementById('homeRowSound').play()
    }

    if (upper.includes(k)) {
        document.getElementById('upperRowSound').play()
    }

    if (bottom.includes(k)) {
        document.getElementById('bottomRowSound').play()
    }


    let key = document.getElementById(k)
    key.style.backgroundColor = "#d7d4d4"
}


function keyupColor(k) {

    if (nonLetterKey.has(k)) {
        document.getElementById(nonLetterKey.get(k)).style.backgroundColor = "#eae7e7"
    }

    let key = document.getElementById(k)
    key.style.backgroundColor = ""
}