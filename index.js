const core = require('@actions/core');
const github = require('@actions/github');

const context = github.context;
core.info(context?.payload?.head_commit?.message);
core.info(JSON.stringify(context, null, 2));
