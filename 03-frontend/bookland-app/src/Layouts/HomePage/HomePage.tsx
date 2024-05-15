import React from 'react'

import { ExploreTopBooks } from './component/ExploreTopBooks';
import { Carousel } from './component/Carousel';
import { Hero } from './component/Hero';
import { LibraryServices } from './component/LibraryServices';

export const HomePage = () => {
    return(
        <> {/* react specific way: parent component */}
            <ExploreTopBooks/>
            <Carousel/>
            <Hero/>
            <LibraryServices/>
        </>
    )
}