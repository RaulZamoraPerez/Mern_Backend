
import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { body, param } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';
import { authenticate } from '../middleware/auth';


const router = Router();


router.post('/create-account',

    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacio'),
    body('password')
        .isLength({ min: 8 }).withMessage('El password es muy corto, minimo 8 caracteres'),

    body('password_confirmation').custom((value, { req }) => {

        if (value !== req.body.password) {
            throw new Error('Los passwords no son iguales')
        }
        return true;

    }),
    body('email')
        .isEmail().withMessage('Email no valido'),

    handleInputErrors,
    AuthController.createAccount
)

router.post('/confirm-account',
    body('token')
        .notEmpty().withMessage('El token no puede ir vacio'),

    handleInputErrors,
    AuthController.confirmAccount
)

router.post('/login',

    body('email')
        .isEmail().withMessage('Email no valido'),
    body('password')
        .notEmpty().withMessage('El password no puede ir vacio'),

    handleInputErrors,
    AuthController.login

)
router.post('/request-code',

    body('email')
        .isEmail().withMessage('Email no valido'),

    handleInputErrors,
    AuthController.requestConfirmationCode

)
router.post('/forgot-password',

    body('email')
        .isEmail().withMessage('Email no valido'),


    handleInputErrors,
    AuthController.forgotPassword

)

router.post('/validate-token',
    body('token')
        .notEmpty().withMessage('El token no puede ir vacio'),
    handleInputErrors,
    AuthController.validateToken
)
router.post('/update-password/:token',
    param('token')
        .isNumeric().withMessage('El token no es valido'),

    body('password')
        .isLength({ min: 8 }).withMessage('El password es muy corto, minimo 8 caracteres'),

    body('password_confirmation').custom((value, { req }) => {

        if (value !== req.body.password) {
            throw new Error('Los passwords no son iguales')
        }
        return true;

    }),
    handleInputErrors,
    AuthController.updatePasswordWithToken
)


router.get('/user',

    authenticate,
    AuthController.user
)





//profile
router.put('/profile',
    authenticate,
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacio'),
    body('email')
        .isEmail().withMessage('Email no valido'),
                     
        handleInputErrors,


    AuthController.updateProfile
)

router.put('/update-password',
    authenticate,
    body('current_password')
        .notEmpty().withMessage('El password actual no puede ir vacio'),
     body('password')
        .isLength({ min: 8 }).withMessage('El password es muy corto, minimo 8 caracteres'),

    body('password_confirmation').custom((value, { req }) => {

        if (value !== req.body.password) {
            throw new Error('Los passwords no son iguales')
        }
        return true;

    }),
    handleInputErrors,
    AuthController.updateCurrentUserPassword
)

router.post("/check-password",
    authenticate,
    body('password')
        .notEmpty().withMessage('El password no puede ir vacio'),
    handleInputErrors,
    AuthController.checkPassword
)

export default router;