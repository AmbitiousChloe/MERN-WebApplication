import {Badge, Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa';
import logo from '../assets/cutepanda.png';
import {LinkContainer} from 'react-router-bootstrap';
import { useSelector, useDispatch} from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import {logout} from '../slices/authSlice';
import {useNavigate} from 'react-router-dom'

const Header = () => {
    const {cartItems} = useSelector((state) => state.cart);
    const {userInfo} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () =>{
        try{
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login')
        }catch(err){
            console.log(err);
        }
    }
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
                        {userInfo?(
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    LogOut
                                </NavDropdown.Item>
                            </NavDropdown>
                        ):(<LinkContainer to='/login'>
                        <Nav.Link><FaUser />Sign In</Nav.Link>
                        </LinkContainer>)}
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header