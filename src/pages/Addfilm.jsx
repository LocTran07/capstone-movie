import React, { useState } from 'react'
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
} from 'antd';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addFilm } from '../redux-toolkit/quanLyPhim';
import moment from 'moment';

const AddFilm = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({

    })
    // dispatch 
    const dispatch = useDispatch()
    // usestate 
    const [ImgUrl, setImgUrl] = useState('')
    return (
        <form onSubmit={handleSubmit((data) => {
            // ep kieu 
            const newNum = Number(data.danhGia)
            const newDate = moment(data.ngayKhoiChieu).format('DD/MM/YYYY')
            // tao formdata 
            const formData = new FormData()
            // add gia tri key/value vo formdata
            for (let i in data) {
                if (i === 'hinhAnh') {
                    formData.append('File', data.hinhAnh)
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
            console.log(data);
            // dispatch(addFilm(formData))
            // alert("Thêm phim thành công")

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
                <Switch onChange={checked => { setValue('sapChieu', checked) }}></Switch>
            </div>
            <div label="">
                <p className='mb-5 mt-7'>Đang chiếu:</p>
                <Switch onChange={checked => { setValue('sapChieu', checked) }}></Switch>
            </div>
            <div label=" ">
                <p className='mb-5 mt-7'>Hot:</p>
                <Switch onChange={checked => { setValue('hot', checked) }}></Switch>
            </div>
            <div label=" ">
                <p className='mb-5 mt-7'>Số sao:</p>
                <input required {...register('danhGia')} type="number" min={1} max={10} className="border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " />
            </div>
            <div className=' mb-2'>
                <p className='mb-5 mt-7'>Hình ảnh: </p>
                <input required type="file" accept="image/jpg, image/jpeg, image/png, image/gif" className="p-0"
                    onChange={(e) => {
                        // lay file ra 
                        const file = e.target.files[0]
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
                        // set value cho hinhAnh 
                        setValue('hinhAnh', file)

                    }} />
            </div>
            <div className=' mb-2'>
                <img src={ImgUrl} alt="..." className='w-40 h-40 bg-gray-200' />
            </div>
            <button className='mt-10 px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-800 transition duration-300'>Thêm phim</button>
        </form>
    );
};
export default AddFilm;