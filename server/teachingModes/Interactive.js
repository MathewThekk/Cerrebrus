const TeachingModeAbstract = require('./factories/TeachingModeAbstract');

class Interactive extends TeachingMethod {
  teach() {
    console.log('Teaching through a Interactive.');
  }
}

module.exports = Interactive;
