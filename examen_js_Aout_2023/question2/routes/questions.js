// eslint-disable-next-line import/no-unresolved
const express = require('express');
const questions = require('../data/questions.json');
const {
  selectQuestionsByLevel,
} = require('../models/question');

const router = express.Router();

router.get('/games/start', (req, res) => {
  try {
    let selectedQuestions;
    if (req.query.level) {
      selectedQuestions = selectQuestionsByLevel(req.query.level);
    } else {
      selectedQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 3);
    }
    res.json(selectedQuestions.map((question) => ({
      id: question.id,
      title: question.title,
      level: question.level,
      answers: question.answers.map((answer) => ({
        title: answer.title,
        iCorrect: answer.isCorrect,
      })),
    })));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
