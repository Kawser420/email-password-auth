import React from 'react';
import Header from '../component/Header/Header';
import { Outlet } from 'react-router-dom';
import './Main.css'

const Main = () => {
    return (
        <div>
            <div className='navigation'>
            <Header></Header>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;