// Hard-coded, sorry
const BASE_URL = "https://adri326.github.io/5dchess-variants/";

const VALIDATE_REGEX = /^[\w \-]+$/;

let backlog = [];
let variants = null;

let base_cache = {};
let community_cache = {};

fetch(BASE_URL + "/variants.json").then((response) => {
    if (!response.ok) {
        throw new Error("Couldn't fetch variants.json: " + response.status);
    }
    return response.json();
}).then((json) => {
    variants = json;
    for (let backlogItem of backlog) {
        backlogItem.resolve(json);
    }
}).catch((err) => {
    for (let backlogItem of backlog) {
        backlogItem.reject(err);
    }
});

function try_get(path, cache, resolve, reject) {
    if (cache[path]) {
        resolve(cache[path]);
    } else {
        fetch(BASE_URL + path + "/variant.5dpgn").then((response) => {
            if (!response.ok) {
                throw new Error(`Couldn't fetch ${path}: ${response.status}`);
            }
            return response.text();
        }).then((text) => {
            cache[path] = text;
            resolve(text);
        }).catch((err) => {
            reject(err);
        });
    }
}

function get(name, base = true, community = false) {
    function handle_request(resolve, reject) {
        if (!VALIDATE_REGEX.exec(name)) {
            reject(new Error("Invalid variant name (illegal character): " + name));
            return;
        }
        let candidate_name = name.trim().replace(/\s-\s/g, "/").toLowerCase();
        if (base) {
            let normalized_name = variants.base.find(key => key.toLowerCase() == candidate_name);
            if (normalized_name) {
                return try_get("base/" + normalized_name, base_cache, resolve, reject);
            }
        }
        if (community) {
            let normalized_name = variants.community.find(key => key.toLowerCase() == candidate_name);
            if (normalized_name) {
                return try_get("community/" + normalized_name, community_cache, resolve, reject);
            }
        }
        reject(new Error("Invalid variant name (not found): " + name));
    }

    if (variants !== null) {
        return new Promise(handle_request);
    } else {
        return new Promise((resolve, reject) => {
            backlog.push({
                resolve() {
                    handle_request(resolve, reject);
                },
                reject
            });
        })
    }
    return new Promise();
};

export default get;
get.get = get;
