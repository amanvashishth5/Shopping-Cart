
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import { BiCart } from 'react-icons/bi';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [data, setData] = useState([])
    const [categories, setCategories] = useState([])
    const [cart, setCart] = useState([])
    const getProducts = async () => {
        try {
            const products = await axios.get('https://fakestoreapi.com/products')
            if (products.data) {
                const allCategories = products.data.map(item => item.category)
                setCategories([...new Set(allCategories)])
                setData(products.data)
            }
        } catch (e) {
            console.error('Error while fetching products', e)
        }
    }
    const showCategoryBasedProductSection = (item, index) => {
        const filteredData = data.filter(i => i.category === item)
        return filteredData.map(i => <>
                <Col><Product data={i} cart={cart} setCart={setCart}/></Col>
        </>)
    }
    const capitalizeFirstLetter = (string) =>  {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    useEffect(() => {
        getProducts()
    }, [])
    return <>
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand href="#">SHOPLANE</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1">Home</Nav.Link>
                        <Nav.Link href="#action2">Clothing</Nav.Link>
                        <Nav.Link href="#action3">Accessories</Nav.Link>


                    </Nav>
                    <Form className="d-flex">

                        <Button variant="link">Search</Button>
                        <Button variant="link">
                            <BiCart />
                            <Badge pill bg="primary">
                                {cart.length}
                            </Badge>
                        </Button>
                        <Button variant="link">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <br />

        {categories.map((item, index) => <><Container fluid style={{margin: '10px 0'}}>
            <Row>
                <Col>
                    <h4>{capitalizeFirstLetter(item)}</h4>
                </Col>
            </Row>

        </Container>
        <Container>
            <Row>
            {showCategoryBasedProductSection(item, index)}
            </Row>
        </Container>
            
        </>

        )}

    </>
}

const Product = ({data, cart, setCart}) => {
    const {title, price, description, image, rating} = data;
    return <Card style={{ width: '18rem', marginBottom: 10 }}>
        <Card.Img variant="top" src={image} height={286} width={180}/>
        <Card.Body>
            <Card.Title>{title.substring(0, 30) + '...'}</Card.Title>
            <Card.Text style={{height: 80}}>
                {description.substring(0, 70) + '...'}
            </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
        <ListGroup.Item><strong>Price:</strong> <h3>{price.toLocaleString("en-US", {style:"currency", currency:"USD"})}</h3></ListGroup.Item>
            <ListGroup.Item>Rating: {rating.rate}</ListGroup.Item>
            <ListGroup.Item>Total Votes: {rating.count}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
        <div className="d-grid gap-2">
        {!!cart.find(item => item.id === data.id) ? <Button variant="warning" onClick={()=>{
            const updatedData = cart.filter(item => item.id !== data.id)
            setCart(updatedData)
        }}><BiCart /> &nbsp; Remove from Cart</Button> :
        <Button variant="warning" onClick={()=>setCart([...cart, data])}><BiCart /> &nbsp; Add to Cart</Button>
        }
        
        </div>
        
        </Card.Body>
    </Card>
}