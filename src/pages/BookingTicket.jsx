import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { json, useNavigate, useParams } from 'react-router-dom';
import { Navigate, Link, redirect } from 'react-router-dom'
import styled from 'styled-components';
import { datVe, getRoom, quanLiBookingAction, quanLiBookingReducer } from '../redux-toolkit/quanLiBooking';
import { TOKEN, USER_lOGIN } from '../utils/setting'
import { CloseOutlined, UserOutlined } from '@ant-design/icons'
import _, { get } from 'lodash';
import { quanLiBookingService } from '../services/quanLiBookingService';
import { Tabs } from 'antd';
import { getInfoUser, QuanLiUserAction } from '../redux-toolkit/quanLyUser';
import moment from 'moment';
import { useState } from 'react';

//01 CHỌN GHẾ VÀ THANH TOÁN
const BookingTicket = () => {
  // useselector
  const { userLogin } = useSelector(state => state.quanLiUserReducer)
  const { room, gheDaDat, } = useSelector(state => state.quanLiBookingReducer)
  const { thongTinPhim, danhSachGhe } = room


  // dispatch
  const dispatch = useDispatch()
  // useParam
  const param = useParams()


  //useeffect
  useEffect(() => {
    dispatch(getRoom(param.id1))
    dispatch(quanLiBookingAction.reset([]))

  }, [])
  // redirect 
  if (!localStorage.getItem(USER_lOGIN)) {
    return <Navigate replace to="/user/login" />;
  }

  return (
    <div className='lg:grid lg:grid-cols-4 px-5 ChonGhe'>
      <Styleddiv className='col-span-3 mt-15'>
        <div className='theater'>
          <div className='hinh_chunhat'>
          </div>
          <div className='hinh_thang text-center'>
            Màn hình
          </div>
          <div className='rap md:p-15'>
            {danhSachGhe?.map((ghe, index) => {

              let loaighe = ghe.loaiGhe === 'Vip' ? 'gheVip' : ''
              let daDat = ghe.daDat === true ? 'gheDaDat' : ''
              // ghe dang dc chon
              let classDaDat = ''
              let index1 = gheDaDat?.findIndex(ghedd => ghedd.maGhe === ghe.maGhe)
              if (index1 !== -1) { classDaDat = 'gheDangDat' }
              // ghe minh dat
              let gheMinhDat = ghe.taiKhoanNguoiDat === JSON.parse(localStorage.getItem(USER_lOGIN)).taiKhoan ? 'gheMinhDat' : ''


              return <button
                onClick={() => {
                  dispatch(quanLiBookingAction.datGhe(ghe))
                }}
                disabled={ghe.daDat}
                key={index}
                className={`ghe ${loaighe} ${daDat} ${classDaDat} ${gheMinhDat}`}>{ghe.daDat ? gheMinhDat ? <UserOutlined /> : <CloseOutlined className='text-[19px]' /> : ghe.stt}
              </button>
            })}
          </div>
        </div>
        <div className='mt-20 sm:mt-0'>
          <table className="m-auto table-auto border-collapse border border-slate-400 mb-20">
            <thead>
              <tr>
                <th colSpan={10} className="border border-slate-300  ">Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-5 border border-slate-300 ...">Ghế trống</td>
                <td className="border border-slate-300 ..."><div className="ghe m-7" /></td>
              </tr>
              <tr>
                <td className="px-5 border border-slate-300 ...">Ghế đã được đặt</td>
                <td className="border border-slate-300 ..."><div className="ghe gheDaDat flex justify-center items-center "> <CloseOutlined className="text-[19px] "> </CloseOutlined></div></td>

              </tr>
              <tr>
                <td className="px-5 border border-slate-300 ...">Ghế đang chọn</td>
                <td className="border border-slate-300 ..."><div className="ghe gheDangDat" /></td>

              </tr>
              <tr>
                <td className="px-5 border border-slate-300 ...">Ghế vip</td>
                <td className="border border-slate-300 ..."><div className="ghe gheVip" /></td>

              </tr>
              <tr>
                <td className="px-5 border border-slate-300 ...">Ghế mình đã đặt</td>
                <td className="border border-slate-300 ..."><div className="ghe  gheMinhDat flex justify-center items-center "> <UserOutlined /></div></td>

              </tr>
            </tbody>
          </table>
        </div>

      </Styleddiv>
      <div className=' relative'>
        <p className='text-xl mb-[14px] text-center text-green-600'>{gheDaDat.reduce((total, item) => { return total += item.giaVe }, 0).toLocaleString()} VND</p>
        <hr />
        <div className=''>
          <p className='text-xl font-semibold'>{thongTinPhim?.tenPhim}</p>
          <p className=''>Địa điểm: {thongTinPhim?.diaChi} </p>
          <p>Ngày chiếu: {thongTinPhim?.gioChieu} - {thongTinPhim?.ngayChieu} </p>
        </div>
        <hr />
        <div className=''>
          <p className='max-w-[330px] text-xl mb-[5px] text-red-600 overflow-x-auto'>Ghế: {_.sortBy(gheDaDat, 'stt').map((ghedd, index) => <span key={index}>{ghedd.stt},</span>)} </p>
          <p className='text-xl mb-[5px] col-span-2'>{gheDaDat.reduce((total, item) => { return total += item.giaVe }, 0).toLocaleString()} vnd</p>
        </div>
        <hr />
        <div>
          <p className='mb-0 font-medium'>Email:</p>
          <p> {userLogin.email}</p>
        </div>
        <hr />
        <div>
          <p className='mb-0 font-medium'>Số điện thoại:</p>
          <p> {userLogin.soDT}</p>
        </div>
        <hr />
        <div
          onClick={() => {
            const a = {
              maLichChieu: param.id1,
              danhSachVe: gheDaDat
            }
            if (a.danhSachVe.length >= 1) {
              dispatch(datVe(a))
            } else {
              alert('Vui lòng chọn ghế')
            }
          }}
          className=' w-full cursor-pointer '>
          <p className=' text-xl mb-[14px] py-4 text-center text-white bg-green-600'>Đặt vé</p>
        </div>
      </div>
    </div>
  )
}

//02 KẾT QUẢ ĐẶT VÉ
const KetQuaDatVe = () => {
  // lay thong tin user
  const { userLogin, infoUser } = useSelector(state => state.quanLiUserReducer)
  console.log('asdasd', infoUser);
  const { thongTinDatVe } = infoUser

  // dispatch
  const dispatch = useDispatch()

  //useeffect 
  useEffect(() => {
    dispatch(getInfoUser())
  }, [])
  return (
    <div className='KetQuaDatVe'>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-20 mx-auto">
          <Link rel="noopener noreferrer" to='/' aria-label="Back to homepage" className="flex items-center p-2 pl-[8px]">
            <img className='h-[70%] w-[150px] mb-10' src="https://cybersoft.edu.vn/wp-content/uploads/2017/03/MIN-OP1.png" alt="" />
          </Link>
          <div className="flex flex-col w-full mb-20">
            <h2 className=" text-indigo-500 tracking-widest font-medium title-font mb-10 sm:text-[17px]">Thông Tin Khách Hàng</h2>
            <p className='mb-10'>Họ Tên: {userLogin.hoTen} </p>
            <p className='mb-10'>Email: {userLogin.email} </p>
            <p className='mb-10'>Số Điện Thoại: {userLogin.soDT}</p>
          </div>
          <h1 className="sm:text-2xl text-xl font-medium title-font text-gray-900">Lịch Sử Đặt Vé</h1>
          <div className="flex flex-wrap -m-4">
            {thongTinDatVe?.map((ticket, index) => {
              return (
                <div key={index} className="p-4 w-full md:w-1/3">
                  <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                    <div className="flex justify-center items-center mb-3">
                      <img className='w-[100px] rounded-md' src={ticket.hinhAnh} alt="" />
                    </div>
                    <h2 className="text-gray-900 text-lg title-font font-medium ">{ticket.tenPhim}</h2>
                    <div className="flex-grow">
                      <div className='text-[16px] overflow-x-auto mb-5 max-w-[402px] '>
                        <span className='font-medium'>Số ghế: </span>
                        {_.sortBy(ticket?.danhSachGhe, 'tenGhe')?.map((seat, index) => {
                          return (
                            <span className='ml-2 inline-block' key={index}>{seat.tenGhe},</span>
                          )
                        })}

                      </div>
                      <p className="leading-relaxed text-base mb-5"><span className='font-medium'>Giờ chiếu: </span>{moment(ticket.ngayDat).format('HH:MM A - DD/MM/YYYY')}</p>
                      <p className="leading-relaxed text-base mb-5"><span className='font-medium'>Địa chỉ: </span>{_.first(ticket.danhSachGhe).tenRap} - {_.first(ticket.danhSachGhe).tenHeThongRap} </p>
                      {/* <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                      </a> */}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}



const App = () => {
  // use selector
  const { value } = useSelector(state => state.quanLiBookingReducer)
  const { userLogin } = useSelector(state => state.quanLiUserReducer)

  // use Dispatch
  const dispatch = useDispatch()
  const onChange = (key) => {
    dispatch(quanLiBookingAction.setValue(key))
  }
  //
  const navigate = useNavigate()
  // useeffect 
  useEffect(() => {
    dispatch(quanLiBookingAction.setValue('1'))
  }, [])
  // extra bar
  const operations = <p className='mb-0 p-5 '> Xin chào {userLogin.hoTen}
    <span onClick={() => {
      // window.location.reload()
      dispatch(QuanLiUserAction.dangXuat())
      navigate('/')
    }} className='mb-0 px-8 py-3 text-black font-semibold cursor-pointer'>Đăng xuất
    </span>
  </p>
  return (

    <Tabs className='TabsBooking p-7'
      defaultActiveKey='1'
      activeKey={value}
      onChange={onChange}
      tabBarExtraContent={operations}
      items={[
        {
          label: `01 CHỌN GHẾ VÀ THANH TOÁN`,
          key: '1',
          children: <BookingTicket></BookingTicket>,
        },
        {
          label: `02 KẾT QUẢ ĐẶT VÉ`,
          key: '2',
          children: <KetQuaDatVe></KetQuaDatVe>,
        },
      ]}
    />
  );
}
export default App;



































// .ghe {
//   margin-top: 10px;
//   height: 25px;
//   width: 18px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   /* margin: 7px; */
//   background-color: grey;
//   color: white;
//   font-size: 9px;
// }
const Styleddiv = styled.div`
.rap{
  grid-template-columns: repeat(16, minmax(0, 1fr));
  display: grid;
}
  .hinh_thang{
  border-bottom: 50px solid #8080802b;
	border-left: 25px solid transparent;
	border-right: 25px solid transparent;
	height: 0;
	width: 60%;
  margin: 0 auto;
}

  .hinh_chunhat{
    height: 4px;
    width: 65%;
    background-color: black;
    margin: 0 auto;
  }
  .ghe{
    height: 35px;
    width: 35px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 7px;
    background-color: grey;
    color: white;
  }
  @media screen and (max-width:376px) {
    .ghe {
      margin: 10px auto 0 auto;
      height: 25px;
      width: 18px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      /* margin: 7px; */
      background-color: grey;
      color: white;
      font-size: 9px;
    }
  }
  .gheDaDat{
    background-color: red ;
    cursor: no-drop;
  }
  .gheDangDat {
    background-color: green !important;
  }
  .gheVip {
    background-color: #d3d307;
  }
  .gheMinhDat {
    background-color: purple
  }

`