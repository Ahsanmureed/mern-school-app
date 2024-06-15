import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
const AdminTakeAttendance = ({onclose,fetch}) => {
  const [loading,setLoading]=useState(false)
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/api/v1/all-students`);
      setStudents(response.data.students);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const attendanceData = students.map(student => ({
        _id: student._id
      }));
      await axios.post(`${import.meta.env.VITE_URL}/api/v1/attendance/create`, { students: attendanceData });
       onclose();
       fetch()
       setLoading(false)
    } catch (error) {
      console.error( error);
      setLoading(false)
    }
  };
  return (
    <div className=' fixed bg-slate-200 bg-opacity-100 left-72 top-[4.4rem] right-0  w-[60vw] overflow-y-scroll   z-20 mt-3 h-[80vh]'>
         <RxCross1 onClick={onclose} className=' absolute right-3 top-3 text-[21px] cursor-pointer'/>
         <div className=' flex items-center justify-center flex-col mt-40 '>
      <h2 className=' text-2xl font-medium mb-1  '>Take Attendance</h2>
      <h1><strong className=' text-[17px]'>Date: </strong>{moment(Date.now()).format('LL')}</h1>
      <button disabled={loading} className=' text-[21px] px-3 py-1  bg-[#486235] flex  text-white mt-4 rounded-md' onClick={handleSubmit}>Take Attendance</button>
    </div>


    </div>
  )
}

export default AdminTakeAttendance
