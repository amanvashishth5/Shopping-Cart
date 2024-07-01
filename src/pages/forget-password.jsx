
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import "../styles/root.css"
import { Col, Collapse, Container } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router';
export default function ForgetPassword(){
  const navigate = useNavigate();
    return <Container>

<div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>

        <Modal.Body>

        <Form>
        <br/>
    <Form.Group as={Col} controlId="formGridEmail">
    <Form.Label>Please Provide Your Registered Email id to Reset Password</Form.Label>
    <Form.Control type="text" placeholder="Email id" />
    </Form.Group>

    <br/>
    

    <Row>
      <Col>
      <Button variant="primary" style={{width: '100%'}}> Reset Password</Button>
      </Col>
      <Col>
      <Button variant="primary" style={{width: '100%'}} onClick={()=>{
        navigate('/')
      }}>Login/SignUp</Button>
      </Col>
    
    
    
    </Row>

</Form>

        </Modal.Body>

  
      </Modal.Dialog>
    </div>


      
      </Container>
}