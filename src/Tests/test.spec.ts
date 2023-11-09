
// TODO: make test for downloading images success
// TODO: make test for download images fail

const testAll = () => {

    const fs = require('fs');
    const getAllHouses = require("../Request/index").main("actual");
    const dir = './Photos';

    console.log('Fetching Houses & Downloading Photos...\n');

    return new Promise((resolve, reject) => {
        setTimeout(() => {

            fs.readdir(dir, (err: NodeJS.ErrnoException | null, files: string[]) => {

                if (files.length === 100) {
                    console.log('\nSUCCESS testAll, number of files: ' + files.length);
                    resolve(true)
                } else {
                    console.log('\nFail testAll, number of files: ' + files.length);
                    reject(false)
                }
              });

        }, 10000)
    })

}

const main = () => {
    Promise.all([testAll()])
        .then(results => {
            results.forEach(result => {
                if (result === false) {
                    console.log("\n" + "Fail")
                    return;
                }
            })
            console.log("\n" + "Pass");
            return;
        })
        .catch((err) => {
            console.log('error in test ', err);
        })
}

main();


