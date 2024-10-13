import Joi from 'joi';

const registerValidation = Joi.object({
    email: Joi.string().email(),
    username: Joi.string().min(3).max(32).required(),
    password: Joi.string().min(8).max(256).required(),
    stayLoggedIn: Joi.boolean().optional()
});

export default registerValidation;
