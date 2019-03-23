const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    // 可以知道誰發文(name & avatar)
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users' 
    },
    // 可以知道每一篇發文的內容
    text: {
        type: String,
        required: true,
    },
    // 每個 post 有自己的 name 跟 avatar 是因為我們不希望當使用者移除帳號，貼文跟著移除
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    // likes 數量不是數字上單純相加，而是 array 是因為，每次按下 like 按鈕，按下 like 的 user id 會被加入 array，如果他突然又不喜歡，可以從 array 中 remove like
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users' 
            }
        }
    ],
    // comments 跟 user 也有關聯
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users' 
            },
            text: {
                type: String,
                required: true
            },
            // 留言評論是誰發的
            name: {
                type: String
            },
            avatar: {
                type: String
            },
             // 評論時間
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    // 發文時間
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Post = mongoose.model('post', PostSchema);