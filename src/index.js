const fs = require("fs");
const path = require("path");

const VALIDATE_REGEX = /^[\w \-]+$/;
const NAME_REGEX = /^[\w](?:[\w\s]*[\w])?/;
const SUFFIX_REGEX = /^\s+-\s+([\w][\w \-]*)$/;

let base_cache = {};
let community_cache = {};

/// Recursively find the variant
function search_in_path(name, current_path, cache, full_name = name) {
    let match = NAME_REGEX.exec(name);
    if (!match) throw new Error(`Syntax error in variant name: '${name}'`);
    let prefix_name = match[0].toLowerCase();

    let directory = fs.readdirSync(current_path).filter(x => /^[\w\s]+$/.exec(x));

    let normalized_name = directory.find(x => x.toLowerCase() == prefix_name);

    if (normalized_name !== undefined) {
        let merged_path = path.join(current_path, normalized_name);
        if (!fs.lstatSync(merged_path).isDirectory()) throw new Error(`Invalid variant: ${merged_path} is not a directory!`);

        let match_suffix = SUFFIX_REGEX.exec(name.slice(match[0].length))
        if (match_suffix) {
            return search_in_path(match_suffix[1], merged_path, cache, full_name);
        } else if (match[0].length < name.trim().length) {
            throw new Error(`Unmatched part in variant name: ${name.slice(match[0].length)}`); // Syntax error
        } else {
            let full_path = path.join(merged_path, "variant.5dpgn");

            if (!fs.existsSync(full_path)) {
                return null;
            }

            if (module.exports.cache) {
                if (!cache[full_path]) {
                    cache[full_path] = fs.readFileSync(full_path, "utf8");
                    cache[full_name] = cache[full_path];
                }
                return cache[full_path];
            } else {
                return fs.readFileSync(full_path, "utf8");
            }
        }
    } else {
        return null;
    }
}

/// Returns the variant's pgn and caches it if `module.exports.cache = true` (true by default)
function get(name, base = true, community = false) {
    if (typeof name !== "string") return;
    if (!NAME_REGEX.exec(name)) throw new Error(`Syntax error in variant name: ${name}`);
    name = name.trim();

    if (module.exports.cache) {
        if (base && base_cache[name]) {
            return base_cache[name];
        }
        if (community && community_cache[name]) {
            return community_cache[name];
        }
    }
    if (base) {
        let res = search_in_path(name, path.join(__dirname, "../base"), base_cache, name);
        if (res) return res;
    }
    if (community) {

        let res = search_in_path(name, path.join(__dirname, "../community"), community_cache, name);
        if (res) return res;
    }
    throw new Error(`Variant not found: ${name}`);
}

module.exports = get;
module.exports.get = get;
module.exports.cache = true;
