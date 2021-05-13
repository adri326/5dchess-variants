#!/bin/node

const assert = require("assert");
const variants = require("./index.js");
const fs = require("fs");

(async () => {
    assert.equal(await variants("Standard"), fs.readFileSync("./base/Standard/variant.5dpgn", "utf8"));
    assert.equal(await variants("Standard - Default"), fs.readFileSync("./base/Standard/Default/variant.5dpgn", "utf8"));
    assert.equal(await variants("Standard - Turn Zero"), fs.readFileSync("./base/Standard/Turn Zero/variant.5dpgn", "utf8"));
    assert.equal(await variants("Standard - Turn Zero - Brawns", true, true), fs.readFileSync("./community/Standard/Turn Zero/Brawns/variant.5dpgn", "utf8"));

    variants("Lol").then(x => {
        throw new Error(`Expected failure, got ${x}`);
    }).catch(_ => {});

    variants(".. - community - Standard - Brawns").then(x => {
        throw new Error(`Expected failure, got ${x}`);
    }).catch(_ => {});

    variants("Standard - Brawns", true, false).then(x => {
        throw new Error(`Expected failure, got ${x}`);
    }).catch(_ => {});

    variants("Standard - variant.5dpgn").then(x => {
        throw new Error(`Expected failure, got ${x}`);
    }).catch(_ => {});

    variants("Misc").then(x => {
        throw new Error(`Expected failure, got ${x}`);
    }).catch(_ => {});


    const ITERATIONS = 10000;
    console.log(`${ITERATIONS} iterations:`);

    variants.cache = false;
    console.time("Without cache");
    for (let x = 0; x < ITERATIONS; x++) {
        await variants("Standard - Staggered Timelines - Brawns", true, true);
    }
    console.timeEnd("Without cache");

    variants.cache = true;
    console.time("With cache");
    for (let x = 0; x < ITERATIONS; x++) {
        await variants("Standard - Staggered Timelines - Brawns", true, true);
    }
    console.timeEnd("With cache");
})();
