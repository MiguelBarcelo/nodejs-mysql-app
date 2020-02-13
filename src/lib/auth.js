module.exports = {
    /**
     * @description Para proteger nuestras rutas
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    isLoggedIn(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }  
        return res.redirect('/signin');
    },

    isNotLoggedIn(req, res, next) {
        if(!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/profile'); 
    }
}