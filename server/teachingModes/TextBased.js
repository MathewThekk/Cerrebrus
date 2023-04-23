const TeachingModeAbstract = require('./factories/TeachingModeAbstract');

class TextBased extends TeachingModeAbstract {
  teach() {
    console.log('Teaching through a Written Tutorial.');
  }
}

module.exports = TextBased;
