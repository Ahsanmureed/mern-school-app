import React from 'react'
import img from '../assets/kid.png'
const Home = () => {
  return (
    <div className='  text-white  bg-[#486235] huh h-[88vh] overflow-hidden flex items-center justify-between font-serif px-[4vw] '>
      <div>

        <h1 className=' text-6xl mb-1'>I Love to learn!
        </h1>
        <h1 className=' text-6xl mb-2'>Welcome back school!</h1>
        <p className=' w-[90%] text-[19px] text-start'>Perspiciatis unde omnis iste natus error sit voluptatem accusantium totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
</p>
      </div>
      <div>

        <img src={img} className=' w-[90vw] h-[88vh] overflow-hidden mt-3' alt="" />
      </div>
    </div>
  )
}

export default Home
