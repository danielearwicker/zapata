#!/usr/bin/env node
const z = require("../built/main");

const commands = [
    ["create", "Copies the example site into the current directory"],
    ["generate", "Produces the ready-to-deploy version of the site"]
];

const command = process.argv[2];

if (commands.every(c => c[0] !== command)) {

    console.log();
    console.log("Zapata supports these commands:");
    console.log();
    for (const c of commands) {
        console.log(`    ${c[0].padEnd(14)} ${c[1]}`);
        console.log();
    }

} else {

    z[command]();
}
