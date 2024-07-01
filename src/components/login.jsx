
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Navigate, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getUsers } from '../db';
export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    return <>
    <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e=>setEmail(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
      </Form.Group>

      <h6 style={{float: 'right'}}>
        <Link to={'/forgot-password'}>Forget Password</Link>
        </h6>
      <Button variant="primary" style={{width: '100%'}} onClick={async()=>{
        const allUsers = await getUsers()
        const isUserExist = allUsers.find((i)=>i.email === email)
        if(isUserExist){
          if(isUserExist.password === password){
            localStorage.setItem('isLogin', true);
            navigate('/products')
            return;
          }
        }
        alert('Invalid Credentials')
      }}>
        Login
      </Button>
    </Form>
    </>
}