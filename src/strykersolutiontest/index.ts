import * as tl from 'azure-pipelines-task-lib/task';

const strykerAppPython: string  = "https://gist.githubusercontent.com/JRafaelNascimento/3a6146b6e4d0a4db411ff4813f92e74b/raw/cff944f34662ddb1ac3a049a1fa37fd047314a31/stryker-solution-script.py";
const dotnetStrykerVersion: string  = "2.1.2";

async function run() {
    try {
        // get inputs
        var configFilePath: string = tl.getInput('configFilePath', true);

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
