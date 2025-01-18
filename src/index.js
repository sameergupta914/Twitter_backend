const express= require('express');
const connect=require('./config/database');
const app=express();

const TweetRepository=require('./repository/tweet-repository');
const Comment=require('../src/models/comment');

app.listen(3000, async()=>{
    console.log('server started');
    await connect();
    console.log('database connected');
    // const tweet= await Tweet.create({
    //     content: 'fourth tweet',
    //     // userEmail: 'a@b.com'
    // });
    // const tweets= await Tweet.find({userEmail:'a@b.com'});
    const tweetrepo= new TweetRepository();
   const tweet= await tweetrepo.get('678ba8c0a89dc43772f1a7b3');
   console.log(tweet);
});