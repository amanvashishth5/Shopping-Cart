
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import "../styles/root.css"
import { Col } from 'react-bootstrap';

export default function ForgetPassword(){

    return <Form>
    <Form.Group as={Col} controlId="formGridEmail">
    <Form.Label>Please Provide Your Registered Email id to Reset Password</Form.Label>
    <Form.Control type="text" placeholder="Email id" />
    </Form.Group>

    <Row>
    <Button variant="primary" style={{width: '100%'}}>
    Reset Password
  </Button>

  <Button variant="primary" style={{width: '100%'}}>
    Login/SignUp
  </Button>
    </Row>

</Form>
}