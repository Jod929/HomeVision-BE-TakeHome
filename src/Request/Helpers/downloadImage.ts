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


      // if this fails I would want to retry this as well I think

      // what kind of error would I need to see to want to retry this. Becuase there might be a situation where I have made an error.

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
