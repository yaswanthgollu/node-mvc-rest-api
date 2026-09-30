
const whitelist = ['https://www.google.com', 'http://localhost:3500', 'http://27.0.0.1'];

const corsOptions = {
    origin : (origin, callback) => {
        if(whitelist.indexOf(origin)!=-1 || !origin)
        {
            callback(null,true);
        }
        else{
            callback(new Error('Not Allowed by CORS'));
        }
    },
    optionsSuccessStatus : 200
};


module.exports = corsOptions;