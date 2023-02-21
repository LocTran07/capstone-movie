import { Layout } from 'antd';
import React, { Fragment, useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFilm, getMovieList } from '../redux-toolkit/quanLyPhim/quanLyPhimReducer';
import { Link, NavLink } from 'react-router-dom';
import {EditOutlined,DeleteOutlined,CalendarOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom';
const Film = () => {

    // use selector
    const { movieList } = useSelector(state => state.quanLiPhimReducer)
    console.log(movieList);
    // dispatch 
    const dispatch = useDispatch()
 
    // useEffect 
    useEffect(() => {
        dispatch(getMovieList())
    }, [])
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    // data convert to table
    const data = movieList

    const columns = [
        {
            title: 'Mã Phim',
            dataIndex: 'maPhim',
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            width: '100px',
            sorter: (a, b) => a.maPhim - b.maPhim,
            // sortDirections: ['descend'],
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            render: (text, film) => {
                return <Fragment>
                    <img className='w-[50px]' src={text} alt="" />
                </Fragment>
            },
            width: '100px',
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            width: '100px',
        },
        {
            title: 'Xử lý',
            dataIndex: 'maPhim',
            render: (text, film) => {
                return <Fragment>
                    <NavLink className='ml-5 sm:ml-0' to={`/admin/editfilm/${text}`}><EditOutlined /></NavLink>
                    <button onClick={()=> {
                        if(window.confirm('Bạn có muốn xóa phim')){
                            dispatch(deleteFilm(text))
                        }
                    }} ><DeleteOutlined  className=' text-red-700 ml-5'/>
                    </button>
                    <NavLink className='ml-5 sm:ml-0' to={`/admin/Showtime/${text}`}><CalendarOutlined /></NavLink>

                    </Fragment>
            },
            width: '100px',
        },


    ];


    return (
        <div className='Film'>
            <Link className='px-5 py-3 border border-cyan-400 mb-8 rounded inline-block' to='/admin/addFilm'>Thêm phim mới</Link>
            <h3 className='md:text-2xl'>Quản Lí Phim</h3>
            <Table columns={columns} dataSource={data} onChange={onChange} />
        </div>
    )
}

export default Film