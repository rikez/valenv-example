const test = require("ava");

const { getConfig } = require("../../src/infra/config.js");

test("Should fail to get the config", (t) => {
  try {
    getConfig();
    t.fail();
  } catch (err) {
    t.pass();
  }
});

test("Should get the config", (t) => {
  try {
    process.env.HTTP_SERVER_PORT = 9000;
    process.env.LOG_LEVEL = "info";
    process.env.APP_NAME = "test-app";
    process.env.MONGO_CONNECTION = "mongodb://localhost:27017/example";

    const cfg = getConfig();
    t.pass();

    t.is(Number(process.env.HTTP_SERVER_PORT), cfg.HTTP_SERVER_PORT);
    t.is(process.env.LOG_LEVEL, cfg.LOG_LEVEL);
    t.is(process.env.APP_NAME, cfg.APP_NAME);
    t.is(process.env.MONGO_CONNECTION, cfg.MONGO_CONNECTION);
  } catch (err) {
    t.fail(err);
  }
});

test("Should fail to validate the config", (t) => {
  try {
    process.env.HTTP_SERVER_PORT = 9000;
    process.env.LOG_LEVEL = "info";
    process.env.APP_NAME = "test-app";

    getConfig();
  } catch (err) {
    t.fail(err);
  }
});
