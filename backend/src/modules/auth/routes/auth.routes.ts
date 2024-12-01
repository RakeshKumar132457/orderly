import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { asyncHandler } from "../../../shared/middlewares/async-handler.middleware";


/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: objectId
 *           description: The auto-generated MongoDB ObjectId
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         name:
 *           type: string
 *           description: User's full name
 *     
 *     RegisterUserDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - name
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           minLength: 6
 *           description: User's password (min 6 characters)
 *         name:
 *           type: string
 *           description: User's full name
 *     
 *     LoginUserDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           description: User's password
 *     
 *     AuthResponse:
 *       type: object
 *       required:
 *         - user
 *         - token
 *       properties:
 *         user:
 *           $ref: '#/components/schemas/User'
 *         token:
 *           type: string
 *           description: JWT authentication token
 */

const router = Router();
const controller = new AuthController();

router.post("/register", asyncHandler(controller.register.bind(controller)));
router.post("/login", asyncHandler(controller.login.bind(controller)));

export const authRoutes = router;
