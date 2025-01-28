import TweetRepository from "../../src/repository/tweet-repository.js";
import Tweet from "../../src/models/tweet.js";

jest.mock('../../src/models/tweet.js');

describe('create tweet tests', ()=>{
    test('should create a new tweet and return it', async()=>{
        const data={
            content: 'hehe'
        }
        const spy= jest.spyOn(Tweet, 'create').mockImplementation(()=>{
            return {...data, createdAt: '2025-01-28', updatedAt: '2025-01-28'}
        })
        const tweetRepository= new TweetRepository();
        const tweet= await tweetRepository.create(data);
    
        expect(spy).toHaveBeenCalled();
        expect(tweet.content).toBe('hehe');
        expect(tweet.content).toBeDefined();
    });
    
    test('should not create a new tweet and throw exception', async()=>{
        const data={
            content: 'hehe'
        }
        const spy= jest.spyOn(Tweet, 'create').mockImplementation(()=>{
            throw new Error('something went wrong');
        });
        const tweetRepository= new TweetRepository();
        const tweet= await tweetRepository.create(data).catch(err=>{
            expect(err.message).toBe('something went wrong');
        });
    });
});

describe('get all tweets', ()=>{
    test('testing limit for get all', async()=>{
        const data={
            content: 'hehe'
        }
        const tweetArray=[{...data, createdAt: '2025-01-28', updatedAt: '2025-01-28'}, {...data, createdAt: '2025-01-28', updatedAt: '2025-01-28'}, {...data, createdAt: '2025-01-28', updatedAt: '2025-01-28'}]
        const responsee={tweetArray};

        responsee.limit=jest.fn((limit)=> responsee.tweetArray.slice(0, limit));
        responsee.skip= jest.fn((offset)=>responsee);

        const spy= jest.spyOn(Tweet, 'find').mockImplementation(()=>{
            return responsee;
        })
        const tweetRepository= new TweetRepository();
        const tweets= await tweetRepository.getAll(0,3);
        expect(tweets).toHaveLength(3);
    })
});

