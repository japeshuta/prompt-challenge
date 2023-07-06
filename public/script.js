// Add an async function to make the API call
async function sendAnswerToServer(apiKey, beforeText,afterText) {
    const url = 'http://localhost:3000/endpoint'; // Replace with your server endpoint URL
    
    const data = {
      apiKey: apiKey,
      prePrompt: beforeText,
      postPrompt: afterText
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        const message = await response.text();
              document.getElementById('response').innerText = message;
        console.log('Answer sent to the server successfully.');
      } else {
        console.log('Failed to send the answer to the server.');
      }
    } catch (error) {
      console.log('An error occurred while sending the answer:', error);
    }
  }
  
  function updatePreviewText() {
    var beforeText = document.getElementById('beforeText').value;
    var challengeSentence = document.getElementById('challenge').innerText;
    var afterText = document.getElementById('afterText').value;
    var previewText = `${beforeText} ${challengeSentence} ${afterText}`;
  
    document.getElementById('previewText').innerText = previewText;
  }
  
  document.getElementById('beforeText').addEventListener('input', updatePreviewText);
  document.getElementById('afterText').addEventListener('input', updatePreviewText);
  
  const animalChallenge = {
    question: 'Is the following animal a meat eater? If meat eater, output TRUE. If not a meat eater, output FALSE.',
    testConditions: [
      {
        variable: 'Lion',
        answer: true
      },
      {
        variable: 'Elephant',
        answer: false
      },
      {
        variable: 'Tiger',
        answer: true
      },
      {
        variable: 'Giraffe',
        answer: false
      },
      // Add more test conditions here
    ]
  };
  
  document.getElementById('apiKey').addEventListener('blur', function(e) {
    localStorage.setItem('apiKey', e.target.value);
  });
  
  document.getElementById('submit').addEventListener('click', function() {
    var apiKey = localStorage.getItem('apiKey');
    var beforeText = document.getElementById('beforeText').value;
    var challengeSentence = document.getElementById('challenge').innerText;
    var afterText = document.getElementById('afterText').value;
  
    var answer = `${beforeText} ${challengeSentence} ${afterText}`;
  
    console.log(`API Key: ${apiKey}, Answer: ${answer}`);
  
    // Make a call to your API with the answer and API Key here
    sendAnswerToServer(apiKey, beforeText,afterText);
  });
  
  window.onload = function() {
    // Select the grid
    const grid = document.getElementById('grid');
  
    // Get all the children divs
    const divs = Array.from(grid.children);
  
    // Start the counter after the headers
    let counter = 4;
  
    // Iterate over testConditions
    animalChallenge.testConditions.forEach((testCondition, i) => {
      // The div index for variable for each test condition
      const variableDivIndex = counter + 1;
      const answerDivIndex = counter + 2;
  
      // Update the text of variable and answer divs
      divs[variableDivIndex].innerText = testCondition.variable;
      divs[answerDivIndex].innerText = testCondition.answer;
  
      // Update the counter
      counter += 4;
    });
  };
  