import React from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options"> 
        <NavLink to='/Thêm' className="sidebar-option">
          <img src={assets.add_icon} alt=""/>
            <p>Thêm</p>
        </NavLink>
        <NavLink to='/DS' className="sidebar-option">
          <img src={assets.order_icon} alt=""/>
            <p>Danh Sách</p>
        </NavLink>
        <NavLink to='/Đặt' className="sidebar-option">
          <img src={assets.order_icon} alt=""/>
            <p>Đặt món</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar