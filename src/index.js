const { MongoClient } = require("mongodb");

const { getConfig } = require("./infra/config");
const { configureLogger, logger } = require("./infra/logger");
const assert = require("assert");

/**
 * Application entrypoint
 */
async function init() {
  try {
    // Read environment variables and distribute them to the modules
    const cfg = getConfig();

    configureLogger(cfg.APP_NAME, cfg.LOG_LEVEL);

    logger.info("Starting %s", cfg.APP_NAME);

    const mongoClient = await new MongoClient(cfg.MONGO_CONNECTION, {
      useUnifiedTopology: true,
    });
    mongoClient.on("error", (err) => {
      logger.fatal({ err }, "Unexpected error on mongo connection");
      // Handle err: Reconnect, Stop service?
    });
    await mongoClient.connect();

    const exampleDb = mongoClient.db("example");

    const users = [
      {
        request_id: "fbcfb019-9a9c-4f66-8fa5-d03971935c15",
        name: "ABC",
      },
      {
        request_id: "7529132c-b8f3-48f7-8457-ff96b097870f",
        name: "XYZ",
      },
    ];

    // Insert some data
    const result = await exampleDb.collection("users").insertMany(users);
    assert.equal(result.insertedCount, 2);

    logger.info({ result }, "Inserted the users");
  } catch (err) {
    logger.fatal({ err }, "Failed to initialize the service");
    process.exit(1);
  }
}

init();
