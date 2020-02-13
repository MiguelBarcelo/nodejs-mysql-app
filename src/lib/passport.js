// Logint with Twitter, Google, Facebook, etc
const passport          = require('passport');
// But, login with DB local
const LocalStrategy     = require('passport-local').Strategy;

const pool              = require('../database');
const helpers           = require('./helpers');

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',  // recibo del la vista signup el campo username
    passwordField: 'password',  // recibo del la vista signup el campo password
    passReqToCallback: true     // Recibir mas campos de la vista signup; todo el req.body
}, async (req, username, password, done) => {

    const { fullname } = req.body;
    const newUser = {
        username,
        password,
        fullname
    };
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO users (username, password, fullname) VALUES (?, ?, ?)', [username, newUser.password, fullname]);
    newUser.id = result.insertId;
    return done(null, newUser);
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done)=> {
    
    const rows = await pool.query('SELECT * FROM users WHERE username=?', [username]);
    if(rows.length > 0) {
        const user = rows[0];
        const valid = await helpers.matchPassword(password, user.password);
        console.log('valid', valid);
        if(valid) {
            done(null, user, req.flash('success', `Welcome ${user.username}`));
        } else {
            done(null, false, req.flash('danger', `Incorrect password`));
        }
    } else {
        return done(null, false, req.flash('warning', `Username doesn't exist`));
    }
    
}));

passport.serializeUser((usr, done) => {
    done(null, usr.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id=?', [id]);
    done(null, rows[0]);
});
