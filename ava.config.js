export default {
  concurrency: 5,
  failFast: true,
  timeout: "10s",
  failWithoutAssertions: false,
  environmentVariables: {},
  verbose: true,
  nodeArguments: ["--trace-deprecation", "--napi-modules"],
};
