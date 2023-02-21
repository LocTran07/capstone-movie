import { Carousel } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBannerList } from '../../redux-toolkit/quanLyPhim';
import _ from 'lodash';
import styled from 'styled-components'

const contentStyle = {
  
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',

};
const CarouselHome = () => {

  const onChange = (currentSlide) => {
  };
  // dispatch and selector
  const dispatch = useDispatch()
  const { bannerList } = useSelector((state) => state.quanLiPhimReducer)
  useEffect(() => {
    dispatch(getBannerList())
  }, [])

  return (
    <Wrapper className='CarouselHome'>
      <Carousel autoplay afterChange={onChange}>
        {bannerList?.map(item => {
          return (
            <div key={item.maPhim} >
              <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})`, backgroundPosition: 'top center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>

                <img src={item.hinhAnh} className='w-full h-[400px]  opacity-0 ' alt="" />
              </div>
            </div>
          )
        })}

      </Carousel>

    </Wrapper>
  );
};
export default CarouselHome;
const Wrapper = styled.div`
  &.CarouselHome{
    .slick-dots{
      width: auto;
    }
  }
`