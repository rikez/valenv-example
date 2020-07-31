const pino = require("pino");

const logger = pino({
  level: "info",
  enabled: true,
});

/**
 * Configures a new instance of logger
 * @param {string} name
 * @param {string} level
 */
function configureLogger(name, level) {
  logger.level = level;
  logger.name = name;
}

module.exports = {
  configureLogger,
  logger,
};
