// import { useEffect, useState } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import MainLayout from "./layouts/MainLayout.tsx";
import BooksPage from "./Components/Book/BooksPage.tsx";
import ProfilesPage from "./Components/Profile/ProfilesPage.tsx";
import AccountPage from "./Components/Account/AccountPage.tsx";
import MyProfilePage from "./Components/Profile/MyProfilePage.tsx";
import { SearchProvider } from './contexts/SearchContext';
import MyBookcasePage from "./Components/Bookcase/MyBookcasePage.tsx";
//import MyBookReview from "./Components/MyBookReview/MyBookReview.tsx";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={ <MainLayout /> }>
            <Route path='/books' element={ <BooksPage /> } />
            <Route path='/userprofiles' element={ <ProfilesPage /> } />
            <Route path='/account' element={ <AccountPage /> } />
            <Route path='/myprofile' element={ <MyProfilePage /> } />
            <Route path='/mybookcase' element={ <MyBookcasePage /> } />
            {/*<Route path='/reviews' element={ <MyBookReview /> } />*/}
        </Route>
    )
);

function App() {
    return (
        <SearchProvider>
            <RouterProvider router={ router } />
        </SearchProvider>
    );
}

export default App;
