
// Add an async function to make the API call
async function sendAnswerToServer(apiKey, beforeText,afterText,animalChallenge) {
   // Change the button text to "Loading..."
   let submitButton = document.getElementById('submit');
   submitButton.textContent = "Loading...";
   submitButton.disabled = true;
  const url = 'https://prompt-challenege.onrender.com/endpoint'; 
    
  const data = {
    apiKey: apiKey,
    prePrompt: beforeText,
    postPrompt: afterText,
    tests: animalChallenge
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // Change the button text back to "Submit"
    submitButton.textContent = "Submit";
    submitButton.disabled = false;

    if (response.ok) {
      const answers = await response.json();

      answers.forEach((answer, i) => {
        const answerDiv = document.getElementById('answer' + (i + 1 + challengeIndex * animalChallenge[0].testConditions.length));
        answerDiv.textContent = answer;
        
      });

      compareAnswers(challengeIndex);

      console.log('Answer sent to the server successfully.');
    } else {
      console.log('Failed to send the answer to the server.');
    }
  } catch (error) {
    // Change the button text back to "Submit" in case of error
    submitButton.textContent = "Submit";
    submitButton.disabled = false;
    console.log('An error occurred while sending the answer:', error);
  }
}

function updatePreviewText() {
  var beforeText = document.getElementById('beforeText').value;
  var challengeSentence = document.getElementById('challenge').innerText;
  var afterText = document.getElementById('afterText').value;
  var previewText = `${beforeText} ${challengeSentence} \n\n ${afterText}`;

  document.getElementById('previewText').innerText = previewText;
}

document.getElementById('beforeText').addEventListener('input', updatePreviewText);
document.getElementById('afterText').addEventListener('input', updatePreviewText);


const animalChallenge = [
  {
    question: 'Reformat the following',
    testConditions: [
      {
        variable: 'March 6th 2014',
        answer: "03/06/2014"
      },
      {
        variable: '20230704',
        answer: '07/04/2023'
      },
      {
        variable: 'the fifth of october 2011',
        answer: '10/05/2011'
      },
      {
        variable: '2001 1st of may',
        answer: '05/01/2001'
      },
      {
        variable: 'Trip Trap',
        answer: 'Not a Date'
      }
    ]
  },
  {
    question: 'Reformat the following',
    testConditions: [
      {
        variable: 'July 23rd 1995',
        answer: '07/23/1995'
      },
      {
        variable: '2030 12 july',
        answer: '07/12/2030'
      },
      {
        variable: 'the second of january 2040',
        answer: '01/02/2040'
      },
      {
        variable: '2080 15th of june',
        answer: '06/15/2080'
      },
      {
        variable: 'Tik Tok',
        answer: 'Not a Date'
      }
    ]
  },
  {
    question: 'Reformat the following',
    testConditions: [
      {
        variable: 'December 9th 2002',
        answer: '12/09/2002'
      },
      {
        variable: '20250812',
        answer: '08/12/2025'
      },
      {
        variable: 'the eighteenth of february 1998',
        answer: '02/18/1998'
      },
      {
        variable: '2010 31st of october',
        answer: '10/31/2010'
      },
      {
        variable: 'Plop Plip',
        answer: 'Not a Date'
      }
    ]
  }
  ,{
  "question": "Change the list of 1 words into format like {apples:{Dogs:“People”}}",
  "testConditions": [
    {
      "variable": "Apples People Dogs",
      "answer": "{Apples:{Dogs:“People”}}"
    },
    {
      "variable": "Variable-1 Variable-2 Variable-3",
      "answer": "{Variable-1:{Variable-3:“Variable-2”}}"
    },
    {
      "variable": "myTeam 15 numberOfPeople",
      "answer": "{myTeam:{numberOfPeople:15}}"
    },
    {
      "variable": "robot true isRed",
      "answer": "{robot:{isRed:true}}"
    },
    {
      "variable": "Address 1238 Wilmer Street",
      "answer": "{Address:{Street:“1238 Wilmer”}}"
    }]},
    {
      "question": "Shift the speadsheet cell down and right 1 cell",
      "testConditions": [
        {
          "variable": "f4",
          "answer":"g5" 
        },
        {
          "variable": "a1",
          "answer": "b2"
        },
        {
          "variable": "h11",
          "answer": "i12"
        },
        {
          "variable": "g6",
          "answer": "h7"
        },
        {
          "variable": "b1",
          "answer": "c2"
        }
    ]
    },
    {
      "question": "Shift the speadsheet cell up and left 1 cell",
      "testConditions": [
        {
          "variable": "b99",
          "answer":"a98" 
        },
        {
          "variable": "h4",
          "answer": "g3"
        },
        {
          "variable": "j88",
          "answer": "i87"
        },
        {
          "variable": "f23",
          "answer": "e22"
        },
        {
          "variable": "g2",
          "answer": "f1"
        }
    ]
    },{
      "question": "Change from men's to women's name version",
      "testConditions": [
        {
          "variable": "George",
          "answer":"Georgia" 
        },
        {
          "variable": "Felix",
          "answer": "Felicia"
        },
        {
          "variable": "Claude",
          "answer": "Claudia"
        },
        {
          "variable": "Alexander",
          "answer": "Alexandra"
        },
        {
          "variable": "Eric",
          "answer": "Erica"
        }
    ]
    },{
      "question": "Animal Sounds",
      "testConditions": [
        {
          "variable": "Sheep",
          "answer":"Baa" 
        },
        {
          "variable": "Dog",
          "answer": "Bark"
        },
        {
          "variable": "Horse",
          "answer": "Neigh"
        },
        {
          "variable": "Cat",
          "answer": "Moew"
        },
        {
          "variable": "Bird",
          "answer": "Chirp"
        }
    ]
    },{
      "question": "How many Legs?",
      "testConditions": [
        {
          "variable": "Dog",
          "answer":"4" 
        },
        {
          "variable": "Cat",
          "answer": "4"
        },
        {
          "variable": "Monkey",
          "answer": "2"
        },
        {
          "variable": "Centipede",
          "answer": "100"
        },
        {
          "variable": "Octopus",
          "answer": "8"
        }
    ]
    }
];




document.getElementById('apiKey').addEventListener('blur', function(e) {
  localStorage.setItem('apiKey', e.target.value);
});

//const challengeIndex = 1;  // Change this variable to use a different challenge
const challengeIndex = Math.floor(Math.random() * animalChallenge.length);

window.onload = function () {
  loadChallenge(challengeIndex);
}


document.getElementById('submit').addEventListener('click', function() {
  var apiKey = localStorage.getItem('apiKey');
  var beforeText = document.getElementById('beforeText').value;
  var challengeSentence = document.getElementById('challenge').innerText;
  var afterText = document.getElementById('afterText').value;

  var answer = `${beforeText} ${challengeSentence} \n\n ${afterText}`;

  console.log(`API Key: ${apiKey}, Answer: ${answer}`);

  sendAnswerToServer(apiKey, beforeText,afterText,[animalChallenge[challengeIndex]]);
});


function compareAnswers(challengeIndex) {
  const grid = document.getElementById('grid');
  const divs = Array.from(grid.children);

  for (let i = 0; i < animalChallenge[challengeIndex].testConditions.length; i++) {
    const answerIndex = i * 4 + 2;
    const userAnswerIndex = i * 4 + 3;

    if (divs[answerIndex].textContent == divs[userAnswerIndex].textContent) {
      colorRow(i, 'green');
    } else {
      colorRow(i, 'red');
    }
  }

  const testConditions = animalChallenge[challengeIndex].testConditions;
  let correctAnswers = 0;

  testConditions.forEach((testCondition, i) => {
    const answerDiv = document.getElementById('answer' + (i + 1 + challengeIndex * testConditions.length));
    
    if (answerDiv.textContent == testCondition.answer) {
      answerDiv.className = 'correct-answer';
      correctAnswers++;
    } else {
      answerDiv.className = 'incorrect-answer';
    }
  });

  // If all answers are correct
  if (correctAnswers == testConditions.length) {
    playAnimation();
    resetGame();
  }
  
}

function colorRow(rowIndex, color) {
  const grid = document.getElementById('grid');
  const divs = Array.from(grid.children);

  for (let i = 0; i < 4; i++) {
    const divIndex = rowIndex * 4 + i;
    divs[divIndex].style.backgroundColor = color;
  }
}

function playAnimation() {
  document.body.classList.add('explosion-one');

  // Remove the class after the animation has played
  setTimeout(() => {
    document.body.classList.remove('explosion-one');
  }, 5000);
}
function resetGame() {
  // Reset the challenge index to a random value
  challengeIndex = Math.floor(Math.random() * animalChallenge.length);

  // Clear all inputs
  document.getElementById('beforeText').value = '';
  document.getElementById('afterText').value = '';

  // Load new challenge
  loadChallenge(challengeIndex);
}


function loadChallenge(challengeIndex) {
  const grid = document.getElementById('grid');
  const question = document.getElementById('question');

  // Clear existing grid elements
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

  question.innerText = animalChallenge[challengeIndex].question;
  animalChallenge[challengeIndex].testConditions.forEach((testCondition, i) => {
    const variableDivIndex = challengeIndex * animalChallenge[challengeIndex].testConditions.length * 4 + i * 4 + 1;
    const answerDivIndex = challengeIndex * animalChallenge[challengeIndex].testConditions.length * 4 + i * 4 + 2;

    const testNumberDiv = document.createElement('div');
    const variableDiv = document.createElement('div');
    const answerDiv = document.createElement('div');
    const yourAnswerDiv = document.createElement('div');

    testNumberDiv.textContent = i + 1 + challengeIndex * animalChallenge[challengeIndex].testConditions.length;
    variableDiv.textContent = testCondition.variable;
    answerDiv.textContent = testCondition.answer;
    yourAnswerDiv.id = 'answer' + (i + 1 + challengeIndex * animalChallenge[challengeIndex].testConditions.length);

    grid.appendChild(testNumberDiv);
    grid.appendChild(variableDiv);
    grid.appendChild(answerDiv);
    grid.appendChild(yourAnswerDiv);
  });
}
