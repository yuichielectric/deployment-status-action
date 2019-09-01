import * as core from '@actions/core';
import * as github from '@actions/github';
import { ReposCreateDeploymentStatusParams } from '@octokit/rest';

async function run() {
  try {
    const token = process.env['GITHUB_TOKEN'];
    if (token == undefined) {
      core.setFailed('GITHUB_TOKEN needs to be passed through environment variable.');
      return;
    }
    const octokit = new github.GitHub(token);
    const context = github.context;
    const deploymentId = parseInt(core.getInput('deployment_id', {required: true}));
    const state = core.getInput('state', {required: true}) as ReposCreateDeploymentStatusParams["state"];

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
