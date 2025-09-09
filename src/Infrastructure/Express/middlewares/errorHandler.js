const errorHandler = (err, req, res, next) => {
    console.error('Erro capturado:', err.message);
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong!';

    res.status(statusCode).json({
        status: 'error',
        message: message,
        
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

module.exports = errorHandler;