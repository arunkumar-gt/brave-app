import React, { useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons'
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { 
  Accordion,
  AccordionButton,
  AccordionCollapse,
  AccordionContext,
  Alert,
  Anchor,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardGroup,
  CardImg,
  Carousel,
  CarouselItem,
  CloseButton,
  Col,
  Collapse,
  Container,
  Dropdown,
  DropdownButton,
  Fade,
  Figure,
  FloatingLabel,
  Form,
  FormCheck,
  FormControl,
  FormFloating,
  FormGroup,
  FormLabel,
  FormSelect,
  FormText,
  Image,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalDialog,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Nav,
  Navbar,
  NavbarBrand,
  NavDropdown,
  NavItem,
  NavLink,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  OffcanvasTitle,
  Overlay,
  OverlayTrigger,
  PageItem,
  Pagination,
  Placeholder,
  PlaceholderButton,
  Popover,
  PopoverBody,
  PopoverHeader,
  ProgressBar,
  Ratio,
  Row,
  Spinner,
  SplitButton,
  SSRProvider,
  Stack,
  Tab,
  TabContainer,
  TabContent,
  Table,
  TabPane,
  Tabs,
  ThemeProvider,
  Toast,
  ToastBody,
  ToastContainer,
  ToastHeader,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip
} from 'react-bootstrap';

export default class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            validated: false,
            error: null,
            username: { value: '', message: '', isvalid: false },
            password: { value: '', message: '', isvalid: false }
        };

        // This binding is necessary to make `this` work in the callback
        this.handleLogin = this.handleLogin.bind(this);
        
        
        this.loginFormRef = React.createRef();
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.loginBtnRef = React.createRef();
    }

    /**
     * Mounting
     * This method is invoked immediately after a component is mounted
     */
     componentDidMount(){
        // console.log('componentDidMount -> Login', this);
    }

    /**
     * Updating
     * This method is invoked immediately after updating occurs. This method is not called for the initial render.
     */
    componentDidUpdate(prevProps, prevState, snapshot){
        // console.log('componentDidUpdate -> prevProps', prevProps);
        // console.log('componentDidUpdate -> prevState', prevState);
        // console.log('componentDidUpdate -> snapshot', snapshot);
    }

    /**
     * Unmounting
     * This method is called when a component is being removed from the DOM
     */
    componentWillUnmount(){

    }

    /**
     * This lifecycle is invoked after an error has been thrown by a descendant component. 
     * It receives two parameters: error and info
     */
    componentDidCatch(error, info){
        console.log('componentDidCatch -> error', error);
        console.log('componentDidCatch -> info', info);
    }

    handleLogin() {
        const form = this.loginFormRef.current;

        var isValid = this.validateForm();
        var isValid = form.checkValidity();

        let tmpState = this.state;
        tmpState.validated = true;
        this.setState(tmpState);

        console.log(this.state);

        if(isValid === true){
            this.login();
        }
    }

    async login() {
        // disable login button
        this.loginBtnRef.current.disabled = true;
        this.setState({ error: null });

        let userData = null;
        axios.defaults.baseURL = 'https://www.matrix.gnanagurutech.com/uat';
        await axios({
            method: 'post', 
            timeout: 1000 * 5,
            url: '/src/controller/MobileLoginController.php',
            data: {
                username: this.usernameRef.current.value.trim(),
                password: this.passwordRef.current.value.trim()
            }
        })
        .then( (response) => {
            // handle success
            console.log("success", response);
            let data = response.data;
            if(data.response){
                // alert("Login Success");
                userData = data.response;
            }else if(data.error){
                this.setState({ error: data.error });  
            }
        })
        .catch( (error) => {
            // handle error
            console.log("error", error);
            alert(error);
        })
        .then( () => { 
            // always executed

            // enable login button
            this.loginBtnRef.current.disabled = false;
        })

        if(userData){
            this.props.onLogin(userData);
        }
    }

    validateForm(){
        let tmpState = this.state;
        if(this.usernameRef.current.value.trim() === ""){
            tmpState.username.isvalid = false;
        }else{
            tmpState.username.value = this.usernameRef.current.value.trim();
            tmpState.username.isvalid = true;
        }
        if(this.passwordRef.current.value.trim() === ""){
            tmpState.password.isvalid = false;
        }else{
            tmpState.password.value = this.passwordRef.current.value.trim();
            tmpState.password.isvalid = true;
        }

        this.setState(tmpState);
    }

    render() {

        let error = "";
        if (this.state.error) { 
            error = <Alert variant="dark">
                        { this.state.error } 
                        <FontAwesomeIcon className="pt-1 float-right" icon={faWarning} />
                    </Alert>; 
        }

        return (
            <div className="login">
                <Container>

                    <Row className="mt-5 mb-2">
                        <Col sm="12">
                            <h3 className="text-center text-dark p-2">BRAVE</h3>
                            <h5 className="text-center">Login Form</h5>
                        </Col>
                    </Row>

                    { error }

                    <Form noValidate validated={ this.state.validated } ref={ this.loginFormRef }>

                        <Form.Group className="form-group" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" ref={ this.usernameRef } defaultValue={ this.state.username.value } required />
                            <Form.Control.Feedback type="invalid">
                                Please enter Username.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="form-group" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" ref={ this.passwordRef } defaultValue={ this.state.password.value } required />
                            <Form.Control.Feedback type="invalid">
                                Please enter Password.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="form-group text-center">
                        <Button variant="dark" type="button" ref={ this.loginBtnRef } onClick={ this.handleLogin } >
                            LOGIN
                        </Button>
                        </Form.Group>

                    </Form>

                </Container>
            </div>
        );
    }
}
