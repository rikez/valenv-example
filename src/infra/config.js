const joi = require("joi");
const dotenv = require("dotenv");
const VError = require("verror");

/**
 * @typedef {Object} EnvConfig
 * @property {string} APP_NAME - The name of the current service/application
 * @property {number} HTTP_SERVER_PORT - The port the http server should listen to.
 * @property {string} MONGO_CONNECTION - The connection string to connect to MongoDB
 * @property {string} LOG_LEVEL - The log level to start logging from
 */

const schema = joi
  .object({
    APP_NAME: joi.string().default("your-service-name"),
    HTTP_SERVER_PORT: joi.number().required(),
    MONGO_CONNECTION: joi.string().required(),
    LOG_LEVEL: joi
      .string()
      .default("info")
      .allow("trace", "debug", "info", "warn", "error", "fatal"),
  })
  .required();

/**
 * Reads the environemnts variables and validates according to the definition
 * @throws {ValidationFailed} Will throw an error if the env variables are not properly provided
 * @returns {EnvConfig} Returns the validated environment variables
 */
function getConfig() {
  if (process.env.NODE_ENV != "test") {
    // Applicable when using a .env file
    dotenv.config();
  }

  const config = {
    APP_NAME: process.env.APP_NAME,
    HTTP_SERVER_PORT: process.env.HTTP_SERVER_PORT,
    MONGO_CONNECTION: process.env.MONGO_CONNECTION,
    LOG_LEVEL: process.env.LOG_LEVEL,
  };

  const result = schema.validate(config, { abortEarly: false });
  if (result.error) {
    throw new VError(result.error, "Failed to validate the env variables");
  }

  return result.value;
}

module.exports = { getConfig };
