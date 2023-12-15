document.addEventListener('DOMContentLoaded', function() {
    let questions = [];
    const startButton = document.getElementById('start');
    const submitButton = document.getElementById('submit');
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');

    startButton.addEventListener('click', function() {
        fetch('questions.json')
            .then(response => response.json())
            .then(loadedQuestions => {
                questions = loadedQuestions;
                displayQuiz(questions);
                startButton.style.display = 'none'; // הסתרת כפתור ההתחלה
                submitButton.style.display = 'block'; // הצגת כפתור ההגשה
            });
    });

    submitButton.addEventListener('click', function() {
        const userAnswers = getUserAnswers(questions.length);
        const numCorrect = checkAnswers(questions, userAnswers);
        resultsContainer.innerHTML = `קיבלת ${numCorrect} תשובות נכונות מתוך ${questions.length}.`;
        submitButton.style.display = 'none'; // הסתרת כפתור ההגשה
    });
});

function displayQuiz(questions) {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = ''; // ניקוי התוכן הקיים

    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');

        const questionText = document.createElement('h2');
        questionText.textContent = `שאלה ${index + 1}: ${question.question}`;
        questionElement.appendChild(questionText);

        question.options.forEach((option, optIndex) => {
            const label = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'question' + index;
            radio.value = option;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(option));
            questionElement.appendChild(label);
            questionElement.appendChild(document.createElement('br'));
        });

        quizContainer.appendChild(questionElement);
    });
}

function getUserAnswers(numQuestions) {
    let userAnswers = [];
    for (let i = 0; i < numQuestions; i++) {
        const selectedOption = document.querySelector(`input[name='question${i}']:checked`);
        userAnswers.push(selectedOption ? selectedOption.value : null);
    }
    return userAnswers;
}

function checkAnswers(questions, userAnswers) {
    let correctCount = 0;
    questions.forEach((question, index) => {
        if (userAnswers[index] === question.answer) {
            correctCount++;
        }
    });
    return correctCount;
}
