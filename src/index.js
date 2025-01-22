import express from 'express';
import {connect} from './config/database.js';
const app=express();

import service from './services/tweet-service.js';

app.listen(3000, async()=>{
    console.log('server started');
    await connect();
    console.log('database connected');
    let ser= new service();
    const tweet=ser.create({content: 'heyy #hi'});
    
});