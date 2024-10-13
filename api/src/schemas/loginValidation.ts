import Joi from 'joi';

const loginValidation = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(8).max(256).required(),
    stayLoggedIn: Joi.boolean().optional()
});

export default loginValidation;
