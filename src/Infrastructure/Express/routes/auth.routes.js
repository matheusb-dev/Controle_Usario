const { Router } = require('express'); 
const AuthController = require('src/Infrastructure/Express/controllers/AuthController');
const validate = require('src/Infrastructure/Express/middlewares/validationMiddleware');
const { registerSchema, loginSchema } = require('src/Infrastructure/Express/validationsChemas/authSchemas');

module.exports = (registerUserUseCase, loginUserUseCase) => {
    const router = Router();
    const authController = new AuthController(registerUserUseCase, loginUserUseCase);

    router.post('/register', validate(registerSchema), authController.register.bind(authController));
    router.post('/login', validate(loginSchema), authController.login.bind(authController));

    return router;
};