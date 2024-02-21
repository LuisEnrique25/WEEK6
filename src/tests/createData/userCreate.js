const User = require("../../models/User")

const userCreate = async() => {
    await User.create(
        {
            firstName: 'Luis',
            lastName: 'Reyes',
            email: 'luis@gmail.com',
            password: 'luis12345',
            phone: '+52 1223344556'
        }
    );
};

module.exports = userCreate;