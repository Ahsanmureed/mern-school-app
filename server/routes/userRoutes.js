import express from 'express'
import { allUserController, deleteUserController, loginController, logoutController, refetchUserController, registerController, singleUserController, updateUserController } from '../controller/userController.js';
const userRoutes = express.Router();
userRoutes.post('/login',loginController)
userRoutes.post('/register',registerController
)
userRoutes.post('/logout',logoutController
)
userRoutes.get("/refetch",refetchUserController)
userRoutes.get("/all-students",allUserController)
userRoutes.get("/:id",singleUserController)
userRoutes.put("/:id",updateUserController)
userRoutes.delete("/:id",deleteUserController)
export default userRoutes