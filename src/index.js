const express= require('express');
const connect=require('./config/database');
const app=express();

const TweetRepository=require('./repository/tweet-repository');
const Comment=require('../src/models/comment');

app.listen(3000, async()=>{
    console.log('server started');
    await connect();
    console.log('database connected');
    
    const tweetrepo= new TweetRepository();
    const tweet=await tweetrepo.create({content: 'hey this is trial hook content'});
    console.log(tweet);
});