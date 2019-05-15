const errorHandler = async (err, req, res, next) => {
     try {
       error.status = await error.status || 500;
       res.status(error.status).json({Msg: error.message})

     } catch (error) {
        console.log(error);
     }
}

module.exports = errorHandler;
