import * as tl from 'azure-pipelines-task-lib/task';

const strykerAppPython: string  = "https://gist.githubusercontent.com/JRafaelNascimento/3a6146b6e4d0a4db411ff4813f92e74b/raw/546ea1c876bf497f8f81331e20cd5936867aaf68/stryker-solution-script.py";

async function run() {
    try {
        // get inputs
        var configFilePath: string = tl.getInput('configFilePath', true);

        // install tools
        await tl.exec('wget', ["-O", "stryker.py", strykerAppPython]);

        // execute integration tests
        await tl.exec('python3', ["stryker.py", "--config-file", configFilePath]);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
