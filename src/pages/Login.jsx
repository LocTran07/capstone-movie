import React, { useState } from 'react'
import { USER_lOGIN } from '../utils/setting'
import { Link, NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { login, QuanLiUserAction } from '../redux-toolkit/quanLyUser'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Login = () => {
    // useForm
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // dispatch 
    const dispatch = useDispatch();
    // useselector
    const { userLogin, errLogin } = useSelector(state => state.quanLiUserReducer)
    console.log(errLogin);
    console.log(userLogin);
    // usenavigate 
    const navigate = useNavigate()
    // use effect reset err lgin
    // useEffect(()=>{
    //     dispatch(QuanLiUserAction.resetErrLogin())
    // })
 if(!errLogin && userLogin) {
    navigate(-1)
 }
 useEffect(()=>{
    dispatch(QuanLiUserAction.resetErrLogin())
 },[])
    return (
        <div className="Login lg:w-1/2 xl:max-w-screen-sm">
            <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
                <div className="cursor-pointer flex items-center">
                    <Link rel="noopener noreferrer" to='/' aria-label="Back to homepage" className="flex items-center p-2 pl-[8px]">
                        <img className='h-[70%] w-[150px]' src="https://cybersoft.edu.vn/wp-content/uploads/2017/03/MIN-OP1.png" alt="" />
                    </Link>
                </div>
            </div>
            <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold">Đăng Nhập</h2>
                <div className="mt-12">
                    <form onSubmit={handleSubmit((data) => {
                          dispatch(QuanLiUserAction.resetErrLogin())
                        dispatch(login(data))

                        reset({
                            taiKhoan: '',
                            matKhau: ''
                        })

                    })}>
                        <div>
                            <div className="text-sm font-bold text-gray-700 tracking-wide">Tài Khoản</div>
                            <input {...register('taiKhoan', { required: 'Tài khoản không được bỏ trống' })} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập Tài Khoản" />
                            {errors?.taiKhoan?.type === 'required' && <p className='text-red-500'>{errors.taiKhoan.message}</p>}
                        </div>
                        <div className="mt-8">
                            <div className="flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">
                                    Mật Khẩu
                                </div>
                                <div>
                                    <a className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                  cursor-pointer">
                                        Quên Mật Khẩu ?
                                    </a>
                                </div>
                            </div>
                            <input {...register('matKhau', { required: 'Mật khẩu không được bỏ trống' })} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='password' placeholder="Nhập Mật Khẩu" />
                            {errors?.matKhau?.type === 'required' && <p className='text-red-500'>{errors.matKhau.message}</p>}
                        </div>
                        <div className="mt-10">
                            <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg">
                                Đăng Nhập
                            </button>
                            {errLogin ? <p className='text-red-500'>{errLogin}</p> : ''}
                        </div>
                    </form>
                    <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                        Bạn Chưa Có Tài Khoản ? <Link to='/user/register' className="cursor-pointer text-indigo-600 hover:text-indigo-800">Đăng Kí</Link>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Login