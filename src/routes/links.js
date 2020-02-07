const express   = require('express');
const router    = express.Router();
const pool      = require('../database');

router.get('/add', (req, res) => {
    //res.send('Form');
    res.render('links/add');
});

router.post('/add', (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    
    pool.query('INSERT INTO links (title, url, descriptio) VALUES (?, ?, ?)', [title, url, description])
        .then(rows => {
            res.redirect('/links');
        })
        .catch(err => {
            console.error("Error Adding link ", err);
        });
});

/*
router.get('/', async (req, res) => {
    const links = await pool.query('SELECT * FROM links');
    res.render('links/list', {links: links});
});
*/
router.get('/', (req, res) => {
    pool.query('SELECT * FROM links')
        .then(links => {
            res.render('links/list', {links: links});
        })
        .catch(err => {
            console.error("Error Finding links ", err);
        })
});

module.exports = router;