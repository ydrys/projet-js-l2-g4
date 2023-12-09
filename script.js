
const form = document.getElementById('quiz-form');
const alertBox = document.getElementById('alert');
const questionsContainer = document.getElementById('questions-container');
const reponses = []; // un tableau pour stocker les reponses (answers ) de lutilisateur 

// rechercher les questions du fichier json
fetch('questions.json')
  .then(response => response.json()) 
  .then(contenu => { //contenu represente le contenu de fichier question.json
    contenu.questions.forEach((q, index) => { // on parcoure la liste questions qui est dans contenu 

      // creer lelement qui contiens la question et les reponses possible 
     
      const questionItem = document.createElement('li');
      questionItem.classList.add('question-item');     // on a rajouter une classe pour lelement pour  qu'on puisse modifier son css     
      questionItem.innerHTML = `  
        <div>${q.question}</div>
        <div>
          <ol>
            ${q.options.map(option => `
              <li class="answer-item">
                <label>
                  <input class="answer" type="radio" name="answer-${index + 1}" value="${option.value}">
                  ${option.label}
                </label>
              </li>
            `).join('')}
          </ol>
        </div>
      `; // on a creer le contenu de li (questionItem) en html

      questionsContainer.appendChild(questionItem);   // on ajouter li (questionItem) dans ol de nottre document html
      reponses.push({ correctAnswer: q.correctAnswer }); //on rajoute la reponse correct dans un tableauu (questions)
    });
  });

form.addEventListener('submit', function (event) {    // une fonction qui se declache quand le button submit de form est cliqué 
  event.preventDefault();
  checkAnswers();   
});

function checkAnswers() { 
    resetState();
  const userAnswers = [];
  const answerElements = document.querySelectorAll('.answer:checked');

  answerElements.forEach(answer => {
    userAnswers.push(answer.value);
  });

  let allCorrect = true;
  

  reponses.forEach((q, index) => {
    const userAnswer = userAnswers[index];
    const correctAnswer = q.correctAnswer;

    if (userAnswer !== correctAnswer) {
      allCorrect = false;
      highlightAnswer(questionsContainer.children[index], true);
    } else {
      highlightAnswer(questionsContainer.children[index], false);
    }
  });

  if (allCorrect) {
    showCongratulations();
  } 
}

function highlightAnswer(questionElement, isIncorrect) {
  const answerItems = questionElement.querySelectorAll('.answer-item');

  answerItems.forEach(item => {
    if (isIncorrect) {
      item.style.backgroundColor = '#ffcccc'; // Set background color to red for incorrect answers
    } else {
      item.style.backgroundColor = ''; // Reset background color for correct answers
    }
  });
}

function showCongratulations() {
  alertBox.style.backgroundColor = '#4caf50';
 
  alertBox.style.display = 'block';
}

function resetState() {
  alertBox.style.display = 'none';
  const answerItems = document.querySelectorAll('.answer-item');

  answerItems.forEach(item => {
    item.style.backgroundColor = ''; // Reset background color for all answers
  });
}
