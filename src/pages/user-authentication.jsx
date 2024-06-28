import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/root.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Login from '../components/login';
import Signup from '../components/signup';

export default function UserAuthentication(){

    return <>
    <Navbar bg="primary" data-bs-theme="dark" expand="lg" className="bg-body-tertiary user_authentication_navbar"></Navbar>
    
    <Container>
      <Row>
        <Col></Col>
        <Col>
        <Tabs
      defaultActiveKey="login"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="login" title="Login">
        <Login/>
      </Tab>
      <Tab eventKey="signup" title="Signup">
        <Signup />
      </Tab>
      
    </Tabs>
        
        </Col>
      </Row>
    </Container>
    </>
    

}