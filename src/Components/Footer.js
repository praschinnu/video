import React from 'react'
import { Col, Row } from 'react-bootstrap'

function Footer() {
    return (
        <div className=' p-4 bg-primary'>
            <Row className='mt-2 p-1'>
                <Col lg={3} md={6} sm={12} xs={12}>
                <img
              alt=""
              src="  https://i.postimg.cc/9FHyc255/Untitled.png"
              width="20"
              height="20"
              className="d-inline-block align-top me-1 mt-1"
            />{' '}
            <b className='text-white'> VIDEO UPLOADER</b> 
            <p>Plyr is a lightweight, simple, and customizable online video player. It offers support for HTML Vimeo and YouTube players. It is popular in both experts and beginners circles for its lightweight </p>
                </Col>
                <Col lg={3} md={6} sm={12} xs={12}>
                <h3 className='text-white'>Recent Blogs</h3>
                
<p>
    Cracking JEE: How Online Coaching Transformed India’s Toughest Exam
    Video Quality, Bitrate & Pixel, Explained in Simple Language
    Top 14 Online Learning Platforms in 2023
    History of YouTube.
</p>

            
                </Col>

                <Col lg={3} md={6} sm={12} xs={12}>
                <h4 style={{color:'white'}}>Guides</h4>   
                <p>react</p>
                <p>react bootstrap</p>
                <p>routing</p>
                </Col>

                
                <Col lg={3} md={6} sm={12} xs={12}>
                <h4 style={{color:'white'}}>Contact Us</h4>
                <input type="text"  className='form-control' placeholder='enter email'/>

                <button className='btn btn-light mt-2 w-75'>send</button> <br />
                <i class="fa-brands fa-instagram text-white fa-2x mt-3 "></i>
                <i class="fa-brands fa-facebook-messenger text-white fa-2x mt-3 ms-2"></i>
                <i class="fa-brands fa-x-twitter text-white fa-2x mt-3 ms-2"></i>
                <i class="fa-brands fa-github text-white fa-2x mt-3 ms-2"></i>
                </Col>
            </Row>

        </div>
    )
}

export default Footer