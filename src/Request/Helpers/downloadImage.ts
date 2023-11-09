const fs = require('fs');

async function downloadImages(apiImages: any[], outputFolder: string) {

  const downloadTasks = apiImages.map(async (imageObj, index) => {

    try {

      const response = await fetch(imageObj.photoURL);

      const arrayBuffer = await response.arrayBuffer();
      const imageData = Buffer.from(arrayBuffer);

      // [id]-[address].[ext]

      const filename = `${imageObj.id}-${imageObj.address}.jpg`;

      fs.writeFileSync(`${outputFolder}/${filename}`, imageData);

      console.log(`Saved ${filename} to ${outputFolder}`);
    } catch (error) {

      console.error(`Error downloading image: ${imageObj.photoURL}`);
    }
  });

  await Promise.all(downloadTasks);
}

const outputFolder = './Photos';

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

module.exports = {
  downloadImages: downloadImages
}
