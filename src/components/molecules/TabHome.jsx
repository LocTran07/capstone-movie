import { Tabs } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSystem } from '../../redux-toolkit/quanLyRap';
import * as moment from 'moment';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const TabHome = () => {
    // const [tabPosition, setTabPosition] = useState('left');
    // const changeTabPosition = (e) => {
    //     // setTabPosition(e.target.value);
    // };
    // dispatch 
    const dispach = useDispatch()
    useEffect(() => { dispach(getSystem()) }, [])
    // selector 
    const { heThongRap } = useSelector(state => state.quanLiRapReducer)
   
   // navigate 
   const navigae = useNavigate()
    return (
        <StyledDiv className='TabHome my-15'>
            {/* // load he thong */}

            <Tabs
                tabPosition={'left'}
                items={heThongRap?.map((heThong, index) => {
                    return {
                        label: <img className='h-[35px]' src={heThong.logo} alt="" />,
                        key: index,
                        children:
                            // load cum rap
                            <Tabs
                                tabPosition={'top'} items={heThong.lstCumRap.slice(0, 4).map((cumRap, index) => {
                                    return {
                                        label: <div className='flex items-center  mb-5'><img className='h-[45px]  rounded-md inline-block mr-5' src={cumRap.hinhAnh} alt="qwe" /> <p className='mb-0 w-full'> {cumRap.tenCumRap}</p></div>,
                                        key: index,
                                        children: cumRap.danhSachPhim.slice(0, 3).map((film, index) => {
                                            return <div key={index}>
                                                <div className='sm:flex card items-center mt-10 sm:mt-0 gap-15'>
                                                    <img className='w-[70px] rounded-md sm:inline-block sm:mb-10 ' src={film.hinhAnh} alt="" />
                                                    <div className='info overflow-x-auto'>
                                                        <p className='text-[20px] mb-10'>{film.tenPhim}</p>
                                                        <div className=' grid grid-cols-3 sm:grid-cols-6 gap-15 lichChieu'>
                                                            <div>
                                                                <p className='text-black  w-[74px]'>Số Rạp:</p>
                                                                <p className='text-black  w-[74px]'>Giá Vé:</p>
                                                                <p className='text-black  w-[74px]'>Giờ Chiếu:</p>
                                                            </div>
                                                            {film.lstLichChieuTheoPhim.slice(0, 5).map((lichChieu, index) => {
                                                                return <div className='' key={index}>
                                                                    <p className='text-blue-400'>{lichChieu.tenRap}</p>
                                                                    <p className='text-blue-400'>{(lichChieu.giaVe).toLocaleString()}</p>
                                                                    <p onClick={()=>{
                                                                        navigae(`/bookingTicketLayout/bookingTicket/${lichChieu.maLichChieu}`)
                                                                    }} 
                                                                    className='text-blue-400 cursor-pointer'>{moment(lichChieu.ngayChieuGioChieu).format('h:mm a')}</p>

                                                                </div>
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                            </div>
                                        })
                                    };
                                })}
                            />,
                    };
                })}
            />


        </StyledDiv>
    );
};
export default TabHome;

const StyledDiv = styled.div`
    &.TabHome{
        .ant-tabs-content-holder{
            .ant-tabs {
                    .ant-tabs-nav-list{
                    gap: 22px
                }
                
            }
        }
    }
`