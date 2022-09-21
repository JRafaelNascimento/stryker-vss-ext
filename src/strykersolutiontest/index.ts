import * as tl from 'azure-pipelines-task-lib/task';

const strykerAppPython: string  = "https://gist.githubusercontent.com/ThiagoBarradas/bc845ca918be6002a707819806c548fe/raw";

async function run() {
    try {
        // get inputs
        var configFilePath: string = tl.getInput('configFilePath', true);

        // install tools
        await tl.exec('wget', ["-O", "app.py", strykerAppPython]);
        
        // execute integration tests
        await tl.exec('python3', ["app.py", "--config-file", configFilePath]);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
