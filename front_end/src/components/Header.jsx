import {Badge, Navbar, Nav, Container} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa';
import logo from '../assets/cutepanda.png';
import {LinkContainer} from 'react-router-bootstrap';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const Header = () => {
    const {cartItems} = useSelector((state) => state.cart);

  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            //use to wrap around the content in the Navbar
            <Container>
                <LinkContainer to='/'>
                <Navbar.Brand>
                    <img src={logo} alt="PANDA" style={{ width: '50px', height: 'auto' }} />
                    PANDA
                </Navbar.Brand>
                </LinkContainer>

                //set the hamburger menu with the id basic-navbar-nav
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    //ms-auto is to put stuff on the right
                    <Nav className="ms-auto">
                        <LinkContainer to='/cart'>
                        <Nav.Link><FaShoppingCart />Cart
                        {
                            cartItems.length>0 && (<Badge pill bg='success' style={{marginLeft:'5px'}}>
                                {cartItems.reduce((a, c) => a + c.qty, 0)}
                            </Badge>)
                        }</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/login'>
                        <Nav.Link><FaUser />Sign In</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header