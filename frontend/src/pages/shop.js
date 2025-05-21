import React from 'react'
import Hero from '../components/hero/hero'
import Popular from '../components/popular/popular.js'
import Offers from '../components/populars/populars.js'
import New from '../components/newcollection/newcollection.js'
import Mail from '../components/mail/mail.js'

const shop = () => {
  return (
    <div>
        <Hero></Hero>
        <Popular></Popular>
        <Offers></Offers>
        <New></New>
        <Mail></Mail>

      
    </div>
  )
}

export default shop
