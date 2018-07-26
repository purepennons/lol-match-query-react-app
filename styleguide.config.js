const path = require('path');

module.exports = {
  require: [path.join(__dirname, 'src/Root.scss')],
  components: 'src/components/**/[A-Z]*.{js,jsx}',
  skipComponentsWithoutExample: true
};
