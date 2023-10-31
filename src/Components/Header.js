import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <div>
        <Navbar className="bg-primary" data-bs-theme="dark">
        <Container>
          <Link to={"/"} style={{ textDecoration: 'none'}}>
            <Navbar.Brand >
              <img
                alt=""
                src="  https://i.postimg.cc/9FHyc255/Untitled.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              /> {' '}
              <b>video uploader</b>
            </Navbar.Brand>
          </Link>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header