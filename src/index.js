import express from 'express';
import bodyParser from 'body-parser';
import {connect} from './config/database.js';
import {TweetRepository, UserRepository} from './repository/index.js';
import LikeService from './services/like-service.js';


import apiRoutes from './routes/index.js'

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api', apiRoutes);
import service from './services/tweet-service.js';

app.listen(3000, async()=>{
    console.log('server started');
    await connect();
    console.log('database connected');
    
    const userRepo= new UserRepository();
    const tweetRepo= new TweetRepository();
    const tweets= await tweetRepo.getAll(0,10);
    // const user= await userRepo.create({
    //     email: 'samgupta@gmail.com',
    //     password: '123456',
    //     name: 'Sameer'
    // });
    const user= await userRepo.get('679285a36cd308f23c265542'); 
    const likeService= new LikeService();
    let x=await likeService.toggleLike(tweets[1].id, 'Tweet', user.id);
    console.log(x);
    
}); 