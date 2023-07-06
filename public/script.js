
// Add an async function to make the API call
async function sendAnswerToServer(apiKey, beforeText,afterText,animalChallenge) {
   // Change the button text to "Loading..."
   let submitButton = document.getElementById('submit');
   submitButton.textContent = "Loading...";
   submitButton.disabled = true;
  const url = 'http://localhost:3000/endpoint'; 
    
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
        variable: '20300102',
        answer: '01/02/2030'
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
];




document.getElementById('apiKey').addEventListener('blur', function(e) {
  localStorage.setItem('apiKey', e.target.value);
});

//const challengeIndex = 1;  // Change this variable to use a different challenge
const challengeIndex = Math.floor(Math.random() * animalChallenge.length);

window.onload = function () {
  const grid = document.getElementById('grid');
  const question = document.getElementById('question');

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
};

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
}

function colorRow(rowIndex, color) {
  const grid = document.getElementById('grid');
  const divs = Array.from(grid.children);

  for (let i = 0; i < 4; i++) {
    const divIndex = rowIndex * 4 + i;
    divs[divIndex].style.backgroundColor = color;
  }
}
