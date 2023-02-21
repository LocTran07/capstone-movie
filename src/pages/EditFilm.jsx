import moment from 'moment'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addFilm, getEdit, updateFilm } from '../redux-toolkit/quanLyPhim'
import {
    Switch,

} from 'antd';
import { useForm } from 'react-hook-form';

const EditFilm = () => {
    // react hook
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
    })
    // usestate
    const [ImgUrl, setImgUrl] = useState('')
    // useparam 
    const param = useParams()
    // dispatch 
    const dispatch = useDispatch()
    // use selector 
    const { edit } = useSelector(state => state.quanLiPhimReducer)
    console.log(edit);
    // useeffect 
    useEffect(() => {
        dispatch(getEdit(param.id2))
        
    }, [])
    useEffect(() => {
        reset({
            tenPhim: edit.tenPhim,
            trailer: edit.trailer,
            moTa: edit.moTa,
            dangChieu: edit.dangChieu,
            sapChieu: edit.sapChieu,
            hot: edit.hot,
            danhGia: edit.danhGia,
            ngayKhoiChieu: moment(edit.ngayKhoiChieu).format('YYYY-MM-DD'),
            hinhAnh : null,
        })
       
    }, [edit])


    return (
        <div className='EditFilm'>
            <form onSubmit={handleSubmit((data) => {
                console.log(data);
                // ep kieu 
                const newNum = Number(data.danhGia)
                const newDate = moment(data.ngayKhoiChieu).format('DD/MM/YYYY')
                // tao formdata 
                const formData = new FormData()
                // add gia tri key/value vo formdata
                for (let i in data) {
                    if (i === 'hinhAnh') {
                        if(data[i] !== null){
                        formData.append('File', data.hinhAnh, data.hinhAnh.name)
                        }
                    } else if (i === 'danhGia') {
                        formData.append('danhGia', newNum)
                    }
                    else if (i === 'ngayKhoiChieu') {
                        formData.append('ngayKhoiChieu', newDate)
                    }
                    else {
                        formData.append(i, data[i])
                    }
                }
                formData.append('maNhom', 'GP13')
                formData.append('maPhim',edit.maPhim)
                dispatch(updateFilm(formData))
                // alert("Cập nhật phim thành công")

            })}>
                <div label="Tên phim">
                    <p className='mb-5 mt-7'>Tên phim:</p>
                    <input {...register('tenPhim')} type="text" className=' border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600' />
                </div>
                <div label="Trailer">
                    <p className='mb-5 mt-7'>Trailer:</p>
                    <input {...register('trailer')} type="text" className=' border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600' />
                </div>
                <div label="Mô tả">
                    <p className='mb-5 mt-7'>Mô tả:</p>
                    <input {...register('moTa')} type="text" className=' border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600' />
                </div>
                <div label=" ">
                    <p className='mb-5 mt-7'>Ngày khởi chiếu:</p>
                    <input {...register('ngayKhoiChieu')} type="date" className=' border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600' />
                </div>
                <div label=" ">
                    <p className='mb-5 mt-7'>Sắp chiếu:</p>
                    <Switch defaultChecked={`${edit.sapChieu}`} onChange={checked => { setValue('sapChieu', checked) }}></Switch>
                </div>
                <div label="">
                    <p className='mb-5 mt-7'>Đang chiếu:</p>
                    <Switch defaultChecked={`${edit.dangChieu}`} onChange={checked => { setValue('sapChieu', checked) }}></Switch>
                </div>
                <div label=" ">
                    <p className='mb-5 mt-7'>Hot:</p>
                    <Switch defaultChecked={`${edit.hot}`} onChange={checked => { setValue('hot', checked) }}></Switch>
                </div>
                <div label=" ">
                    <p className='mb-5 mt-7'>Số sao:</p>
                    <input required {...register('danhGia')} type="number" min={1} max={10} className="border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " />
                </div>
                <div className=' mb-2'>
                    <p className='mb-5 mt-7'>Hình ảnh: </p>
                    <input type="file" accept="image/jpg, image/jpeg, image/png, image/gif" className="p-0"
                        onChange={(e) => {

                            // lay file ra 
                            const file = e.target.files[0]
                            // set value cho hinhAnh 
                            setValue('hinhAnh', file)
                            //tao doi tuong de doc 
                            const reader = new FileReader()
                            // doc file 
                            reader.readAsDataURL(file)
                            // bat su kien onload
                            // lay dc link base64
                            reader.onload = (e) => {
                                // setImgUrl 
                                setImgUrl(e.target.result)
                            }


                        }} />
                </div>
                <div className=' mb-2'>
                    <img src={ImgUrl || edit.hinhAnh} alt="..." className='w-40 h-40 bg-gray-200' />
                </div>
                <button className='mt-10 px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-800 transition duration-300'>Cập nhật phim</button>
            </form>

        </div>
    )
}

export default EditFilm