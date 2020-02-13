const bcryptjs  = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcryptjs.genSalt(10); // Mas veces lo ejecutes, mas seguro el hash
    const bcryptPwd = await bcryptjs.hash(password, salt);

    return bcryptPwd; 
};

helpers.matchPassword = async (password, savedPassword) => {
    try {
        return await bcryptjs.compare(password, savedPassword);
    } catch(e) {
        console.log(e);
        // TO-DO: mandar mensaje por connect-flash
    }
    
};

module.exports = helpers;