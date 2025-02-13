import TweetService from '../services/tweet-service.js';
import upload from '../config/file-upload-s3-config.js';
// const singleUploader= upload.single('image');
const singleUploader= upload.array('image', 10);

const tweetService= new TweetService();

export const createTweet= async (req, res) =>{
    try {
        singleUploader(req, res, async function(err, data){
            if(err){
                return res.status(500).json({error: err});
            }
            console.log('image url is', req.files);
            const payload= {...req.body};
            // payload.images= req.file.location;
            const imgarray = req.files;
            payload.images=imgarray.map(obj => obj.location);
            const response= await tweetService.create(payload);
            return res.status(201).json({
                success: true,
                message: 'succesfully created a new tweet',
                data: response,
                err: {}
            });
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'something went wrong',
            data: {},
            err: error
        });
    }
}
export const getTweet= async (req, res) =>{
    try {
        const response= await tweetService.get(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'successfully fetched a tweet',
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'something went wrong',
            data: {},
            err: error
        });
    }
}
