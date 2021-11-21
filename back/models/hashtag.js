const { DataTypes } = require("sequelize/dist");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define('Hashtag', { //mysql에서는 hashtags 테이블 생성
        //id는 mysql에서 자동 생성
       name: {
           type: DataTypes.STRING(20),
           allowNull: false,
       }
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', //이모티콘 저장 위해 mb4추가
    })
} 
Hashtag.associtate = (db) => {}
return Hashtag 