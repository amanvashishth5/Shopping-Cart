

import { useReducer, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { countryJSON } from '../constants';

export default function Signup(){
   
  function reducer(state, action) {
    switch (action.type) {
      case 'fname':
        return { fname: action.value };
      case 'lname':
        return { lname: action.value };
      case 'email':
        return { email: action.value };
      case 'country':
        return { country: action.value };
      case 'state':
          return { state: action.value };
      default:
        throw new Error();
    }
  }

  const initialState = { 
    type: '',
    fname: '',
    lname: '',
    email: '',
    address: '',
    country: 'India',
    state: '',
    city: '',
    pincode: '',
    isd: '',
    mobile: '',
    fax: '',
    phone: '',
    password: '',
    confirmPassword: ''
   };


  const [state, dispatch] = useReducer(reducer, initialState);

  const getStateBasedOnCountry = () => {
      const countryData = countryJSON.find(item=>item.name === state.country)
      const countryState = countryData && countryData.state || [];
      return countryState.map(item => <option>{item}</option>)
    }

    return <>
    <Form>
    <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Individual/Enterprise/Goverment</Form.Label>
        <div key={`inline-radio`} className="mb-3">
          <Form.Check
            inline
            label="Individual"
            name="group1"
            type={'radio'}
            id={`inline-radio-1`}
          />
          <Form.Check
            inline
            label="Enterprise"
            name="group1"
            type={'radio'}
            id={`inline-radio-2`}
          />
          <Form.Check
            inline
            label="Goverment"
            type={'radio'}
            id={`inline-radio-3`}
          />
        </div>
    </Form.Group>
    
    
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="First Name" value={state.fname} onChange={(e) => dispatch({ type: 'fname', value: e.target.value })}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Last Name"  value={state.lname} onChange={(e) => dispatch({ type: 'lname', value: e.target.value })}/>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control placeholder="Email" value={state.email} onChange={(e) => dispatch({ type: 'email', value: e.target.value })}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="Address" value={state.address} onChange={(e) => dispatch({ type: 'address', value: e.target.value })}/>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCountry">
          <Form.Label>Country</Form.Label>
          <Form.Select defaultValue="Choose..." onChange={(e) => dispatch({ type: 'country', value: e.target.value })}>
            {countryJSON.map((item, index)=>{
              return <option key={index}>{item.name}</option>
            })}
            </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose..." onChange={(e) => dispatch({ type: 'state', value: e.target.value })}>
            {getStateBasedOnCountry()}
            
          </Form.Select>
        </Form.Group>
        </Row>

        <Row>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPincode">
          <Form.Label>Pincode</Form.Label>
          <Form.Control />
        </Form.Group>
     
      {/* <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      </Row>
      
      <Row>
      <Form.Group as={Col} controlId="formGridISDCode">
          <Form.Label>ISD Code</Form.Label>
          <Form.Select defaultValue="Choose...">
            {/* <option>Choose...</option> */}
            <option>...</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridMobile">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>

      <Row>
      <Form.Group as={Col} controlId="formGridFax">
          <Form.Label>Fax</Form.Label>
          <Form.Control placeholder='011-55541234'/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control placeholder='011-55541234'/>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" />
      </Form.Group>

      <Button variant="primary" style={{width: '100%'}}>
        SIGNUP
      </Button>
    </Form>
    </>
}