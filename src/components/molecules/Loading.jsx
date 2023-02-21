import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

const Loading = () => {
    // useselector
    const { loading } = useSelector(state => state.loadingReducer)

    // if (loading) {
    //     return (
    //         <div className='z-10' style={{ position: "fixed", top: 0, bottom: 0, width: "100%", height: '100%', backgroundColor: 'rgb(0 0 0 / 40%)' }}>
    //             <span className='text-white text-3xl'>loading....</span>
    //         </div>
    //     )
    // } else {
    //     return <Fragment></Fragment>
    // }
    return <div>
        {loading ?
            <div className='z-10 flex justify-center items-center' style={{ position: "fixed", top: 0, bottom: 0, width: "100%", height: '100%', backgroundColor: 'rgb(0 0 0 / 40%)' }}>
                <span className='text-white text-3xl'>loading....</span>
            </div> :
            <Fragment></Fragment>}
    </div>
}

export default Loading