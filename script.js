const correctAnswers = ['B', 'A', 'A', 'B']

const form = document.querySelector('.form-alternatives')
const popup = document.querySelector('.popup-wrapper')

form.addEventListener('submit', event => {
    event.preventDefault()

    let score = 0
    let messageParagraph = ''
    
    const messageQuiz = document.querySelector('.message-quiz')
    const resultQuiz = document.querySelector('.result-quiz')

    const userResponses = [
        form.inputQuestion1.value,
        form.inputQuestion2.value,
        form.inputQuestion3.value,
        form.inputQuestion4.value
    ]

    userResponses.forEach((userResponse, index) => {
        const correctAnswer = userResponse === correctAnswers[index]
        
        if(correctAnswer){
            score+= 25
        }
    })
    
    switch (score) {
        case 0:
            messageParagraph = 'Você precisa pesquisar mais sobre o assunto!'
            break
        case 25:
            messageParagraph = 'Faça mais um pouco de esforço nos estudos!'
            break
        case 50:
            messageParagraph = 'Você esta no caminho certo!'
            break
        case 75:
            messageParagraph = 'Muito bem, acertou quase todas!'
            break
        case 100:
            messageParagraph = 'Parabéns, você é F0D@!!!'
            break
    }

    messageQuiz.textContent = messageParagraph
    resultQuiz.textContent = `Você acertou ${score}% das perguntas!`

    popup.classList.remove('d-none')
})

popup.addEventListener('click', event => {
    const classNameElementClicked = event.target.classList[0]

    const classListToClosePopup = ['popup-wrapper', 'btn-closePopup']
    const classInListToClosePopup = classListToClosePopup.includes(classNameElementClicked)

    if(classInListToClosePopup){
        popup.classList.add('d-none')
    }
})