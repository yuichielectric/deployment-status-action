import * as core from '@actions/core';
import * as github from '@actions/github';
import { ReposCreateDeploymentStatusParams } from '@octokit/rest';

async function run() {
  try {
    const token = process.env['GITHUB_TOKEN'];
    if (token == undefined) {
      return;
    }
    const octokit = new github.GitHub(token);
    const context = github.context;
    const deploymentId = parseInt(core.getInput('deployment_id'));
    if (deploymentId == undefined) {
      return;
    }
    const state = core.getInput('state') as ReposCreateDeploymentStatusParams["state"];
    if (state == undefined) {
      return;
    }
    const target_url = core.getInput('target_url');
    octokit.repos.createDeploymentStatus({
      ...context.repo,
      deployment_id: deploymentId,
      state: state,
      target_url: target_url
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
