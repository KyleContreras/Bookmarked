//import { useState } from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar.tsx";
import Searchbar from "../Components/Searchbar/Searchbar.tsx";
import { SearchProvider } from '../contexts/SearchContext.tsx';


const MainLayout = () => {

    return (
        <SearchProvider>
            <Navbar />
            <Searchbar />
            <Outlet />
        </SearchProvider>
    )
};

export default MainLayout;
