const { execSync, exec } = require("child_process");
const core = require('@actions/core');
const github = require('@actions/github');

try {
    execSync('brew install mint');
    execSync('mint install fortmarek/tapestry@feature/github_release --force');
    const tag = execSync('git describe --tags --abbrev=0').toString();
    execSync(`git push --delete origin ${tag}`)
    execSync(`git tag -d ${tag}`);
    execSync(
        `TAPESTRY_ACCESS_TOKEN=${process.env.GITHUB_ACTOR}:${process.env.GITHUB_TOKEN} tapestry release ${tag}`,
        {stdio: 'inherit'}
    );
  } catch (error) {
    core.setFailed(error.message);
  }
  