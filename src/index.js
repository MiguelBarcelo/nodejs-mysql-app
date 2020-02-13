/**
 * @desc    Configuring our server
 */

const express       = require('express');
const morgan        = require('morgan');
const exphbs        = require('express-handlebars');
const path          = require('path');
const flash         = require('connect-flash');
const session       = require('express-session');
const MySQLStore    = require('express-mysql-session');
const passport      = require('passport');
const { database }  = require('./keys');

// initializations
const app = express();
require('./lib/passport');

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));    // src/views folder
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',                                // because the real extension is .handlebars but its abbreviated way to use
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(session({
    secret: 'myNodejsMysqlSecretSession',
    resave: false,                  // Que no se renueve la sesion
    saveUninitialized: false,       // Que no se vuelva establecer la sesion
    store: new MySQLStore(database) // La session es guardada en la DB
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));     // Aceptar datos sencillos desde los formularios
app.use(express.json());                            // Aceptar json
app.use(passport.initialize());
app.use(passport.session());

// Global Variables
app.use((req, res, next) => {
    app.locals.success  = req.flash('success');
    app.locals.warning  = req.flash('warning');
    app.locals.danger   = req.flash('danger');
    app.locals.myUser   = req.user;
    next();
});

// Routes
app.use(require('./routes'));                       // node busca automaticamente el index.js
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));        // todas las rutas les precede un prefix -> POST '/links/_id'

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
