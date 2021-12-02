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
    Post.associate = (db) =>{ 
        db.Post.belongsTo(db.User) // post.addUsers, post.getUser, post,setUSer
        db.Post.hasMany(db.Comment) //post.addComments
        db.Post.hasMany(db.Image) // post.addImages
        db.Post.belongsToMany(db.Hashtag,  { through: 'PostHashtag' }) // post.addHashtags
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }) //post.addLikers, post.removeLikers
        db.Post.belongsTo(db.Post, { as: 'Retweet' }) // post.addRetweets
    }
    return Post  
} 