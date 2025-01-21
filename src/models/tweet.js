const mongoose= require('mongoose');

const tweetSchema= new mongoose.Schema({
    content:{
        type:String,
        required: true
    },
    hashtags:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hashtag'
        }
    ]
}, {timestamps: true});

const Tweet= mongoose.model('Tweet', tweetSchema);
module.exports= Tweet;

// tweetSchema.virtual('contentWithEmail').get(function process(){
//     return `${this.content} \nCreated by: ${this.userEmail}`;
// })

// tweetSchema.pre('save', function(next){
//     console.log('inside a hook');
//     this.content=this.content+' see';
//     next();
// })