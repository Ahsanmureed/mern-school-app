

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";

import AdminSideBar from './AdminSideBar';
import AdminTakeAttendance from './AdminTakeAttendance';
import moment from 'moment';
import Loader from '../components/Loader';
const AdminAttendance = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [attendanceOpen,setAttendanceOpen]= useState(false)
    const [loading,setLoading]=useState(false)

    useEffect(() => {
        fetchAttendanceRecords();
    }, []);

    const fetchAttendanceRecords = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/api/v1/attendance/get-all-attendance`);
            setAttendanceRecords(response.data.data);
            setLoading(false)
        } catch (error) {
            console.error( error);
            setLoading(false)
        }
    };

    const groupAttendanceByDate = () => {
        const groupedAttendance = {};

        attendanceRecords.forEach(record => {
            const date = new Date(record.date).toDateString();
            if (!groupedAttendance[date]) {
                groupedAttendance[date] = [];
            }
            groupedAttendance[date].push(record);
        });

        return groupedAttendance;
    };

    const groupedAttendance = groupAttendanceByDate();
    const handleDeleteAttendance = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_URL}/api/v1/attendance/${id}`);
            fetchAttendanceRecords(); 
           
        } catch (error) {
            console.error( error);
        }
    };
    return (
        <div>
           <AdminSideBar/>
           {
            loading ? <Loader/>:<><div className=' mx-60'>
            <button onClick={()=> setAttendanceOpen(true)} className=' absolute right-3 top-[13%] text-[17px] font-medium text-white px-4 py-1 bg-[#486235] rounded-md'>Take Attendance</button>
             <h2 className=' text-center ml-24 text-2xl font-semibold mt-7 mb-2'>Attendance Record</h2>
            {
                attendanceRecords.length>0 ?<> {Object.keys(groupedAttendance).map(date => (
                    <div key={date}>
                        <h3 className=' text-center ml-24 text-[19px] font-semibold'>{date}</h3>
                        <table className=' w-[74vw]'>
                            <thead>
                                <tr className='bg-[#486235] text-white border-2'>
                                    <th>Student</th>
                                    <th>Status</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedAttendance[date].map(record => (
                                    <tr className=' text-center border-2' key={record._id}>
                                        <td>{record?.student?.username}</td> 
                                        <td className=' bg-[#486235] text-white w-20 rounded-md font-medium'>{record?.status}</td>
                                        <td>
                                            <MdDelete  className=' flex mx-auto text-[19px] cursor-pointer'
                                            onClick={() => handleDeleteAttendance(record._id)}/>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}</>:<h1 className=' text-2xl font-semibold mt-4 text-center ml-28'>No Previous Record Found</h1>
            }
            
            {
                attendanceOpen ?  <AdminTakeAttendance fetch={fetchAttendanceRecords} onclose={()=> setAttendanceOpen(false)}/>:''
            }</div></>
           }
        </div>
    )
}

export default AdminAttendance;