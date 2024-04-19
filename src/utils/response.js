/**
 *
 * @param {*} res
 * @param {*} data
 * @param {*} statusCode
 * @returns
 */
export const sendSuccessResponse = (res, { data, message, statusCode }) => {
    return res.status(statusCode || 200).json({
        status: true,
        message: message || 'success response',
        data: data || {},
    });
}

/**
 *
 * @param {*} res
 * @param {*} error
 * @param {*} statusCode
 * @returns
 */
export const sendErrorResponse = (res, { error, message, statusCode }) => {
    return res.status(statusCode || 500).json({
        status: false,
        message: message || 'error occurs',
        error: error || {}
    });
}

/**
 *
 * @param {*} res
 * @param {*} errors
 * @param {*} statusCode
 * @returns
 */
export const sendValidationError = (res, { error, message, statusCode }) => {
    return res.status(statusCode || 400).json({
        status: false,
        message: message || 'Validation error',
        data: error || {}
    });
}
  