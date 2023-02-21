import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link, useNavigate, } from 'react-router-dom'
import { QuanLiUserAction } from '../../redux-toolkit/quanLyUser';
import { TOKEN, USER_lOGIN } from '../../utils/setting';
import { MenuFoldOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import { useState } from 'react';
const Header = () => {
    const navigate = useNavigate()
    const [isShowing, setisShowing] = useState(false)
    // set hello user
    // let user = {}
    // if (localStorage.getItem(USER_lOGIN)) {
    //     user = JSON.parse(localStorage.getItem(USER_lOGIN))
    // }
    // dispatch 
    const dispatch = useDispatch()
    const { userLogin } = useSelector(state => state.quanLiUserReducer)
    return (
        <Fragment>
            <header className=" dark:bg-gray-800 dark:text-gray-100 fixed z-10 w-full left-0 bg-black bg-opacity-20 ">
                <div className=" w-full container  mx-auto  flex justify-between  h-[70px]">

                    <Link rel="noopener noreferrer" to='/' aria-label="Back to homepage" className="flex items-center p-2 pl-[8px]">
                        <img className='h-[70%] w-[150px]' src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="" />
                    </Link>
                    <ul className="items-stretch hidden mb-0 gap-20  space-x-3 lg:flex">
                        <li className="flex">
                            <NavLink to='/' rel="noopener noreferrer" href="#" className="font-semibold  flex items-center px-4 -mb-1  text-white ">Home</NavLink>
                        </li>
                        <li className="flex">
                            <NavLink to='/' rel="noopener noreferrer" className="font-semibold  flex items-center px-4 -mb-1  text-white  ">Contact</NavLink>
                        </li>
                        <li className="flex">
                            <NavLink to='admin/Film' rel="noopener noreferrer" className="font-semibold  flex items-center px-4 -mb-1 text-white  ">Admin</NavLink>
                        </li>
                    </ul>
                    <div className="items-center flex-shrink-0 hidden lg:flex">
                        {userLogin.hoTen ?
                            <p className='mb-0 '>
                                <span className='mb-0 px-8 py-3 text-white font-semibold cursor-pointer'>Xin chào {userLogin.hoTen}</span>
                                <span onClick={() => {
                                    dispatch(QuanLiUserAction.dangXuat())

                                }} className='mb-0 px-8 py-3 text-white font-semibold cursor-pointer bg-red-500 rounded '>Đăng xuất</span>
                            </p>
                            :
                            <Fragment>
                                <button onClick={() => { navigate('user/login') }} className="text-white font-semibold  self-center px-8 py-3 rounded">Đăng nhập</button>
                                <button className=" text-white self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Đăng kí</button>
                            </Fragment>

                        }
                    </div>
                    <button className="p-4 lg:hidden text-white relative">
                        {!isShowing ? <MenuFoldOutlined onClick={()=>{setisShowing(true)}} className='text-white text-[20px]' />
                        : <FullscreenExitOutlined onClick={()=>{setisShowing(false)}} className='text-white text-[20px]' />}
                        {/* <MenuFoldOutlined onClick={()=>{setisShowing(false)}} className='text-white text-[20px]' />
                        <FullscreenExitOutlined onClick={()=>{setisShowing(true)}} className='text-white text-[20px]' /> */}
                        {isShowing ? (<div className='py-[5px] absolute flex flex-col justify-evenly items-center w-[150px] right-[5px] bg-slate-400 rounded'>
                            <NavLink to='/' rel="noopener noreferrer" href="#" className="font-semibold  flex items-center px-4 -mb-1  text-white ">Home</NavLink>
                            <NavLink to='/' rel="noopener noreferrer" className="font-semibold  flex items-center px-4 -mb-1  text-white  ">Contact</NavLink>
                            <NavLink to='admin/Film' rel="noopener noreferrer" className="font-semibold  flex items-center px-4 -mb-1 text-white  ">Admin</NavLink>
                            {userLogin.hoTen ?
                                <p className='mb-0 '>
                                    <span className='mb-0 px-8 py-3 text-white font-semibold cursor-pointer'>{userLogin.hoTen}</span>
                                    <span onClick={() => {
                                        dispatch(QuanLiUserAction.dangXuat())
                                    }} className=' block mb-0 px-8 py-3 text-white font-semibold cursor-pointer bg-red-500 rounded '>Đăng xuất</span>
                                </p>
                                :
                                <Fragment>
                                    <button onClick={() => { navigate('user/login') }} className="text-white font-semibold  self-center px-8 py-3 rounded">Đăng nhập</button>
                                    <button className=" text-white self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Đăng kí</button>
                                </Fragment>

                            }

                        </div>) : "" }
                    </button>

                </div>
            </header>
        </Fragment>
    )
}

export default Header