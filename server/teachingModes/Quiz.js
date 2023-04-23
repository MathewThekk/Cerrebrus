const TeachingModeAbstract = require('./factories/TeachingModeAbstract');

class Quiz extends TeachingMethod {
  teach() {
    console.log('Teaching through a Quiz.');
  }
}

module.exports = Quiz;
