const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const bycrypt = require("bcrypt");

const User = sequelize.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

User.prototype.toJSON = function () {
   const values = { ...this.get() };
   delete values.password ;
   return values;
};

User.beforeCreate(async(user) => {
    const password = user.password;
    const hashedPassword = await bycrypt.hash(password, 10);
    user.password = hashedPassword;
});

module.exports = User;