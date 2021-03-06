const express           = require('express');
const router            = express.Router();
const pool              = require('../database');
const { isLoggedIn }    = require('../lib/auth');

// Middleware de ruta
router.use(isLoggedIn);

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
    // req.user.id -> Id de la session del usuario
    pool.query('INSERT INTO links (title, url, description, user_id) VALUES (?, ?, ?, ?)', [title, url, description, req.user.id])
        .then(rows => {
            req.flash('success', 'Link saved successfully');
            res.redirect('/links');
        })
        .catch(err => {
            console.error("Error adding link ", err);
        });
});

/*
// Using async-await
router.get('/', async (req, res) => {
    const links = await pool.query('SELECT * FROM links');
    res.render('links/list', {links: links});
});
*/
router.get('/', (req, res) => {
    pool.query('SELECT * FROM links where user_id=?', [req.user.id])
        .then(links => {
            res.render('links/list', {links: links});
        })
        .catch(err => {
            console.error("Error Finding links ", err);
        });
});

router.get('/delete/:id', (req, res) => {
    const { id } = req.params;  //console.log(req.params.id);

    pool.query('DELETE FROM links WHERE id=? and user_id=?', [id, req.user.id])
        .then(row => {
            req.flash('success', 'Link removed successfully');
            res.redirect('/links');
        })
        .catch(err => {
            console.error("Error Deleting links ", err);
        });
});

router.get('/edit/:id', (req, res) => {
    const { id } = req.params;

    pool.query('SELECT * FROM links WHERE id=? and user_id=?', [id, req.user.id])
        .then(link => {
            res.render('links/edit', {link: link[0]});
        })
        .catch(err => {

        });
});

router.post('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { title, url, description } = req.body;
    const updLink = {
        title,
        url,
        description
    };

    //pool.query('UPDATE links SET ? WHERE id=?', [updLink, id])
    pool.query('UPDATE links SET title=?, url=?, description=? WHERE id=? and user_id=?', [title, url, description, id, req.user.id])
        .then(rows => {
            req.flash('success', 'Link updated successfully');
            res.redirect('/links');
        })
        .catch(err => {
            console.error("Error Updating links ", err);
        })
});

module.exports = router;
