const { DataTypes } = require("sequelize/dist");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', { //mysql에서는 comment 테이블 생성
        //id는 mysql에서 자동 생성
       content: {
           type: DataTypes.TEXT,
           allowNull: false,
       }
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', //이모티콘 저장 위해 mb4추가
    })
} 
Comment.associtate = (db) => {}
return Comment 