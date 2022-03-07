const { cat, background } = require("./traits.js");


const NUM_OF_CATS = 10;
const NUM_OF_BACKGROUND = 10;

const TARGET_NUM_OF_NFT = 10; //발행 목표 수량
const RARE_TRAIT = 3;
const MAX_NUM_OF_RARITY = 2;

let NFTs = [];
let totalCountOfRareTrait = 0;

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

// 특정 trait 를 가진 토큰이 일정수량을 넘지 못하도록 조절
const fnCheckRareTrait = (t) => {
    if (NFTs.length > 0 && t === RARE_TRAIT) {
        totalCountOfRareTrait++;
        if (totalCountOfRareTrait > MAX_NUM_OF_RARITY) {
            totalCountOfRareTrait--;
            return fnCheckRareTrait(background[fnRng(NUM_OF_BACKGROUND)].id);
        }
        return t;
    } else {
        return t;
    }
}

while (NFTs.length < TARGET_NUM_OF_NFT) {
    const n = fnGenerateWithoutRedundancy();
    if (n !== null) {
        NFTs.push(n);
        //if (n[0] === 3) console.log(`RARITY=${NFTs.length}`);
    }
}

console.log(`TOTAL_NUM_OF_NFT = ${NFTs.length}`);
console.log(`TOTAL_NUM_OF_RARITY = ${totalCountOfRareTrait}`);