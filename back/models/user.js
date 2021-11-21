const { DataTypes } = require("sequelize/dist");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { //mysql에서는 users 테이블 생성
        //id는 mysql에서 자동 생성
        email: {
            type: DataTypes.STRING(30), //STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
            allowNull: false,
            unique: true,
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100), //암호화
            allowNull: false,
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', //한글 저장
    })
}
User.associtate = (db) => {}
return User 