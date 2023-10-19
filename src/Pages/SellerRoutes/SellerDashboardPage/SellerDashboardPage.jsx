import React, { useState } from 'react'
import DashboardHeaders from '../../../components/sellerComponents/DashboardHeaders/DashboardHeaders.jsx'
import DashboardContents from '../../../components/sellerComponents/DashboardContents/DashboardContents.jsx'
import './SellerDashboardPage.css'

const SellerDashboardPage = () => {
  const [activeHeader, setActiveHeader] = useState(1)

  return (
    <div className='dashboard-container'>
      <div className='dashboard-headers-container'>
        <DashboardHeaders
          activeHeader={activeHeader}
          setActiveHeader={setActiveHeader}
        />
      </div>
      <div className='dashboard-content-container'>
        <DashboardContents activeHeader={activeHeader} />
      </div>
    </div>
  )
}

export default SellerDashboardPage
