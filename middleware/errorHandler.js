

const { constants } = require("../constants")

const errorHandler = (err,req,res,next) => {

    const statusCode = res.statusCode ? res.statusCode : 500;
    
    switch(statusCode){

        case constants.VALIDATION_ERROR : 
        res.json({ 
            title : "validation failed",
            message : err.message , 
            stackTree : err.stack});
        
        case constants.NOT_FOUND : 
        res.json({ 
            title : "Not FOund Error",
            message : err.message , 
            stackTree : err.stack});
        
        case constants.UNAUTHORIZED : 
        res.json({ 
            title : "Unauthorized Error",
            message : err.message , 
            stackTree : err.stack});

        case constants.FORBIDDEN : 
        res.json({ 
            title : "Forbidden Error",
            message : err.message , 
            stackTree : err.stack});
        
        case constants.SERVER_ERROR : 
        res.json({ 
            title : "Server Error",
            message : err.message , 
            stackTree : err.stack});
        
        default :
            console.log("NO error, All goog !");
            break;

        
    }


    
};

module.exports = errorHandler;