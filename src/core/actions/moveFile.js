const fs = require('fs');
const glob = require('glob');
const path = require('path');
const { validateBrowser } = require('../../utils/validate');
const logger = require('../../utils/logger');
const { MESSAGE_TYPE } = require('../../constants');

module.exports = async (state, context) => {
  validateBrowser(state);

  try {
    const { source, destination } = context.args;

    const files = glob.sync(source);

    files.forEach((x) => {
      const fileName = path.basename(x);
      const destinationPath = path.join(destination, fileName);
      fs.renameSync(x, destinationPath);
    });
  } catch (error) {
    return logger.emitLogs({ message: error.message, type: MESSAGE_TYPE.ERROR });
  }
};
