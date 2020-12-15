
const form = document.querySelector('.form-alternatives')
const popup = document.querySelector('.popup-wrapper')
const selectThemes = document.querySelector('.select-themes')
const result = document.querySelector('.result')

let themeIssues = null

function renderThemes(){

    const insertOptionsInSelect = ({ id, description }) => {
        const option = document.createElement('option')

        option.value = id
        option.textContent = description
        
        selectThemes.append(option)
    }

    selectThemes.textContent = ''
    themes.forEach(insertOptionsInSelect)
}

function renderQuestionsAndAnswers(){
    themeIssues = questionsAndAnswers
        .filter(({ id_theme }) => id_theme == selectThemes.value)
    
    const insertQuestionsInForm = ({ question, alternatives }, index) => {

        const containerQuestion = document.createElement('div')

        containerQuestion.className = "mb-4"
        containerQuestion.innerHTML = `
                <p class="lead font-weight-normal">${index+1}. ${question}:</p>
                <div class="ml-4">
                    <label>
                        <input type="radio" name="inputQuestion${index+1}" value="A" checked>
                        "${alternatives[0]}"
                    </label>
                </div>
                <div class="ml-4">
                    <label>
                        <input type="radio" name="inputQuestion${index+1}" value="B">
                        "${alternatives[1]}"
                    </label>
                </div>
                <div class="ml-4">
                    <label>
                        <input type="radio" name="inputQuestion${index+1}" value="C">
                        "${alternatives[2]}"
                    </label>
                </div>
                <div class="ml-4">
                    <label>
                        <input type="radio" name="inputQuestion${index+1}" value="D">
                        "${alternatives[3]}"
                    </label>
                </div>
        `
        
        form.append(containerQuestion)
        closeResult()
    }

    form.innerHTML = ''
    themeIssues.forEach(insertQuestionsInForm)

    const button = document.createElement('button')
    
    button.classList.add('btn', 'btn-success', 'btn-block')
    button.textContent = 'Enviar'

    form.append(button)
}

function closeResult(){
    result.classList.add('d-none')
}

function showResult(event){
    event.preventDefault()
    
    const timeAnimation = 10
    
    let score = 0
    let counter = 0

    const computePoints = ({ correctAnswer }, index) => {
        const isCorrectResponse = form[`inputQuestion${index+1}`].value == correctAnswer
        const pointsForQuestions = (100 / themeIssues.length)
        
        if(isCorrectResponse) score += pointsForQuestions
    }

    const countAnimation = () => {
        const totalPoints = counter === score
        
        if(totalPoints) clearInterval(timer)

        result.querySelector('span').textContent = `${counter}%`
        counter++
    }

    themeIssues.forEach(computePoints)
    result.classList.remove('d-none')
    result.style.opacity = 1
    scrollTo(0,0)
    
    const timer = setInterval(countAnimation, timeAnimation)
}

window.addEventListener('load', () => {
    renderThemes()
    renderQuestionsAndAnswers()
})
form.addEventListener('submit', showResult)
selectThemes.addEventListener('change', renderQuestionsAndAnswers)
result.querySelector('button').addEventListener('click', closeResult)
