const readlineSync = require('readline-sync');
const chalk = require('chalk');

//Defined constants
const getAnswer = readlineSync.question;
const correct = chalk.bold.green;
const incorrect = chalk.bold.red;
const nameBg = chalk.greenBright;
const newGameBg = chalk.bold.yellowBright;
const infoBg = chalk.bold.cyan;
const scoreBg = chalk.bold.blueBright;
const buttonBg = chalk.bgGreen.white;
const log = console.log;

//Default value initialization
let score = 0;
let userName = '';
let questionsAnswersList = [];

//Questions list
let questionsList = [
  '\n(1) What is his surname? ',
  '\n(2) Where does he live currently? ',
  '\n(3) What\'s his current profession? ',
  '\n(4) In which month was he born? ',
  '\n(5) How old is he? ',
  '\n(6) He prefers Marvel or DC? ',
  '\n(7) What\'s his favourite colour? ',
  '\n(8) What\'s his favourite sport? ',
  '\n(9) What\'s his favourite web series? ',
  '\n(10) What is he afraid of? ',
];

//Answers list
let answersList = [
  'balamurali',
  'lucknow',
  'software engineer',
  'november',
  '24',
  'marvel',
  'red',
  'cricket',
  'breaking bad',
  'nothing',
];

//List of high scorers
let highScores = [
  {
    name: 'Gautam',
    score: 10
  },
  {
    name: 'Sherlock',
    score: 8
  },
  {
    name: 'Heisenberg',
    score: 7
  },
];

//Function to capitalize the first letter of a string
function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

//Mapping of questions with answers
function loadQuestionsAndAnswers() {
  for (let i = 0; i < questionsList.length; i++) {
    questionsAnswersList.push({ question: questionsList[i], answer: answersList[i] });
  }
}

//Function to display welcome message
function welcome() {
  let inputName = capitalizeFirstLetter(getAnswer('Namaste!\nWhat is your name?\t', {
    defaultInput: 'nobody'
  }));
  userName = nameBg(inputName);
  log(`\nHello ${userName}, let's play a game on how well do you know ${nameBg('Gautam')}!`);
  log('\nThe rules are simple. There will be 10 questions and for each correct answer you will be rewarded with 1 point.');
}

//Function to start the quiz game
function playQuizGame() {
  log(`\n${newGameBg('Let the Game Begin!')}`);
  log('---------------------');
  log(`\n${infoBg('Round 1 begins!')}`);
  score = 0;
  questionsAnswersList.forEach((currentQues) => checkAnswer(currentQues.question, currentQues.answer));
}

//Function to check the prompt answer with the correct answer
function checkAnswer(question, answer) {
  if (question === questionsList[2]) {
    log(`\n${infoBg('Round 2 begins!')}`);
  } else if (question === questionsList[5]) {
    log(`\n${infoBg('Round 3 begins!')}`);
  } else if (score === 8) {
    log(`\n${infoBg('Great going! Keep it up!')}`);
  }

  let inputAnswer = getAnswer(question);

  if (inputAnswer.toLowerCase() === answer) {
    score++;
    log(`\n${correct('Yes, you are correct!')}`);
  } else {
    log(`\n${incorrect('No, you are incorrect!')}`);
  }

  log(`\nCurrent Score : ${scoreBg(score)}`);
  log('-------------------------');
}

//Function to display user score
function displayUserScore() {
  log(`\n${userName}, your total score is ${scoreBg(score)}.`);
  if (score > 7) {
    log('Woah! You nailed it. That\'s a new high score!');
  }
}

//Function to display high scores
function displayHighScores() {
  log('\nCheck out this high scores grid. If you think your name should be there mail the screenshot of your score to gtmbalamurali@gmail.com and I\'ll update it ASAP!');
  log('\n-------------');
  log('Name : Score');
  log('-------------');
  highScores.forEach((player) => log(`${player.name} : ${player.score}`));
}

//Function to play the game again
function playAgain() {
  let answer = readlineSync.keyInYN('\nDo you wish to play again?');
  if (answer) {
    playQuizGame();
    displayUserScore();
    displayHighScores();
    playAgain();
  }
  else {
    log(`\n${newGameBg(`If you wish to play again go to the top right corner of the screen and click on the ${buttonBg('Run')} button or you can simply just reload the page. Thank you!`)}`);
  }
}

loadQuestionsAndAnswers();
welcome();
playQuizGame();
displayUserScore();
displayHighScores();
playAgain();