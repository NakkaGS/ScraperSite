//App.js->Route->ProductScreen.js

import React, { useState, useEffect } from "react";

//Router
import { Link, useParams, useNavigate } from "react-router-dom"; //Library React Router Dom
import { LinkContainer } from "react-router-bootstrap";

//Redux
import { useDispatch, useSelector } from 'react-redux'

//Actions
import { listProductDetails } from '../actions/productActions' //this is the reducer

//Bootstrap Components
import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap"; //Library React Bootstrap

//Components
import Rating from "../components/Rating";
import Loader from '../components/Loader'
import Message from '../components/Message'

//it was necessary to add '?' every time that we want to get a attribute from the product

function ArticleScreen({ match }) {

  let history = useNavigate() //for V6 it is useNavigate, NOT useHistory

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails


  //using the useParams (using the new version)
  //useParams returns the key of the  current <Route> (App.js - <Route path='product/:id'...> in this case id)
  let { id } = useParams(match); //get the Product ID

  useEffect( () => {
    dispatch(listProductDetails(id))

  }, [dispatch, id, match, history, ])

  return(
    <div>
      <Link to="/" className="btn btn-light- my-3">Go Back</Link>

      

      {loading ?
        <Loader/>
        : error
          ? <Message variant='danger'>{error}</Message>
          :(
            <div>
              <Row>
                <Col md={6}>
                  <Image src={product?.image} alt={product?.name} fluid />
                  {/* //it was necessary to add '?' every time that we want to get a attribute from the product */}
                </Col>
      
                <Col md={3}>
                  <ListGroup variant="flush">

                    <ListGroup.Item>
                      <h3>{product?.name}</h3>
                    </ListGroup.Item>
        
                    <ListGroup.Item>
                      <Rating value={product?.rating} text={`${product?.numReviews} reviews`} color={'#f8e825'} />
                    </ListGroup.Item>
        
                    <ListGroup.Item>
                      Price: ${product?.price}
                    </ListGroup.Item>
        
                    <ListGroup.Item>
                      Description: ${product?.description}
                      {/* <div dangerouslySetInnerHTML={{__html: product?.description}}></div> */}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
        
                <Col md={3}>
                  <Card>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>
                            Price:
                          </Col>
        
                          <Col>
                            <strong>${product?.price}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
        
                      <ListGroup.Item>
                        <Row>
                          <Col>
                            Status:
                          </Col>
                          
                          <Col>
                            {product?.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      {product?.countInStock > 0 && (
                          <ListGroup.Item>
                            <Row>
                              <Col>Qty:</Col>
                            </Row>
                          </ListGroup.Item>
                        )                 
                      }

                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            </div>
          )
      }

    </div>
  )
};

export default ArticleScreen;
