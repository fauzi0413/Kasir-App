import React from 'react';
import {Nav, Navbar, NavDropdown, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'


function refreshPage (){
    window.location.reload();
}


const NavbarComponent = () => {
    return (
        <Navbar bg="" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand onClick={refreshPage} style={{ cursor:'pointer' }}><b>KASIR APP</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto mt-3 d-lg-none d-sm-block">
                        <h6 style={{ color:'white' }}>Daftar Kategori</h6>
                        <hr className='hr'/>
                        <Nav.Link className='m-0' href="">Makanan</Nav.Link>
                        <Nav.Link className='m-0' href="">Minuman</Nav.Link>
                        <Nav.Link className='m-0' href="">Cemilan</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};


export default NavbarComponent;
