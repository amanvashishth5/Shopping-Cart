import { useReducer, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ValidationRegex, countryJSON } from '../constants';

export default function Signup() {
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


 
  const [error, setError] = useState({
    type: '',
    fname: '',
    lname: '',
    email: '',
    address: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
    isd: '',
    mobile: '',
    fax: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const reducer = (state, action) => {
    switch (action.type) {
      case 'type':
        return {...state, type: action.value};
      case 'fname':
        if(!ValidationRegex.fname.test(state.fname)){
          setError({...error, fname: 'First name is required and must be 5 digit'})
        } else {
          setError({...error, fname: ''})
        }
        return { ...state, fname: action.value} ;
      case 'lname':
        if(!ValidationRegex.lname.test(state.lname)){
          setError({...error, lname: 'Last name is required and must be 5 digit'})
        } else {
          setError({...error, lname: ''})
        }
        return {...state, lname: action.value};
      case 'address':
        return {...state, address: action.value};
      case 'email':
        return {...state, email: action.value};
      case 'country':
        return {...state, country: action.value};
      case 'state':
        return {...state, state: action.value};
      case 'city':
        return {...state, city: action.value};
      case 'pincode':
        return {...state, pincode: action.value};
      case 'isd':
        return {...state, isd: action.value};
      case 'mobile':
        return {...state, mobile: action.value};
      case 'fax':
        return {...state, fax: action.value};
      case 'phone':
        return {...state, phone: action.value};
      case 'password':
        return {...state, password: action.value};
      case 'confirmPassword':
        return {...state, confirmPassword: action.value};
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const getStateBasedOnCountry = () => {
    const countryData = countryJSON.find(item => item.name === state.country)
    const countryState = countryData && countryData.state || [];
    return countryState.map(item => <option>{item}</option>)
  }

  const validateThenSubmit = ()=>{}


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
            onChange={() => dispatch({ type: 'type', value: 'Individual' })}
          />
          <Form.Check
            inline
            label="Enterprise"
            name="group1"
            type={'radio'}
            id={`inline-radio-1`}
            onChange={() => dispatch({ type: 'type', value: 'Enterprise' })}
          />
          <Form.Check
            inline
            label="Goverment"
            name="group1"
            type={'radio'}
            id={`inline-radio-1`}
            onChange={() => dispatch({ type: 'type', value: 'Goverment' })}
          />
        </div>
      </Form.Group>


      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control isInvalid={!!error.fname} type="text" placeholder="First Name" value={state.fname} onChange={(e) => dispatch({ type: 'fname', value: e.target.value })} />
          <Form.Control.Feedback type="invalid">{error.fname}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Last Name</Form.Label>
          <Form.Control isInvalid={!!error.lname}  type="text" placeholder="Last Name" value={state.lname} onChange={(e) => dispatch({ type: 'lname', value: e.target.value })} />
          <Form.Control.Feedback type="invalid">{error.lname}</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control isInvalid={!!error.email} placeholder="Email" value={state.email} onChange={(e) => dispatch({ type: 'email', value: e.target.value })} />
        <Form.Control.Feedback type="invalid">{'Eamail'}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control isInvalid={!!error.address} placeholder="Address" value={state.address} onChange={(e) => dispatch({ type: 'address', value: e.target.value })} />
        <Form.Control.Feedback type="invalid">{'Address'}</Form.Control.Feedback>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCountry">
          <Form.Label>Country</Form.Label>
          <Form.Select isInvalid={!!error.country} defaultValue="Choose..." onChange={(e) => dispatch({ type: 'country', value: e.target.value })}>
            {countryJSON.map((item, index) => {
              return <option key={index}>{item.name}</option>
            })}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{'Country'}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select isInvalid={!!error.state} defaultValue="Choose..." onChange={(e) => dispatch({ type: 'state', value: e.target.value })}>
            {getStateBasedOnCountry()}

          </Form.Select>
          <Form.Control.Feedback type="invalid">{'State'}</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control onInvalid={!!error.city} value={state.city} onChange={(e) => dispatch({ type: 'city', value: e.target.value })}></Form.Control>
          <Form.Control.Feedback type="invalid">{'city'}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPincode">
          <Form.Label>Pincode</Form.Label>
          <Form.Control isInvalid={!!error.pincode} type='number' value={state.pincode} onChange={(e) => dispatch({ type: 'pincode', value: e.target.value })}></Form.Control>
          <Form.Control.Feedback type="invalid">{'PinCode'}</Form.Control.Feedback>
        </Form.Group>

       
      </Row>

      <Row>
        <Form.Group as={Col} controlId="formGridISDCode">
          <Form.Label>ISD Code</Form.Label>
          <Form.Select isInvalid={!!error.isd} onChange={(e) => dispatch({ type: 'isd', value: e.target.value })}>
            <option>+91</option>
            <option>+92</option>
            <option>+93</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">{'isd'}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridMobile">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control isInvalid={!!error.mobile} type='number' value={state.mobile} onChange={(e) => dispatch({ type: 'mobile', value: e.target.value })}></Form.Control>
          <Form.Control.Feedback type="invalid">{'Mobile'}</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} controlId="formGridFax">
          <Form.Label>Fax</Form.Label>
          <Form.Control isInvalid={!!error.fax} type='number' value={state.fax} onChange={(e) => dispatch({ type: 'fax', value: e.target.value })}></Form.Control>
          <Form.Control.Feedback type="invalid">{'Fax'}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control isInvalid={!!error.phone} type='number' value={state.phone} onChange={(e) => dispatch({ type: 'phone', value: e.target.value })}></Form.Control>
          <Form.Control.Feedback type="invalid">{'Phone'}</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control isInvalid={!!error.password} type="password" value={state.password} onChange={(e) => dispatch({ type: 'password', value: e.target.value })}></Form.Control>
        <Form.Control.Feedback type="invalid">{'Password'}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control isInvalid={!!error.confirmPassword} type="password" value={state.confirmPassword} onChange={(e) => dispatch({ type: 'confirmPassword', value: e.target.value })}></Form.Control>
        <Form.Control.Feedback type="invalid">{error.confirmPassword}</Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" style={{ width: '100%' }} onClick={validateThenSubmit}>
        SIGNUP
      </Button>
    </Form>
  </>
}