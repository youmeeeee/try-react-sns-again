module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', { //mysql에서는 posts 테이블 생성
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
Post.associtate = (db) =>{ 
    db.Post.belongsTo(db.User)
    db.Post.hasMany(db.Comment)
    db.Post.hasMany(db.Image)
    db.Post.belongsToMany(db.Hashtag)
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' })
    db.Post.belongsToMany(db.Post, { as: 'Retweet' })
}
return Post  