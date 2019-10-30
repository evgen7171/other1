const express = require('express');
const handler = require('./handler');
const fs = require('fs');

const getBasketFile = 'server/db/getBasket.json';

const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile(getBasketFile, 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data)
        }
    })
});
router.post('/', (req, res) => {
    handler(req, res, 'add', getBasketFile)
});
router.put('/:id', (req, res) => {
    handler(req, res, 'change', getBasketFile)
});
router.delete('/:id', (req, res) => {
    handler(req, res, 'remove', getBasketFile)
});
router.delete('/', (req, res) => {
    handler(req, res, 'clear', getBasketFile);
});

module.exports = router;