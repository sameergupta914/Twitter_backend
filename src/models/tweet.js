import mongoose from 'mongoose';

const tweetSchema= new mongoose.Schema({
    content:{
        type:String,
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ] 
}, {timestamps: true});

const Tweet= mongoose.model('Tweet', tweetSchema);
export default Tweet;

// tweetSchema.virtual('contentWithEmail').get(function process(){
//     return `${this.content} \nCreated by: ${this.userEmail}`;
// })

// tweetSchema.pre('save', function(next){
//     console.log('inside a hook');
//     this.content=this.content+' see';
//     next();
// })