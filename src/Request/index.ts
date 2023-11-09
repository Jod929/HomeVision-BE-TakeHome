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


async function request( page: number , per_page: number, retryCount: number = 3 ) {


  // STRUCTURE OF 1 ITEM RETURNED:

  // HOUSE {
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

      if (error.response && error.response.status === 503 && retryCount > 0) {
        console.error(`Retrying after 2 seconds for page ${page}, attempt ${4 - retryCount}`);
        new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds
        request(page, per_page, retryCount - 1);
      } else {
        console.error(`Error: status ${error.response ? error.response.status : 'N/A'}, ${
          error.response ? error.response.statusText : 'N/A'
        }\nCould not reach page ${page}`);
      }

      // naive approach:
      // wait for 2 seconds and then recall this function with the parameters of the failed request.



      // there must be a better way to do this
    })
    .finally(function () {
      // todo: add testing to see if api call was behaved as expected
    });

}

index("actual");