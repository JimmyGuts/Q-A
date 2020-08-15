import axios from 'axios';

const getProductQA = (product_id) => {
  return axios
  .get(`http://52.26.193.201:3000/qa/${product_id}/`)
  .then((res) => {
     return res.data;
  })
  .catch((err) => {
    return err;
  });
}


export {
  getProductQA,
}