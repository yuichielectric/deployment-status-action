import * as core from "@actions/core";
import * as github from "@actions/github";
import { ReposCreateDeploymentStatusParams } from "@octokit/rest";

async function run() {
  const token = process.env["GITHUB_TOKEN"];
  if (token === undefined) {
    core.setFailed("GITHUB_TOKEN environment variable is required.");
    return;
  }
  const octokit = new github.GitHub(token);
  const context = github.context;
  const deploymentId = parseInt(
    core.getInput("deployment_id", { required: true }),
    10
  );
  const state = core.getInput("state", {
    required: true
  }) as ReposCreateDeploymentStatusParams["state"];

  const targetUrl = core.getInput("target_url");
  try {
    octokit.repos.createDeploymentStatus({
      ...context.repo,
      deployment_id: deploymentId,
      state: state,
      target_url: targetUrl
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
