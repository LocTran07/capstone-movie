import React from 'react'
import CardMovie from '../components/molecules/CardMovie'
import CarouselHome from '../components/molecules/CarouselHome'
import MenuHome from '../components/molecules/MenuHome'
import TabHome from '../components/molecules/TabHome'

const Home = () => {
    return (
        <div>
            <CarouselHome></CarouselHome>
            <div className='container mx-auto'>
                <MenuHome></MenuHome>
                {/* <CardMovie></CardMovie> */}
                <TabHome></TabHome>

            </div>
        </div>
    )
}

export default Home