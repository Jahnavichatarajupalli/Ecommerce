import React from 'react'
import './admin.css'
import Slidebar from '../../components/slidebar/slidebar'
import {Routes,Route} from 'react-router-dom'
import Addproduct from '../../components/Addproduct/addproduct'
import Listproduct from '../../components/Listproduct/Listproduct'


const admin = () => {
  return (
    <div className="admin">

        <Slidebar></Slidebar>
        <Routes>
            <Route path='/addproduct' element={<Addproduct></Addproduct>}/>
            <Route path='/listproduct' element={<Listproduct></Listproduct>}/>

        </Routes>
      
    </div>
  )
}

export default admin
