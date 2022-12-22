function errorHandler(err, req, res, next) {
    if (res.headersSent){
        return  next(err);
    }

    console.warn('error', '', {
        message: 'Error Handler',
        action: `${req.method} : ${req.url}`,
        body: {
            ...req.body
        },
        err,
    });

    res.status(500).send(err.message);
}

export {errorHandler};