import React from 'react'
import { FiSettings } from 'react-icons/fi'
import { IoIosCreate, IoMdNotifications } from 'react-icons/io'
import { MdCreateNewFolder } from 'react-icons/md'
import { BsCreditCard } from 'react-icons/bs'
import { HiOutlineCash } from 'react-icons/hi'
import { FaFax } from 'react-icons/fa'
import { TbBusinessplan } from 'react-icons/tb'
import { BiCalendarEdit } from 'react-icons/bi'
import './DashboardHeaders.css'

const DashboardHeaders = ({ activeHeader, setActiveHeader }) => {
  return (
    <div className='dashboard-header-items-container'>
      <div
        onClick={() => {
          setActiveHeader(1)
        }}
        className={`dashboard-settings-container Dheader ${
          activeHeader === 1 && 'clicked-cell'
        }`}
      >
        <FiSettings className='ds-icon' />
        <h3>Store Settings</h3>
      </div>
      <div
        onClick={() => {
          setActiveHeader(2)
        }}
        className={`dashboard-create-product-container Dheader ${
          activeHeader === 2 && 'clicked-cell'
        }`}
      >
        <IoIosCreate className='cp-icon' />
        <h3>Create Product</h3>
      </div>
      <div
        onClick={() => {
          setActiveHeader(3)
        }}
        className={`dashboard-create-event-container Dheader ${
          activeHeader === 3 && 'clicked-cell'
        }`}
      >
        <MdCreateNewFolder className='ce-icon' />
        <h3>Create Event</h3>
      </div>
      <div
        onClick={() => {
          setActiveHeader(4)
        }}
        className={`dashboard-refund-request-container Dheader ${
          activeHeader === 4 && 'clicked-cell'
        }`}
      >
        <HiOutlineCash className='rr-icon' />
        <h3>Refunds Request</h3>
      </div>
      <div
        onClick={() => {
          setActiveHeader(5)
        }}
        className={`dashboard-withdrawals-container Dheader ${
          activeHeader === 5 && 'clicked-cell'
        }`}
      >
        <BsCreditCard className='w-icon' />
        <h3>Withdrawals</h3>
      </div>
      <div
        onClick={() => {
          setActiveHeader(6)
        }}
        className={`dashboard-notifications-container Dheader ${
          activeHeader === 6 && 'clicked-cell'
        }`}
      >
        <IoMdNotifications className='n-icon' />
        <h3>Notifications</h3>
      </div>
      <div
        onClick={() => {
          setActiveHeader(7)
        }}
        className={`dashboard-product-sales-container Dheader ${
          activeHeader === 7 && 'clicked-cell'
        }`}
      >
        <TbBusinessplan className='p-s-icon' />
        <h3>Product Sales</h3>
      </div>
      <div
        onClick={() => {
          setActiveHeader(8)
        }}
        className={`dashboard-all-products-container Dheader ${
          activeHeader === 8 && 'clicked-cell'
        }`}
      >
        <FaFax className='ap-icon' />
        <h3>All Products</h3>
      </div>
      <div
        onClick={() => {
          setActiveHeader(9)
        }}
        className={`dashboard-all-products-container Dheader ${
          activeHeader === 9 && 'clicked-cell'
        }`}
      >
        <BiCalendarEdit className='ap-icon' />
        <h3>All Events</h3>
      </div>
    </div>
  )
}

export default DashboardHeaders
