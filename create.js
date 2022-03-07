const { createCanvas, loadImage } = require("canvas");
const { cat, background } = require("./traits.js");

const canvas = createCanvas(512, 512);
const ctx = canvas.getContext('2d');

const FILE_PATH = "./images";

const saveImage = (canvas, index) => {
    const filename = `CYBER_CAT${index.toString().padStart(3,0)}`;
    fs.writeFileSync(`${FILE_PATH}/_Final/${filename}.png`, canvas.toBuffer("image/png"));
    //console.log(filename);
   };

const create = async (t, i) => {

    const cat = await loadImage(`${FILE_PATH}/Cat/${t[0]}.png`);
    const background = await loadImage(`${FILE_PATH}/Background/${t[1]}.png`);
   

    await ctx.drawImage(cat, 0, 0, 500, 500);
    await ctx.drawImage(background, 0, 0, 500, 500);
   
    saveImage(canvas, i+1);
   
   };

   module.exports = {
    create
}