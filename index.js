const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');
const fs = require('fs').promises;

const octokit = github.getOctokit(core.getInput('github-token'));

async function run() {
  try {
    const version = await readVersion();
    if (version === 'independent') {
      await publishIndependent();
    } else {
      const [owner, repo] = core.getInput('repository').split('/');
      const commitish = core.getInput('commitish');
      const name = core.getInput('name');
      const body = core.getInput('body');
      const draft = core.getInput('draft');
      const prerelease = core.getInput('prerelease');
      await publishFixed({
        version,
        owner,
        repo,
        commitish,
        name,
        body,
        draft,
        prerelease,
      });
    }
  } catch (e) {
    core.setFailed(e);
  }
}

async function publishFixed({
  version,
  owner,
  repo,
  commitish,
  name,
  body,
  draft,
  prerelease,
}) {
  // Publish packages
  exec.exec('npx lerna publish from-package --yes');

  // Create a Github release
  await octokit.repos.createRelease({
    owner,
    repo,
    tag_name: `v${version}`,
    target_commitish: commitish,
    name,
    body,
    draft,
    prerelease,
  });
}

async function publishIndependent() {
  // not implemented yet
  throw new Error('Lerna independent mode is not yet supported.');
}

async function readVersion() {
  const contents = await fs.readFile('./lerna.json');
  const version = JSON.parse(contents).version;
  if (version != null) {
    return version;
  } else {
    throw new Error('Missing version field in lerna.json file');
  }
}

run();
