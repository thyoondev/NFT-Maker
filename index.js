const { cat, background } = require("./traits.js");

const NUM_OF_CATS = 10;
const NUM_OF_BACKGROUND = 10;

// 난수 발생
const fnRng = (limit) => {
    return Math.floor(Math.random() * limit);
}

let nftTobe = [];
nftTobe.push(cat[fnRng(NUM_OF_CATS)].id);