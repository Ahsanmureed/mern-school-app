import React from 'react'
import { RxCross1 } from "react-icons/rx";
import moment from 'moment';
const AdminLeaveViewer = ({onclose,leave}) => {
  
  return (
    <div className=' fixed bg-slate-200 bg-opacity-100 left-72 top-[4.4rem] right-0  w-[60vw] overflow-y-scroll   z-20 mt-3 h-[80vh]'>
      <RxCross1 onClick={onclose} className=' absolute right-3 top-3 text-[21px] cursor-pointer'/>
      <div className=' mt-3 ml-3 flex flex-col gap-1'> <h1><strong>Student Name:</strong> {leave?.student?.username}</h1>
      <h1><strong>Reason:</strong> {leave?.reason}</h1>
      <h1><strong>Date: </strong>{moment(leave?.createdAt).format('LL')}</h1>
      </div>

    </div>
  )
}

export default AdminLeaveViewer
