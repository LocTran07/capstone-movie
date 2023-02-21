import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieList } from '../../redux-toolkit/quanLyPhim'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from 'styled-components';
import CardMovie from './CardMovie';
import { Button } from 'antd';
import cn from 'classnames'
const MenuHome = () => {
    //call api
    const dispatch = useDispatch()
    useEffect(() => { dispatch(getMovieList()) }, [])
    // lay movielist
    const { movieList } = useSelector(state => state.quanLiPhimReducer)

    // state 
    const [value, setValue] = useState(true)

    // setting react slick
    const settings = {
        className: "center ",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 4,
        speed: 500,
        rows: 2,
        slidesPerRow: 1,
        variableWidth: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    // slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    // slidesToScroll: 2,
                    initialSlide: 2,
                
                }
            },
           
        ]
    };

    // custom arrow
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "white" }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "white" }}
                onClick={onClick}
            />
        );
    }
    return (
        <Wrapper className="MenuHome m-auto py-20 w-[80%] xl:w-[90%]">
            <div className='mb-10'>
                {/* #1890ff */}
                <Button className={cn('', { ButtonActive: value === true })} onClick={() => { setValue(true) }} >Phim Đang Chiếu</Button>
                <Button className={cn('ml-10', { ButtonActive: value === false })} onClick={() => { setValue(false) }}>Phim Sắp Chiếu</Button>
            </div>
            <Slider {...settings}>

                {movieList.filter(film => film.dangChieu === value).map(film => {
                    return (
                        <div key={film.maPhim}>
                            <CardMovie film={film}></CardMovie>
                        </div>
                    )
                })}

            </Slider>
        </Wrapper>
    );
}
export default MenuHome

const Wrapper = styled.div`
    &.MenuHome{
        /* max-width: 800px; */
        /* margin: auto; */
    
        h2{
        color: red;
        }
        .slick-prev{
            background-color: white;
            &:before{
                color: gray;
                font-size: 25px;

            }
        }
        .slick-next{
            background-color: white;
            &:before{
                color: gray;
                font-size: 25px;
            }
        }
        .ButtonActive{
            border-color: #40a9ff;
            background: #40a9ff;
            color: white;
        }
    }
`