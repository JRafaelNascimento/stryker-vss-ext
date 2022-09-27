import * as tl from 'azure-pipelines-task-lib/task';

const strykerAppPython: string  = "https://gist.githubusercontent.com/JRafaelNascimento/3a6146b6e4d0a4db411ff4813f92e74b/raw/76eaa88d6e101291fa9460b0308d8ac5b9601162/stryker-solution-script.py";

async function run() {
    try {
        // get inputs
        var configFilePath: string = tl.getInput('configFilePath', true);
        var dotnetStrykerVersion: string = tl.getInput('dotnetStrykerVersion', true);

        // install tools
        await tl.exec('dotnet', ["tool", "install", "-g", "dotnet-stryker", "--version", dotnetStrykerVersion]);
        await tl.exec('wget', ["-O", "stryker.py", strykerAppPython]);

        // execute integration tests
        await tl.exec('python3', ["stryker.py", "--config-file", configFilePath]);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
