## valenv-example

This repository contains an example on how to validate the environment variables before launching the application.

This practice not only validates the expected inputs, but also presents an alternative to using the global reference `process.env`, which can cause unexpected results in runtime, if not validated.

## Getting Started

### Requirements

- node.js +12.x
- npm +6.x
- docker
- docker-compose

### Try it locally

#### Project Dependencies

```bash
$ npm install
```

#### Exec

We can execute the application without specifying the env variables.

```bash
$ docker-compose up -d
$ npm start
```

You will get exit code equals 1 and errors in the stdout related to the missing variables.

Execute the commands below to launch it successfully:

```bash
$ cp .env.example .env
$ docker-compose up -d
$ npm start
```

## Testing

```bash
$ npm test
```

## What else

For further explanation and other interesting topics, check out my personal webpage: [_ealvarenga.dev_](ealvarenga.dev)
