import express from "express";
import { addLeaveController, allLeaveController, deleteLeaveController, updateLeaveController, userLeaveController } from "../controller/leaveController.js";
const leaveRoutes= express.Router();
leaveRoutes.get("/user-leaves/:id",userLeaveController);
leaveRoutes.get("/all-leaves",allLeaveController);
leaveRoutes.post("/create",addLeaveController);
leaveRoutes.put("/:id",updateLeaveController);
leaveRoutes.delete("/:id",deleteLeaveController);
export default leaveRoutes