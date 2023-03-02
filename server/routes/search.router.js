const { default: axios } = require ('axios');
const express = require('express');
const router = express.Router();

router.get('/:q', (req,res) => {
    let searchTerm = req.params.q;
    axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${searchTerm}&rating=pg-13`)
        .then((response) => {
            console.log('response is', response);
            res.send(response.data.data);
        })
        .catch((error) => {
            console.log('Error in Giphy search GET server side', error);
        })
})

module.exports = router;