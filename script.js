const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

const quiz = [

    {
        question:"Q. which of the following is not a CSS box model property?",
        choices:["margin", "padding", "border-box", "border-collapse"],
        answer:"border-collapse"
    },

    {
        question:"Q. which of the following is not a valid way to declare a function in javascript?",
        choices:["function myFunction() {}", "let myFunction() {};", "myFunction() {};", "const myFunction = () => {};"],
        answer:"myFunction: function() {}"
    },

    {
        question:"Q. which of the following is not a Javascript data type?",
        choices:["string", "boolean", "object", "float"],
        answer:"float" 
    },

    {
        question:"Q. what is the purpose of the this keyword in javascript?",
        choices:["It refers to the current function", "It refers to the current object", "It refear to the parent object", "It is used to comments"],
        answer:"It refears to the current object"
    }

];

//GLOBAL VARIABLE
let currentQuestionIndex = 0; //to maintain index of array of object
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerId = null;

// FUNCTION TO SHOW NEXT QUESTION
const showQuestions = ()=>{
    const questionDetails = quiz[currentQuestionIndex]; // this is for quiz's array of starting object index
    questionBox.textContent = questionDetails.question; // to show question in question div

    choicesBox.textContent= "";  // this is going to blank when load this function again to not repeat all four option again
    for(let i=0; i<questionDetails.choices.length; i++){ // to show option dynamically one by one
        const currentChoice = questionDetails.choices[i]; // to show every option one by one dinamicallu
        const choiceDiv = document.createElement ('div'); // to store options of qution one by one
        choiceDiv.textContent = currentChoice; // one by one options going in to this div by loop
        choiceDiv.classList.add('choice'); //added class list to style all four option div
        choicesBox.appendChild(choiceDiv); // added this div in to main option div 

        choiceDiv.addEventListener('click', ()=>{  // added classlist in all four option div
            if(choiceDiv.classList.contains('selected')){  // to select option added class list 
                choiceDiv.classList.remove('selected');
            }
            else{
                choiceDiv.classList.add('selected');
            }
        });
    }
    if (currentQuestionIndex < quiz.length){
        startTimer();
    }

    
}



// FUNCTION TO CHECK ANSWERS
const checkAnswer = ()=>{
    const selectedChoice = document.querySelector('.choice.selected'); 
    if(selectedChoice.textContent === quiz[currentQuestionIndex].answer){
        
        displayAlert('correct Answer!');
        score++;
    }
    else{
    
        displayAlert(`wrong Anser! ${quiz[currentQuestionIndex].answer} is the correct answer`);
    }
    timeLeft =15;
     currentQuestionIndex++;
    if(currentQuestionIndex < quiz.length){
        
        showQuestions();
    }
    else{
        showScore();
        stopTimer();
        quizOver =true;
        timer.style.display = 'none';
    }
}

// FUNCTION TO SHOW SCROE 
const showScore = ()=>{
    questionBox.textContent = '';
    choicesBox.textContent = '';
    scoreCard.textContent = `You Scored ${score} Out Of ${quiz.length}!`;
    displayAlert('You Have Completed This Quiz')
    nextBtn.textContent ="Play Again";
   
}
// FUNTION TO SHOW ALERT
const displayAlert = (msg)=>{
    alert.style.display = 'block';
    alert.textContent =msg;
    setTimeout(()=>{
        alert.style.display = 'none';
    },2000);

}

// FUNCTION TO START TIMER
const startTimer = ()=>{
    clearInterval(timerId);
    
    timer.textContent = timeLeft;
    const countDown = ()=>{
        timer.textContent = timeLeft;
        timeLeft--;
        if(timeLeft === 0){
            const confirmUser = confirm('Time Up! Do You Want To The Quiz Again?');
            if (confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display ="none";
                return;
            }
        }
    }
   timerId = setInterval(countDown, 1000);

}

// FUNCTION TO STOP TIMER
const stopTimer = ()=>{
    clearInterval(timerId);
}

// FUNCTION TO START QUIZ
const startQuiz = ()=>{
    timeLeft = 15;
    timer.style.display ='flex';
    showQuestions();
}

// ADDING EVENT LISTENER TO START BUTTON
startBtn.addEventListener('click', ()=>{
    startBtn.style.display='none';
    container.style.display="block";
    startQuiz();
});



nextBtn.addEventListener('click',()=>{
    const selectedChoice = document.querySelector('.choice.selected');
    if(!selectedChoice && nextBtn.textContent === "Next"){
        displayAlert('Select Your answer');
        return;
    }

    if(quizOver){
        nextBtn.textContent ="Next";
        scoreCard.textContent = '';
        currentQuestionIndex = 0;
        startQuiz();
        quizOver = false;
        score = 0;
    }

    else{
        checkAnswer();
    }
});
    
    