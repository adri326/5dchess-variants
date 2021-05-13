import variants from "./index.js";
window.variants = variants;

variants("Standard").then(_ => {}).catch(console.error);
variants("Standard - Default").then(_ => {}).catch(console.error);
variants("Standard - Turn Zero").then(t0 => {
    variants("Standard - Turn Zero - Brawns", true, true).then(t0b => {
        if (t0 == t0b) {
            console.error("Standard - Turn Zero returned the same value as Standard - Turn Zero - Brawns");
        }
    }).catch(console.error);
}).catch(console.error);

variants("Lol").then(x => {
    console.error(`Unexpected success: ${x}`);
}).catch(_ => {});
variants(".. - community - Standard - Brawns").then(x => {
    console.error(`Unexpected success: ${x}`);
}).catch(_ => {});
variants("Standard - Brawns").then(x => {
    console.error(`Unexpected success: ${x}`);
}).catch(_ => {});

const ITERATIONS = 10000;
console.log(`${ITERATIONS} iterations:`);

(async () => {
    await variants("Standard - Staggered Timelines - Brawns", true, true);
    console.time("With cache");
    for (let x = 0; x < ITERATIONS; x++) {
        await variants("Standard - Staggered Timelines - Brawns", true, true);
    }
    console.timeEnd("With cache");
})();
