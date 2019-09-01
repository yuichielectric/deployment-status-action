"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = process.env['GITHUB_TOKEN'];
            if (token == undefined) {
                core.setFailed('GITHUB_TOKEN needs to be passed through environment variable.');
                return;
            }
            const octokit = new github.GitHub(token);
            const context = github.context;
            const deploymentId = parseInt(core.getInput('deployment_id', { required: true }));
            const state = core.getInput('state', { required: true });
            const target_url = core.getInput('target_url');
            octokit.repos.createDeploymentStatus(Object.assign({}, context.repo, { deployment_id: deploymentId, state: state, target_url: target_url }));
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
