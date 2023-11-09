const fs = require('fs');

type HousesType = {
  id: number;
  address: string;
  homeowner: string;
  price: number;
  photoURL: string;
}

async function downloadImages(apiImages: HousesType[], outputFolder: string) {

  const downloadTasks = apiImages.map(async (imageObj: HousesType) => {

    try {

      const response = await fetch(imageObj.photoURL);

      const arrayBuffer = await response.arrayBuffer();
      const imageData = Buffer.from(arrayBuffer);

      // [id]-[address].[ext]

      const filename = `${imageObj.id}-${imageObj.address}.jpg`;

      fs.writeFileSync(`${outputFolder}/${filename}`, imageData);

    } catch (error) {

      // TODO: Retry saving the image in case of failure

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
