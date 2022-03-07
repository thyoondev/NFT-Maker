const { cat, background } = require("./traits.js");

const NUM_OF_CATS = 10;
const NUM_OF_BACKGROUND = 10;

let NFTs = [];

// 난수 발생
const fnRng = (limit) => {
    return Math.floor(Math.random() * limit);
}

// 중복 검사후 생성
const fnGenerateWithoutRedundancy = () => {
    let nftTobe = [];
    
    nftTobe.push(fnCheckRareTrait(cat[fnRng(NUM_OF_CATS)].id));
    nftTobe.push(background[fnRng(NUM_OF_BACKGROUND)].id);
    
    if (NFTs.length > 0) {
        for (let i=0; i<NFTs.length; i++) {
            if (JSON.stringify(NFTs[i]) === JSON.stringify(nftTobe)) {
                return  null;
            }
        }
    }
    return nftTobe;
}