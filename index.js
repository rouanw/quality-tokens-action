const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

const context = github.context;
const sha = context?.payload?.head_commit?.id;
core.info(context?.payload?.head_commit?.id);
core.info(context?.payload?.head_commit?.message);
core.info(context?.payload?.head_commit?.author?.username);
core.info(context?.ref);
core.info(JSON.stringify(context, null, 2));

let myOutput = '';
let myError = '';

const options = {};
options.listeners = {
    stdout: (data) => {
        myOutput += data.toString();
    },
    stderr: (data) => {
        myError += data.toString();
    }
};
options.cwd = './';

const validate = (note, sha) => {
    return true;
};

(async () => {
    try {
        await exec.exec('git', ['notes', 'list', sha], options);
        const [noteRef] = myOutput.split('\n');
        myOutput = '';
        await exec.exec('git', ['show', noteRef], options);
        const [note] = myOutput.split('\n');
        const accepted = validate(note, sha);
        core.setOutput('accepted', accepted);
    } catch (error) {
        core.info('No verification token found');
        core.setOutput('accepted', false);
    }
})();
