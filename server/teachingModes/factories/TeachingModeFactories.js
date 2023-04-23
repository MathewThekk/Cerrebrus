const Quiz = require('../Quiz.js');
const TextBased = require('../TextBased.js');
const CaseStudy = require('..CaseStudy.js');
const Interactive = require('..Interactive.js');

class TeachingMethodFactory {
  createTeachingMethod(type) {
    switch (type) {
      case 'quiz':
        return new Quiz();
      case 'textBased':
        return new TextBased();
      case 'caseStudy':
        return new CaseStudy();
      case 'interactive':
        return new Interactive();
      default:
        throw new Error('Invalid teaching method type.');
    }
  }
}

module.exports = TeachingMethodFactory;
