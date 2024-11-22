import axios from "axios";
import { fork } from "child_process";
import { promises as fs } from "fs";
import path from "path";
import { formatCode, removeDirectory, removeFile } from "./utils";

const SPEC_URL = "http://localhost:4000/swagger-json";
const OUTPUT_DIRECTORY = path.resolve(__dirname, "../bifrost_builder/src/api/generated");

async function fetchOpenApiSpecification() {
  console.log("Fetching OpenAPI specification...");
  const response = await axios.get(SPEC_URL);
  const filePath = path.resolve(__dirname, "./spec.json");

  console.log(`Writing Open API Specification to filePath: '${filePath}'`);
  await fs.writeFile(filePath, JSON.stringify(response.data), "utf8");
}

async function generateApiClient() {
  await fetchOpenApiSpecification();

  console.log("Generating Services and Types...");
  await new Promise((resolve, reject) => {
    const process = fork(
      path.resolve(__dirname, "./node_modules/.bin/openapi-generator-cli"),
      ["generate"],
      { stdio: [0, "pipe", 2, "ipc"] }
    );

    process.stdout?.resume();
    let output = "";

    process.stdout?.on("data", (data) => {
      output += data;
    });

    process.on("close", (exitCode) => {
      if (exitCode === 0) resolve(exitCode);
      reject(new Error(output));
    });
  });

  console.log("Removing Unnecessary Files...");
  await Promise.all([
    removeFile(path.resolve(__dirname, "./spec.json")),
    removeFile(path.resolve(OUTPUT_DIRECTORY, "./.gitignore")),
    removeFile(path.resolve(OUTPUT_DIRECTORY, "./.npmignore")),
    removeFile(path.resolve(OUTPUT_DIRECTORY, "./.openapi-generator-ignore")),
    removeFile(path.resolve(OUTPUT_DIRECTORY, "./git_push.sh")),
    removeDirectory(path.resolve(OUTPUT_DIRECTORY, "./.openapi-generator")),
  ]);

  console.log("Formatting Generated Code...");
  await formatCode(`${OUTPUT_DIRECTORY}/**/*.{js,jsx,ts,tsx}`);
  console.log("Done! 🎉");
}

generateApiClient();
