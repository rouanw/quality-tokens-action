const core = require('@actions/core');
const github = require('@actions/github');

const context = github.context;
core.info(JSON.stringify(context, null, 2));
