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


async function request( page: number , per_page: number, retryCount: number = 5 ): Promise<object[] | unknown> {

  return new Promise(async (resolve, reject) => {
    try {

      const response = await axios.get('http://app-homevision-staging.herokuapp.com/api_project/houses', {
        params: {
          page: page,
          per_page: per_page
        }
      });

      let houses: object[] = response.data.houses;
      saveImages(houses, "./Photos");
      resolve(houses);

    } catch (error: any) {

      // TODO: Check for other error codes and handle those errors

      if (error.response && error.response.status === 503 && retryCount > 0) {

        console.error(`Retrying after 2 seconds for page ${page}, attempt ${6 - retryCount}`);
        setTimeout(() => {
          request(page, per_page, retryCount - 1)
            .then(resolve)
            .catch(reject);
        }, 2000);

      } else {

        console.error(`Error: status ${error.response ? error.response.status : 'N/A'}, ${
          error.response ? error.response.statusText : 'N/A'
        }\nCould not reach page ${page}`);

        reject(error);

      }
    }
  });

}

module.exports = {
  getHouses: request,
  main: index
};