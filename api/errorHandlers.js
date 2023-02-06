import { ValidationError } from './helpers.js';

export const validationErrorHandler = (err, req, res, next) => {
    if (err.name === ValidationError.name) {
        return res.status(400).json({
            error: err.message || 'Failed to validate parameters',
        })
    } else {
      next(err)
    }
}

export const errorHandler = (err, req, res, next) => {
    res.status(500)
    res.json({ error: err })
}