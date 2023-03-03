const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// original code: return all favorite images
// router.get('/', (req, res) => {
//   res.sendStatus(200);
// });

// TODO: return all favorite images
router.get('/', (req, res) => {
  const queryText = `
  SELECT * FROM "favorites" ORDER BY "cat_id";
  `
  pool.query(queryText)
      .then(response => {
        res.send(response.rows)
      }).catch(err => {
        console.log('Error on GET favorites: ', err);
        res.sendStatus(500);
      })
  })

// original code: add a new favorite
// router.post('/', (req, res) => {
//   res.sendStatus(200);
// });

// TODO: add a new favorite:
router.post('/', (req, res) => {
  const fav = req.body;
  
  const queryText = `
  INSERT INTO "favorites" ("url")
    values($1)
    RETURNING *
  `
  // const values = [fav.url]
  const values = [fav];
  pool.query(queryText, values)
      .then(response => {
        res.send(response.rows[0]);
        // res.sendStatus(200)
      }).catch(err => {
        console.log('Error on POST FAVORITE: ', err);
        res.sendStatus(500)       
      })
});


//TODO: delete a favorite
router.delete('/:id', (req, res) => {
  const idToDelete = req.params.id
  const queryText = `
    DELETE FROM favorites
    WHERE id=$1
  `
  const values = [idToDelete]
  pool.query(queryText, values)
      .then(response => {
        res.sendStatus(200);
      }).catch(err => {
        console.log('Error on delete: ', err);
        res.sendStatus(500)
      })
  });

module.exports = router;
