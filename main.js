import redisClient from './utils/redis';

(async () => {
    console.log(redisClient.isAlive());
    //console.log(redisClient.ready);
    console.log(await redisClient.get('mKey'));
    await redisClient.set('mKey', 10, 5);
    console.log(await redisClient.get('mKey'));

    setTimeout(async () => {
        console.log(await redisClient.get('mKey'));
    }, 1000*10)
})();
