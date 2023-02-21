import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const CardMovie = ({ film }) => {

    const navigate = useNavigate()
    return (
        <section className="text-gray-700 body-font CardMovie">
            <div className="container px-5 py-2 mx-auto ">
                {/* <div className="flex flex-wrap -m-4"> */}
                <div className="p-4 ">
                    <div className="h-full bg-gray-200 bg-opacity-75 px-8 pt-16 pb-2 rounded-lg overflow-hidden text-center relative">
                        <div className="w-full h-[200px] bg-cover bg-no-repeat bg-top rounded-lg " style={{ backgroundImage: `url(${film.hinhAnh})` }}  ></div>
                        <h1 className=" leading-[22px] title-font  text-lg font-medium text-gray-900 mt-9 mb-0 h-[47px] ">{film.tenPhim}</h1>
                        <StyledP className="leading-relaxed mb-3 h-[45px]">{film.moTa}</StyledP>
                        <a onClick={() => { navigate(`detail/${film.maPhim}`) }} className="text-indigo-500 text-[17px] inline-flex py-5 px-10 items-center"> Đặt vé
                            <svg className="w-10 h-10 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="M12 5l7 7-7 7" />
                            </svg>
                        </a>
                        {/* <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                                <span className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                    <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx={12} cy={12} r={3} />
                                    </svg>1.2K
                                </span>
                                <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                                    <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                    </svg>6
                                </span>
                            </div> */}
                    </div>
                </div>
                {/* </div> */}
            </div>
        </section>
    )
}

export default CardMovie
const StyledP = styled.p`
      text-overflow:ellipsis;
  overflow:hidden;
  // Addition lines for 2 line or multiline ellipsis
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
`