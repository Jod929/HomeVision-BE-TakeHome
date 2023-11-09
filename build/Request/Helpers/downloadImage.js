// import fs from 'fs';
// import fetch from 'node-fetch';
const fs = require('fs');
const fetch = require('node-fetch');
async function downloadImages(apiImages, outputFolder) {
    const downloadTasks = apiImages.map(async (imageObj, index) => {
        try {
            const response = await fetch(imageObj.url);
            console.log("response", response);
            const imageData = await response.buffer();
            // Generate a unique filename (e.g., based on index or image URL)
            const filename = `${imageObj.id}-${imageObj.address}.jpg`;
            // Save the image to the specified folder
            fs.writeFileSync(`${outputFolder}/${filename}`, imageData);
            console.log(`Saved ${filename} to ${outputFolder}`);
        }
        catch (error) {
            // Handle errors for this image download task
            console.error(`Error downloading image: ${imageObj.url}`);
        }
    });
    await Promise.all(downloadTasks);
}
// [id]-[address].[ext]
// Example usage
const apiImages = [
    { url: 'https://image.shutterstock.com/image-photo/big-custom-made-luxury-house-260nw-374099713.jpg', id: 1, address: '4 Pumpkin Hill Street Antioch, TN 37013' },
    { url: 'https://image.shutterstock.com/image-photo/big-custom-made-luxury-house-260nw-374099713.jpg', id: 2, address: '4 Pumpkin Hill Street Antioch, TN 37013' },
    { url: 'https://image.shutterstock.com/image-photo/big-custom-made-luxury-house-260nw-374099713.jpg', id: 3, address: '4 Pumpkin Hill Street Antioch, TN 37013' },
    { url: 'https://image.shutterstock.com/image-photo/big-custom-made-luxury-house-260nw-374099713.jpg', id: 4, address: '4 Pumpkin Hill Street Antioch, TN 37013' }
];
const outputFolder = './Photos'; // Specify the folder where you want to save the images
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}
module.exports = {
    downloadImages: downloadImages
};
//# sourceMappingURL=downloadImage.js.map