#!/bin/node

const assert = require("assert");
const pgn = require("./index.js");
const fs = require("fs");

assert.equal(pgn("Standard"), fs.readFileSync("./base/Standard/variant.5dpgn"));
assert.equal(pgn("Standard - Default"), fs.readFileSync("./base/Standard/Default/variant.5dpgn"));
assert.equal(pgn("Standard - Turn Zero"), fs.readFileSync("./base/Standard/Turn Zero/variant.5dpgn"));
assert.equal(pgn("Standard - Turn Zero - Brawns", true, true), fs.readFileSync("./community/Standard/Turn Zero/Brawns/variant.5dpgn"));

assert.throws(() => {
    pgn("Lol");
});
assert.throws(() => {
    pgn(".. - community - Standard - Brawns")
});
assert.throws(() => {
    pgn("Standard - Brawns", true, false);
});
assert.throws(() => {
    pgn("Standard - variant.5dpgn");
});
assert.throws(() => {
    pgn("Misc");
});

const ITERATIONS = 10000;
console.log(`${ITERATIONS} iterations:`);

pgn.cache = false;
console.time("Without cache");
for (let x = 0; x < ITERATIONS; x++) {
    pgn("Standard - Staggered Timelines - Brawns", true, true);
}
console.timeEnd("Without cache");

pgn.cache = true;
console.time("With cache");
for (let x = 0; x < ITERATIONS; x++) {
    pgn("Standard - Staggered Timelines - Brawns", true, true);
}
console.timeEnd("With cache");
