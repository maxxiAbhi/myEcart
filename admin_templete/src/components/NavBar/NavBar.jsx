import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css'



document.addEventListener("DOMContentLoaded", function (event) {
    const linkColor = document.querySelectorAll('.nav_link')

    function colorLink() {
        if (linkColor) {
            linkColor.forEach(l => l.classList.remove('active'))
            this.classList.add('active')
        }
    }
    linkColor.forEach(l => l.addEventListener('click', colorLink))
});

const showNavbar = (toggleId, navId, bodyId, headerId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId),
        bodypd = document.getElementById(bodyId),
        headerpd = document.getElementById(headerId)

    if (toggle && nav && bodypd && headerpd) {
        nav.classList.toggle('show')
        toggle.classList.toggle('bx-x')
        bodypd.classList.toggle('body-pd')
        headerpd.classList.toggle('body-pd')
    }
}

const clickMenu = () => {
    showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')
}




export default function NavBar() {

    return (
        <>
            <header className="header" id="header">
                <div className="header_toggle"> <i className='bx bx-menu' id="header-toggle" onClick={clickMenu}></i> </div>
                {/* <div className="header_img"> <img src="https://i.imgur.com/hczKIze.jpg" alt="" /> </div> */}
                {/* drop down button */}
                {/* <div class="dropdown">
                    <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" data-hover="dropdown">
                        Dropdown <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li class="dropdown">
                            <a href="#">One more dropdown</a>
                            <ul class="dropdown-menu">
                                <li><a href="#">Action</a></li>
                                <li><a href="#">Another action</a></li>
                                <li class="dropdown">
                                    <a href="#">One more dropdown</a>
                                    <ul class="dropdown-menu">
                                        ...
                                    </ul>
                                </li>
                                <li><a href="#">Something else here</a></li>
                                <li><a href="#">Separated link</a></li>
                            </ul>
                        </li>
                        <li><a href="#">Something else here</a></li>
                        <li><a href="#">Separated link</a></li>
                    </ul>
                </div> */}
                {/* end drop down button */}
            </header>
            <div className="l-navbar" id="nav-bar">
                <nav className="nav">
                    <div> <NavLink to="/dashboard" className="nav_logo"> <i className='bx bx-layer nav_logo-icon'></i> <span className="nav_logo-name">BBBootstrap</span> </NavLink>
                        <div className="nav_list">
                            <NavLink to="/dashboard" className="nav_link">
                                <i className='bx bx-grid-alt nav_icon'></i>
                                <span className="nav_name">Dashboard</span>
                            </NavLink>
                            <NavLink to="/order" className="nav_link">
                                <i className='bx bx-user nav_icon'></i>
                                <span className="nav_name">Order</span>
                            </NavLink>
                            <NavLink to="/product" className="nav_link">
                                <i className='bx bx-message-square-detail nav_icon'></i>
                                <span className="nav_name">Product</span>
                            </NavLink>
                            <NavLink to="/category" className="nav_link">
                                <i className='bx bx-bookmark nav_icon'></i>
                                <span className="nav_name">Category</span>
                            </NavLink>
                            <NavLink to="/order" className="nav_link">
                                <i className='bx bx-folder nav_icon'></i>
                                <span className="nav_name">Order</span>
                            </NavLink>
                            <NavLink to="#" className="nav_link">
                                <i className='bx bx-bar-chart-alt-2 nav_icon'></i>
                                <span className="nav_name">Stats</span> </NavLink>
                        </div>
                    </div> <a to="#" className="nav_link"> <i className='bx bx-log-out nav_icon'></i> <span className="nav_name">SignOut</span> </a>
                </nav>
            </div>
        </>
    );
}
