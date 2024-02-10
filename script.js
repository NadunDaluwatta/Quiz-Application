const questions = [
    { question: "What is the capital of Sri lanka?", choices: ["Kandy", "Sri Jayawardenapura Kotte", "Anuradhapura", "Galle"], correct: 2 },
    { question: "Who is the president of Sri Lanka?", choices: ["Mahinda Rajapaksha", "Sarath Fonseka", "Ranil Wickramasinghe", "Namal Rajapaksha"], correct: 2 },
    { question: "Who wrote 'Madolduwa'?", choices: ["Martin Wickramasinghe", "Kumarathunga Munidasa", "W.D.Amaradewa", "Sunil Edirisinghe"], correct: 0 },
    { question: "What is the longest Town in the Sri Lanka?", choices: ["Kegalle", "Matale", "Polonnaruwa", "Gampaha"], correct: 0 },
    { question: "What is the tallest mountain in the Sri Lanka?", choices: ["Namunukula", "Piduruthalagala", "Adems'Peek", "Thoppigala"], correct: 1 }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let answersSelected = new Array(questions.length);
  
  const questionContainer = document.getElementById('question');
  const choicesContainer = document.getElementById('choices');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const submitButton = document.getElementById('submit');
  const resultsContainer = document.getElementById('results');
  const scoreContainer = document.getElementById('score');
  
  function showQuestion(index) {
    // clear previous choices
    choicesContainer.innerHTML = '';
  
    // question text
    questionContainer.textContent = `Q${index + 1}: ${questions[index].question}`;
  
    // Display choices
    questions[index].choices.forEach((choice, i) => {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.textContent = choice;
      button.addEventListener('click', function() { selectAnswer(i, index, button); });
      li.appendChild(button);
      choicesContainer.appendChild(li);
  
      // highlight the selected button
      if (answersSelected[index] === i) {
        button.classList.add('selected');
      }
    });
  
    // button states
    prevButton.disabled = index === 0;
    nextButton.disabled = index === questions.length - 1;
  }
  
  function selectAnswer(choice, questionIndex, button) {
    
    document.querySelectorAll('#choices button').forEach(btn => {
      btn.classList.remove('selected');
    });
  
    
    button.classList.add('selected');
  
    // save the answer
    answersSelected[questionIndex] = choice;
  
    // enable the next button 
    nextButton.disabled = false;
  }
  
  function showResults() {
    // calculate the score and identify incorrect questions
    let incorrectAnswers = [];
    answersSelected.forEach((answer, index) => {
      if (answer === questions[index].correct) {
        score++;
      } else {
        incorrectAnswers.push(index);
      }
    });
  
    questionContainer.style.display = 'none';
    choicesContainer.style.display = 'none';
    prevButton.style.display = 'none';
    nextButton.style.display = 'none';
    submitButton.style.display = 'none';
    
  
    // display the results and the incorrect answers with the correct answers
    resultsContainer.style.display = 'block';
    scoreContainer.textContent = `${score} out of ${questions.length}`;
  
    if (incorrectAnswers.length > 0) {
      const details = document.createElement('div');
      details.innerHTML = `<h3>You got ${incorrectAnswers.length} question(s) wrong. Here are the correct answers:</h3>`;
      incorrectAnswers.forEach((index) => {
        const questionTitle = document.createElement('h4');
        questionTitle.textContent = questions[index].question;
        const correctAnswer = document.createElement('div');
        correctAnswer.textContent = `Correct answer: ${questions[index].choices[questions[index].correct]}`;
        details.appendChild(questionTitle);
        details.appendChild(correctAnswer);
      });
      resultsContainer.appendChild(details);
    }
  }
  
  prevButton.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion(currentQuestionIndex);
    }
  });
  
  nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      showQuestion(currentQuestionIndex);
    } else {
      // enable the submit button
      submitButton.disabled = false;
    }
  });
  
  submitButton.addEventListener('click', () => {
    // check all questions are answerd
    if (answersSelected.length === questions.length && !answersSelected.includes(undefined)) {
      showResults();
    } else {
      alert('Please answer all the questions before submitting.');
    }
  });
  


  showQuestion(currentQuestionIndex);
  