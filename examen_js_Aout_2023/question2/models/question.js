const path = require('node:path');
const { parse } = require('../utils/json');

const jsonDbPath = path.resolve(__dirname, '../data/questions.json');

function selectQuestionsByLevel(level) {
  const questions = parse(jsonDbPath, []);
  const selectedQuestions = questions.filter((question) => question.level === level);
  if (selectedQuestions.length === 3) {
    throw Error('There are not enough questions for this level');
  }
  return selectedQuestions.sort(() => Math.random() - 0.5).slice(0, 3);
}

module.exports = { selectQuestionsByLevel };
