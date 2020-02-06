const express   = require('express');
const router    = express.Router();
const pool      = require('../database');

router.get('/add', (req, res) => {
    //res.send('Form');
    res.render('links/add');
});

router.post('/add', async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    await pool.query('INSERT INTO links SET ?', [newLink]);
    //res.send('received');
    res.redirect('/links');
});

router.get('/', async (req, res) => {
    const links = await pool.query('SELECT * FROM links');
    console.log(links);
    //res.send('listas iran aquí');
    res.render('links/list', {links: links});

});

module.exports = router;