const { default: axios } = require ('axios');
const express = require('express');
const router = express.Router();

router.get('/:q', (req,res) => {
    let searchTerm = req.params.q;
    // console.log('search term: ', searchTerm)
    // console.log(process.env.GIPHY_API_KEY)

    const params = {
        api_key : process.env.GIPHY_API_KEY,
        q : searchTerm
    }

    axios.get(`https://api.giphy.com/v1/gifs/search?`, { params })
        .then((response) => {
            res.send(response.data.data);
        })
        .catch((error) => {
            // console.log('Error in Giphy search GET server side', error);
        })
})

module.exports = router;