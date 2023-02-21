import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDetailMovie } from '../redux-toolkit/quanLyPhim'
import { getLichChieu } from '../redux-toolkit/quanLyRap'
import moment from 'moment'
import { Tabs } from 'antd'
import { Rate } from 'antd'
import styled from 'styled-components'
const Detail = () => {
    // get param
    const param = useParams()
    //get state 
    const { lichChieu } = useSelector(state => state.quanLiRapReducer)
    const { detailMovie } = useSelector(state => state.quanLiPhimReducer)
    console.log(lichChieu);
    // dispatch 
    const dispatch = useDispatch()
    //usenavigate
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getLichChieu(param.id))
        dispatch(getDetailMovie(param.id))
    }, [])
    return (
        <div className='Detail' style={{ backgroundImage: `url(${detailMovie.hinhAnh})`, backgroundSize: 'cover' }} >
            <div className='  pt-[100px]    '
                style={{
                    width: '',
                    height: ' ',
                    background: 'rgba(255, 255, 255, 0.4)',
                    border: '1px solid rgba( 255, 255, 255, 0.18 )',
                    borderrRadius: '10px',
                    backdropFilter: 'blur(12px)',
                }}>
                <div className='container mx-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-4 '>
                        <div></div>
                        <img className='mx-auto p-15 h-[350px] rounded-xl ' src={detailMovie.hinhAnh} alt="" />
                        {/* <div className='p-15 md:p-0' style={{height:400, backgroundImage: `url(${detailMovie.hinhAnh})`,backgroundSize:'cover' }}></div> */}
                        <div className='p-10 '>
                            <p className='font-medium text-[17px] capitalize '> {detailMovie.tenPhim} </p>
                            <p>Mô Tả: {detailMovie.moTa}</p>
                            <p>Ngày Khởi Chiếu: {moment(detailMovie.ngayKhoiChieu).format('DD/MM/YYYY')}</p>
                            <div><p className='inline-block'>Đánh Giá: </p> <Rate allowHalf value={detailMovie.danhGia / 2} /></div>
                        </div>
                        <div></div>
                    </div>
                    <StyledTab className='TabDetail p-10 md:p-0'>
                        <Tabs className='Tab1'
                            defaultActiveKey="1"
                            style={{
                                marginBottom: 32,
                            }}
                            // he thong
                            items={lichChieu.heThongRapChieu?.map((system, index) => {
                                return {
                                    label: <img className='w-[30px] md:w-[40px] img1' src={system.logo} alt="" />,
                                    key: index,
                                    children:
                                        <Tabs className='Tab2'
                                            defaultActiveKey="1"
                                            style={{
                                                marginBottom: 32,
                                            }}
                                            // cum rap
                                            items={system.cumRapChieu?.map((cumRap, index) => {
                                                return {
                                                    label:
                                                        <div>
                                                            <img className='w-[30px] md:w-[40px]' src={cumRap.hinhAnh} alt="" />
                                                            <p className='mb-7 mt-7 font-medium'>{cumRap.tenCumRap}</p>
                                                            <p className='mb-7 mt-7 '>{cumRap.diaChi}</p>
                                                        </div>,
                                                    key: index,
                                                    children:
                                                        <div>
                                                            <p className='font-medium'>Xuất chiếu:</p>
                                                            <div className='grid grid-cols-2 md:grid-cols-4'>
                                                                {cumRap.lichChieuPhim?.slice(0, 8)?.map((lichChieu1, index) => {
                                                                    return <div key={index}>

                                                                        <Link to={`/bookingTicketLayout/bookingTicket/${lichChieu1.maLichChieu}`} className='mb-10 px-5 rounded-md inline-block text-black hover:text-white bg-blue-400'>{moment(lichChieu1.ngayChieuGioChieu).format('HH:MM A, DD-MM-YYYY')}</Link>
                                                                    </div>
                                                                })}
                                                            </div>
                                                        </div>
                                                }
                                            })}
                                        />
                                }
                            })}
                        />

                    </StyledTab>
                </div>
            </div>
        </div >
    )
}

export default Detail
const StyledTab = styled.div`
        .Tab1{
            min-height: 420px ;
            .ant-tabs-content-holder{
              
            }
    }
`