// import axios from 'axios';
// import fs from 'fs';
// import downloadImages from './Helpers/downloadImage';
const axios = require('axios');
const downloadIMagesthign = require('./Helpers/downloadImage');
const index = (type) => {
    console.log(downloadIMagesthign);
    // const test = () => {
    //   request(1, 10);
    // }
    // const actual = () => {
    //   for (let i = 0; i <= 10; i++) {
    //     request(i, 10);
    //   }
    // }
    // if (type === "test") {
    //   test();
    // } else {
    //   actual();
    // }
};
// if the request fails call it again
async function request(page, per_page) {
    // let houseNumber: any[] = [];
    // let totalHousesRecieved = 0;
    // TEST HOUSE  {
    //   id: 0,
    //   address: '4 Pumpkin Hill Street Antioch, TN 37013',
    //   homeowner: 'Nicole Bone',
    //   price: 105124,
    //   photoURL: 'https://image.shutterstock.com/image-photo/big-custom-made-luxury-house-260nw-374099713.jpg'
    // }
    await axios.get('http://app-homevision-staging.herokuapp.com/api_project/houses', {
        params: {
            page: page,
            per_page: per_page
        }
    })
        .then(function (response) {
        // handle success
        // console.log(response.data);
        let houses = response.data.houses;
        // downloadImages(houses, "./Photos");
        // houses.forEach((house: any) => {
        //   // console.log(house)
        //   fs.writeFile("./Photos", house.photoURL, (err: any) => {
        //     if (err) throw err;
        //     console.log('The file has been saved!');
        //   });
        // })
        // let testHouse = houses[0];
        // console.log("TEST HOUSE ", testHouse);
        // fs.writeFile("./Photos", testHouse.photoURL, (err: any) => {
        //   if (err) throw err;
        //   console.log('The file has been saved!');
        // });
        // writeFile('message.txt', data, (err) => {
        //   if (err) throw err;
        //   console.log('The file has been saved!');
        // });
    })
        .catch(function (error) {
        // handle error
        console.log(error);
    })
        .finally(function () {
        // always executed
        // console.log(houseNumber);
        // console.log(totalHousesRecieved);
    });
}
index("test");
//# sourceMappingURL=index.js.map