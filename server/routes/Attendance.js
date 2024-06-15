import express from 'express';
import { allAttendenceSheet, deleteAttendenceController, gradeController, takeAttendeceController, updateAttendenceController, userAttendanceController } from '../controller/attendenceController.js';
const AttendanceRoutes= express.Router();
AttendanceRoutes.post('/create',takeAttendeceController)
AttendanceRoutes.put('/:id',updateAttendenceController)
AttendanceRoutes.delete("/:id",deleteAttendenceController)
AttendanceRoutes.get("/get-all-attendance",allAttendenceSheet)
AttendanceRoutes.get('/user-attendance/:student',userAttendanceController)
AttendanceRoutes.get('/:student',gradeController)
AttendanceRoutes.get("/all-student-grades")
export default AttendanceRoutes