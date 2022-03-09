const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const { cat, background } = require('./traits.js');
const { saveMetadataUri } = require('./file.js');
const API_KEY = require('./API_KEY.js');

const { NFTStorage, File } = require('nft.storage');

const client = new NFTStorage({ token: API_KEY });

const canvas = createCanvas(512, 512);
const ctx = canvas.getContext('2d');

const FILE_PATH = './images';

//
const getAttributes = (v, k) => {
  let attributes = {};
  let trait_type = '';
  let value = '';

  switch (k) {
    case 0:
      trait_type = 'Cat';
      value = cat[v - 1].name;
      break;
    case 1:
      trait_type = 'Background';
      value = background[v - 1].name;
      break;
    default:
      trait_type = '';
      value = '';
  }

  attributes.trait_type = trait_type;
  attributes.value = value;

  return attributes;
};

const saveImage = (canvas, index) => {
  const filename = `CYBER_CAT${index.toString().padStart(3, 0)}`;
  fs.writeFileSync(`${FILE_PATH}/_Final/${filename}.png`, canvas.toBuffer('image/png'));
  //console.log(filename);
};

// 토큰정보를 바탕으로 메타데이터를 생성하고 IPFS 에 업로드한다.
// t=토큰 조합(배열)
// i=인덱스
const uploadMetaData = async (t, i) => {
  let metadata = {
    description: 'CYBER_CAT::nya',
    name: `CYBER_CAT${i}`,
    type: 'Collectable',
    image: 'https://',
    attributes: [],
  };

  // 토큰 조합은 배열이고 속성은 2개이므로 반복문으로 각 속성을 attributes 속성에 넣는다.
  for (let k = 0; k < 2; k++) {
    metadata.attributes.push(getAttributes(t[k], k));
  }

  const filename = `CYBER_CAT${i.toString().padStart(3, 0)}`;
  metadata.image = new File([await fs.promises.readFile(`${FILE_PATH}/_Final/${filename}.png`)], `${filename}.png`, {
    type: 'image/png',
  });

  const result = await client.store(metadata); // NFT Storage 서비스에 업로드한다.
  //console.log(`${i}=${result.url}`);
  saveMetadataUri(`${i}=${result.url}`); // 나중에 토큰 발행할 때 사용하기 위해 파일에 저장한다.
};

const create = async (t, i) => {
  const cat = await loadImage(`${FILE_PATH}/Cat/${t[0]}.png`);
  const background = await loadImage(`${FILE_PATH}/Background/${t[1]}.png`);

  await ctx.drawImage(background, 0, 0, 500, 500);
  await ctx.drawImage(cat, 0, 0, 500, 500);

  saveImage(canvas, i + 1);

  await uploadMetaData(t, i + 1); // metadata upload to IPFS
};

module.exports = {
  create,
};
