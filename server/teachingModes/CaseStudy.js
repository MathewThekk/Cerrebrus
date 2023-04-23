const TeachingModeAbstract = require('./factories/TeachingModeAbstract');

class CaseStudy extends TeachingMethod {
  teach() {
    console.log('Teaching through a CaseStudy.');
  }
}

module.exports = CaseStudy;
