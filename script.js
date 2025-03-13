const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      {text: "Paris", correct: true},
      {text: "Italy", correct: false},
      {text: "Belgium", correct: false},
      {text: "Jerusalem", correct: false},
    ]
  },
  {
    question: "What is the longest river in the world?",
    answers: [
      {text: "Ganga", correct: false},
      {text: "Amazon River", correct: false},
      {text: "Nile", correct: true},
      {text: "Murray River", correct: false},
    ]
  },
  {
    question: "How many bones are there in an adult human body?",
    answers: [
      {text: "216", correct: false},
      {text: "206", correct: true},
      {text: "186", correct: false},
      {text: "196", correct: false},
    ]
  },
  {
    question: "Which country gifted the Statue of Liberty to the USA? ",
    answers: [
      {text: "France", correct: true},
      {text: "Italy", correct: false},
      {text: "England", correct: false},
      {text: "India", correct: false},
    ]
  },
  {
    question: "Who is current Finance Minister of India?",
    answers: [
      {text: "Jaswant Singh", correct: false},
      {text: "Shankarrao B. Chavan", correct: false},
      {text: "P. Chidambaram", correct: false},
      {text: "Nirmala Sitharaman", correct: true},
    ]
  }
];

const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0
let score = 0

function startQuiz(){
  currentQuestionIndex = 0
  score = 0
  nextButton.innerHTML = "Next"
  showQuestion()
}

function showQuestion(){
  resetState()
  let currentQuestion = questions[currentQuestionIndex]
  let questionNo = currentQuestionIndex + 1
  questionElement.innerHTML = questionNo + ". " + currentQuestion.
  question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button")
    button.innerHTML = answer.text
    button.classList.add("btn")
    answerButtons.appendChild(button)
    if(answer.correct)
    {
      button.dataset.correct = answer.correct
    }
    button.addEventListener("click", selectAnswer)
  })
}

function resetState(){
  nextButton.style.display = "none"
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild)
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct=== "true"
  if(isCorrect) 
  {
    selectedBtn.classList.add("correct")
    score++
  }
  else
  {
    selectedBtn.classList.add("incorrect")
  }
  Array.from(answerButtons.children).forEach(button  => {
    if(button.dataset.correct === "true") {
      button.classList.add("correct")
    }
    button.disabled = true
  })
  nextButton.style.display = "block"
}

function showScore(){
  resetState()
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
  nextButton.innerHTML = "Play Again"
  nextButton.style.display = "block"
}
function handleNextButton(){
  currentQuestionIndex++
  if(currentQuestionIndex < questions.length)
  {
    showQuestion()
  }
  else
  {
    showScore()
  }

}
nextButton.addEventListener("click", () =>{
  if(currentQuestionIndex < questions.length)
  {
    handleNextButton()
  }
  else
  {
    startQuiz()
  }
})
startQuiz()