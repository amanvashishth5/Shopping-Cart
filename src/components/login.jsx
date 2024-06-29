
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function Login(){
    return <>
    <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <h6 style={{float: 'right'}}>
        <Link to={'/forgot-password'}>Forget Password</Link>
        </h6>
      <Button variant="primary" style={{width: '100%'}}>
        Login
      </Button>
    </Form>
    </>
}