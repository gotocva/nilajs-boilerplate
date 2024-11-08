

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    export const AdminMiddleware = (req, res, next) => {
        console.log('Processing Admin middleware...');
        // Add custom middleware logic here (e.g., validation, logging)
        next();
    };