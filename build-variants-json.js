#!/bin/node

const fs = require("fs");
const path = require("path");

let res = {
    base: [],
    community: []
};

function recurse_directory(current_path, target_list, relative_path) {
    for (let file of fs.readdirSync(current_path)) {
        let stat = fs.lstatSync(path.join(current_path, file));
        if (stat.isDirectory()) {
            recurse_directory(path.join(current_path, file), target_list, relative_path);
        } else if (stat.isFile() && file === "variant.5dpgn") {
            target_list.push(path.relative(relative_path, current_path));
        }
    }
}

recurse_directory("base", res.base, "base");
recurse_directory("community", res.community, "community");

if (process.argv.find(x => x === "--save")) {
    fs.writeFileSync("variants.json", JSON.stringify(res, " ", 4));
} else {
    console.log(JSON.stringify(res, " ", 4));
}
