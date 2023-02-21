import moment from 'moment'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { quanLiRapService } from '../services'
import { quanLiBookingService } from '../services/quanLiBookingService'

const Showtime = () => {
  // react hook form 
  const { register, handleSubmit } = useForm()
     // useparam 
     const param = useParams()
  // usestate 
  const [state, setState] = useState({
    heThongRap: [],
    cumRap: []
  })
  // const [maCumRap, setMaHeThong] = useState('')
  // use effect
  useEffect(() => {
    const abc = async () => {
      try {
        const res = await quanLiRapService.getInfoSystem()
        setState({
          ...state,
          heThongRap: res.data.content
        })
      } catch (err) {
        console.log(err);
      }
      
    }
    abc()
  }, [])

  console.log(state);
  return (
    <div className='ShowTime'>
      <form action="" onSubmit={handleSubmit(data => {
        console.log(data);
        const newGia = +data.giaVe
        const newgio = moment(data.ngayChieuGioChieu).format('DD/MM/YYYY hh:mm:ss')
        const data1 = {...data,giaVe:newGia,ngayChieuGioChieu:newgio,maPhim:+param.id3}
        console.log(data1);
        const taoLich = async ()=> {
          try{
        const res = await  quanLiBookingService.taoLich(data1)
        alert(res.data.content);
          }catch(err){
            alert( err.response.data.content);
          }
        }
        taoLich()
      })}>
        {/* he thong */}
        <div className=' mb-2'>
          <p className='m-0 font-semibold w-40 '>Hệ thống rạp: </p>
          <select onChange={async (e) => {
            try {
              const res = await quanLiRapService.getCumRapTheoHeThong(e.target.value)
              setState({
                ...state,
                cumRap: res.data.content
              })
            } catch (err) {

            }
          }}
            className="flex-1 border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 ">
            <option value=''>Chọn hệ thống rạp</option>
            {state.heThongRap.map((item, index) => {
              return <option value={item.maHeThongRap} key={index}>
                {item.tenHeThongRap}
              </option>
            })}
          </select>
        </div>
        {/* cum rap  */}
        <div className=' mb-2'>
          <p className='m-0 font-semibold w-40 '>Hệ cụm rạp: </p>
          <select  {...register('maRap')}  className="flex-1 border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 ">
            <option value='' >Chọn hệ cụm rạp</option>
            {state.cumRap.map((item, index) => {
              return <option value={item.maCumRap} key={index}>{item.tenCumRap}</option>
            })}
          </select>
        </div>

        {/* ngay gio  */}
        <div className=' mb-2'>
          <p className='m-0 font-semibold w-40 '>Chọn thời gian: </p>
          <input {...register('ngayChieuGioChieu')} type="datetime-local" className="border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " />
        </div>

        {/* gia  */}
        <div className=' mb-2'>
          <p className='m-0 font-semibold w-40 '>Chọn giá: </p>
          <input {...register('giaVe')} min={75000} max={250000} type="number" />
        </div>
        <button className='px-7 py-3 bg-blue-600 mt-10 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-800 transition duration-300'>Thêm lịch chiếu</button>
      </form>
    </div>
  )
}

export default Showtime