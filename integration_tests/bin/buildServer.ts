#!/usr/bin/env yarn run ts-node

import process from "process";
import { exec } from "child_process";
import path from "path";
import { promisify } from "util";

const execPromise = promisify(exec);

const rootPath = path.join(__dirname, "..", "..");
const dockerfilePath = path.join(__dirname, "..", "application", "Dockerfile");
const dockerImageName = "podcast-integration-test-app";

const command = `docker build -f ${dockerfilePath} -t ${dockerImageName} .`;

execPromise(command, { cwd: rootPath })
  .then(() => {
    console.log("Image build successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
