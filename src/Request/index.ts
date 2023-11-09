const axios = require('axios');
const saveImages  = require('./Helpers/downloadImage').downloadImages;

const index = ( type: string ) => {

  const test = () => {
    request(1, 10);
  }

  const actual = () => {
    for (let i = 0; i <= 10; i++) {
      request(i, 10);
    }
  }

  if (type === "test") {
    test();
  } else {
    actual();
  }

}


async function request( page: number , per_page: number ) {


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
    .then(function (response: { data: any; }) {

      let houses: object = response.data.houses;
      saveImages(houses, "./Photos");

    })
    .catch(function (error: any) {
      console.log(error);
      console.error("ERROR: status " + error.response.status + ", " + error.response.statusText + "\n"
                    + "Could not reach page " + error.config.params);
    })
    .finally(function () {
      // todo: add testing to see if api call was behaved as expected
    });

}

index("actual");