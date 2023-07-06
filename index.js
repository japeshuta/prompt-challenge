// Import the express module
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");

// Create an express application
const app = express();

app.use(bodyParser.json());

// Use express.json middleware to parse JSON payloads
app.use(express.json());

// Use express.static middleware to serve static files. Here 'public' is the name of the directory where html files are kept
app.use(express.static('public'))

// When the user requests the root directory ('/'), send back 'index.html'
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.post('/endpoint', async (req, res) => {
  const { apiKey, postPrompt, prePrompt } = req.body;
  const prompt = prePrompt + "\n\n" + postPrompt;

  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 60,
      top_p: 1,
    });

    if (response.data && response.data.choices && response.data.choices.length > 0) {
      res.send(`Response: ${response.data.choices[0].text.trim()}`);
    } else {
      res.send('No response from OpenAI');
    }
  } catch (error) {
    console.error('Error calling OpenAI API: ', error);
    res.status(500).send('Error calling OpenAI API');
  }
});

// Start the server at port 3000
app.listen(3000, () => {
  console.log('App listening on port 3000');
});
