const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: ['./client', './pages'],
    prependData: `@import 'client/resources/styles/colors';
@import 'client/resources/styles/mixins';
@import 'client/resources/styles/variables';`,
  },
}
