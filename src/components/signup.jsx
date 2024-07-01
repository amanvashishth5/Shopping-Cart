import { useReducer, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ValidationRegex, countryJSON } from '../constants';
import { addUser, deleteUser, getUsers } from '../db';

export default function Signup(props) {
  const initialState = {
    type: 'Individual',
    fname: '',
    lname: '',
    email: '',
    address: '',
    country: 'India',
    state: 'Uttar Pradesh',
    city: '',
    pincode: '',
    isd: '+91',
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
        if(!ValidationRegex.fname.test(action.value)){
          setError({...error, fname: 'First name is required and alpha character length should be 5'})
        } else {
          setError({...error, fname: ''})
        }
        return { ...state, fname: action.value} ;
      case 'lname':
        if(!ValidationRegex.lname.test(action.value)){
          setError({...error, lname: 'Last name is required and alpha character length should be 5'})
        } else {
          setError({...error, lname: ''})
        }
        return {...state, lname: action.value};
      case 'address':
        if(!ValidationRegex.address.test(action.value)){
          setError({...error, address: 'Address is required'})
        } else {
          setError({...error, address: ''})
        }
        return {...state, address: action.value};
      case 'email':
        if(!ValidationRegex.email.test(action.value)){
          setError({...error, email: 'email is required and must be in correct syntax'})
        } else {
          setError({...error, email: ''})
        }
        return {...state, email: action.value};
      case 'country':
        if(!ValidationRegex.country.test(action.value)){
          setError({...error, country: 'Country is required'})
        } else {
          setError({...error, country: ''})
        }
        return {...state, country: action.value};
      case 'state':
        if(!ValidationRegex.state.test(action.value)){
          setError({...error, state: 'State is required'})
        } else {
          setError({...error, state: ''})
        }
        return {...state, state: action.value};
      case 'city':
        if(!ValidationRegex.city.test(action.value)){
          setError({...error, city: 'City is required'})
        } else {
          setError({...error, city: ''})
        }
        return {...state, city: action.value};
      case 'pincode':
        if(!ValidationRegex.pincode.test(action.value)){
          setError({...error, pincode: 'Pincode is required'})
        } else {
          setError({...error, pincode: ''})
        }
        return {...state, pincode: action.value};
      case 'isd':
        if(!ValidationRegex.isd.test(action.value)){
          setError({...error, isd: 'ISD is required'})
        } else {
          setError({...error, isd: ''})
        }
        return {...state, isd: action.value};
      case 'mobile':
        if(!ValidationRegex.mobile.test(action.value)){
          setError({...error, mobile: 'Mobile is required and must be 10 digit long'})
        } else {
          setError({...error, mobile: ''})
        }
        return {...state, mobile: action.value};
      case 'fax':
        if(!ValidationRegex.fax.test(action.value)){
          setError({...error, fax: 'fax is required and must be 6 digit'})
        } else {
          setError({...error, fax: ''})
        }
        return {...state, fax: action.value};
      case 'phone':
        if(!ValidationRegex.phone.test(action.value)){
          setError({...error, phone: 'Phone is required and must be 6 digit long'})
        } else {
          setError({...error, phone: ''})
        }
        return {...state, phone: action.value};
      case 'password':
        if(!ValidationRegex.password.test(action.value)){
          setError({...error, password: 'Password is required and must be 12 digit long with alphanumeric and special symbols!'})
        } else {
          setError({...error, password: ''})
        }
        return {...state, password: action.value};
      case 'confirmPassword':
        if(action.value !== state.password){
          setError({...error, confirmPassword: 'Confirm password is not matching'})
        } else {
          setError({...error, confirmPassword: ''})
        }
        return {...state, confirmPassword: action.value};
      case 'reset':
        return {...initialState}
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

  const checkDisable = () => {
    const allKeys = Object.keys(error);
    let isErrorFound = false
    for(let i=0; i<Object.keys(error).length; i++){
      if(error[allKeys[i]]){
        isErrorFound = true
        break;
      }
      if(!state[allKeys[i]]){
        isErrorFound = true
        break;
      }
    }
    
    return isErrorFound
  }
  const submitHandler = async ()=>{
    try{
      const allUser = await getUsers();
      const existUser = allUser.find(item => item.email === state.email)
      if(existUser){
        alert('This user is already exist with same email. Try with another email');
        return;
      }
      await addUser(state)
      dispatch({ type: 'reset' })
      alert('Data saved successfully. Please login to view dashboard')
      document.getElementById('credentials-tab-login').click()
    } catch(e){
      alert('Error occured while saving your data')
    }
    
  }


  return <>
    <Form autocomplete="off">
      <Form.Group as={Col} >
        <Form.Label>Individual/Enterprise/Goverment</Form.Label>
        <div key={`inline-radio`} className="mb-3">
          <Form.Check
            inline
            label="Individual"
            name="group1"
            type={'radio'}
            id={`inline-radio-1`}
            checked={true}
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
        <Form.Group as={Col} >
          <Form.Label>First Name</Form.Label>
          <Form.Control isInvalid={!!error.fname} type="text" placeholder="First Name" value={state.fname} onChange={(e) => dispatch({ type: 'fname', value: e.target.value })} />
          <Form.Control.Feedback type="invalid">{error.fname}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} >
          <Form.Label>Last Name</Form.Label>
          <Form.Control isInvalid={!!error.lname}  type="text" placeholder="Last Name" value={state.lname} onChange={(e) => dispatch({ type: 'lname', value: e.target.value })} />
          <Form.Control.Feedback type="invalid">{error.lname}</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" >
        <Form.Label>Email</Form.Label>
        <Form.Control isInvalid={!!error.email} placeholder="Email" value={state.email} onChange={(e) => dispatch({ type: 'email', value: e.target.value })} />
        <Form.Control.Feedback type="invalid">{error.email}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Address</Form.Label>
        <Form.Control isInvalid={!!error.address} placeholder="Address" value={state.address} onChange={(e) => dispatch({ type: 'address', value: e.target.value })} />
        <Form.Control.Feedback type="invalid">{error.address}</Form.Control.Feedback>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} >
          <Form.Label>Country</Form.Label>
          <Form.Select isInvalid={!!error.country} defaultValue="Choose..." onChange={(e) => dispatch({ type: 'country', value: e.target.value })}>
            {countryJSON.map((item, index) => {
              return <option key={index}>{item.name}</option>
            })}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{error.country}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} >
          <Form.Label>State</Form.Label>
          <Form.Select isInvalid={!!error.state} defaultValue="Choose..." onChange={(e) => dispatch({ type: 'state', value: e.target.value })}>
            {getStateBasedOnCountry()}

          </Form.Select>
          <Form.Control.Feedback type="invalid">{error.state}</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} >
          <Form.Label>City</Form.Label>
          <Form.Control isInvalid={!!error.city} value={state.city} onChange={(e) => dispatch({ type: 'city', value: e.target.value })}></Form.Control>
          <Form.Control.Feedback type="invalid">{error.city}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} >
          <Form.Label>Pincode</Form.Label>
          <Form.Control isInvalid={!!error.pincode} type='number' value={state.pincode} onChange={(e) => dispatch({ type: 'pincode', value: e.target.value })}></Form.Control>
          <Form.Control.Feedback type="invalid">{error.pincode}</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} >
          <Form.Label>ISD Code</Form.Label>
          <Form.Select isInvalid={!!error.isd} onChange={(e) => dispatch({ type: 'isd', value: e.target.value })}>
            <option>+91</option>
            <option>+92</option>
            <option>+93</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">{error.isd}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} >
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control isInvalid={!!error.mobile} type='number' value={state.mobile} onChange={(e) => dispatch({ type: 'mobile', value: e.target.value })}></Form.Control>
          <Form.Control.Feedback type="invalid">{error.mobile}</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} >
          <Form.Label>Fax</Form.Label>
          <Form.Control isInvalid={!!error.fax} type='number' value={state.fax} onChange={(e) => dispatch({ type: 'fax', value: e.target.value })}></Form.Control>
          <Form.Control.Feedback type="invalid">{error.fax}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} >
          <Form.Label>Phone</Form.Label>
          <Form.Control isInvalid={!!error.phone} type='number' value={state.phone} onChange={(e) => dispatch({ type: 'phone', value: e.target.value })}></Form.Control>
          <Form.Control.Feedback type="invalid">{error.fax}</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" >
        <Form.Label>Password</Form.Label>
        <Form.Control isInvalid={!!error.password} type="password" value={state.password} onChange={(e) => dispatch({ type: 'password', value: e.target.value })}></Form.Control>
        <Form.Control.Feedback type="invalid">{error.password}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control isInvalid={!!error.confirmPassword} type="password" value={state.confirmPassword} onChange={(e) => dispatch({ type: 'confirmPassword', value: e.target.value })}></Form.Control>
        <Form.Control.Feedback type="invalid">{error.confirmPassword}</Form.Control.Feedback>
      </Form.Group>

      <Button disabled={checkDisable()} variant="primary" style={{ width: '100%' }} onClick={submitHandler}>
        SIGNUP
      </Button>
      
    </Form>
  </>
}