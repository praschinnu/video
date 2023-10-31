import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Add from '../Components/Add'
import View from '../Components/View'
import Categories from '../Components/Categories'
import { Link } from 'react-router-dom'



function Home() {
  //state for state-lifting
  const[addUpdate,setAddUpdate]=useState({})

  return (
    <div className='mt-5'>
      <Row>7
        <Col>
          <h2 className='ms-5 ps-5'>start uploading videos for free</h2>

          <div className='ms-5 ps-5'>
<Link to={'/watch-history'} style={{textDecoration:'none'}}>
              <a style={{ textDecoration: 'none',color:'blue' }} ><i class="fa-solid fa-clock-rotate-left fa-spin"></i>  View Watch Histroy</a>
  
</Link>            <p className='mt-3 fs-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro dolor dolores minima sit odit sapiente et, provident modi aliquam a, pariatur tenetur enim velit quam facilis, iste officiis quaerat illo!</p>
          </div>
        </Col>
        <Col className='text-start'>
        <img style={{width:'200px',height:'200px'}} src="https://i.postimg.cc/RFqpJrW5/chrome-capture.gif" alt="" />
        </Col>

      </Row>
      <hr />

      <Row className='p-5'>
        <Col lg={1}>
          <Add update={setAddUpdate}></Add>
        </Col>

        <Col lg={7}>
          <View updatedState={addUpdate}></View>
        </Col>

        <Col lg={4}>
          <Categories></Categories>
        </Col>

      </Row>

    </div>
  )
}

export default Home