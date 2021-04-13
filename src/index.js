const fs = require("fs");
const path = require("path");

let directory = fs.readdirSync(path.join(__dirname, "../variants/")).filter(x => /^[a-zA-Z \-]+$/.exec(x));

let pgn_cache = {};

/// Returns the variant's pgn and caches it if `module.exports.cache = true` (true by default)
function get(name) {
    if (typeof name !== "string") return;

    let normalized_name = directory.find(x => x.toLowerCase() == name.toLowerCase());

    if (normalized_name !== undefined) {
        if (module.exports.cache) {
            if (!pgn_cache[normalized_name]) {
                let pgn_path = path.join(__dirname, "../variants/", normalized_name, "variant.5dpgn");
                pgn_cache[normalized_name] = fs.readFileSync(pgn_path, "utf8");
            }
            return pgn_cache[normalized_name];
        } else {
            let pgn_path = path.join(__dirname, "../variants/", normalized_name, "variant.5dpgn");
            return fs.readFileSync(pgn_path, "utf8");
        }
    } else {
        return undefined;
    }
}

module.exports = get;
module.exports.get = get;
module.exports.cache = true;
