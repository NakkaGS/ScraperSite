//App.js->Route->ProductScreen.js

import React, { useState, useEffect } from "react";

//Router
import { Link, useParams, useNavigate } from "react-router-dom"; //Library React Router Dom
import { LinkContainer } from "react-router-bootstrap";

//Redux
import { useDispatch, useSelector } from 'react-redux'

//Actions
import { listArticleDetails } from '../actions/articleActions' //this is the reducer

//Bootstrap Components
import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap"; //Library React Bootstrap

//Components
import Rating from "../components/Rating";
import Loader from '../components/Loader'
import Message from '../components/Message'

//it was necessary to add '?' every time that we want to get a attribute from the article

function ArticleScreen({ match }) {

  let history = useNavigate() //for V6 it is useNavigate, NOT useHistory

  const dispatch = useDispatch()

  const articleDetails = useSelector(state => state.articleDetails)
  const { loading, error, article } = articleDetails


  //using the useParams (using the new version)
  //useParams returns the key of the  current <Route> (App.js - <Route path='product/:id'...> in this case id)
  let { id } = useParams(match); //get the Product ID

  useEffect( () => {
    dispatch(listArticleDetails(id))

  }, [dispatch, id, match, history, ])

  return(
    <div>
        <Card className='me-5 ms-5 mt-2 mb-2'>
            <Image src={article?.image} alt={article?.name} fluid />
            <Card.Body>
                <Row>
                    <Card.Title className='text-center card-title'><h2>{article?.name}</h2></Card.Title>
                </Row>
                <Row>
                    <Col className='text-center'>
                        <p>{article?.date} | {article?.writer} | {article?.comments} Comments</p>
                    </Col>
                </Row>

                <Row>
                    <Card.Text className='text-center'>
                    {<div dangerouslySetInnerHTML={{__html: article?.text}}></div>}
                    </Card.Text>
                </Row>

            </Card.Body>
        </Card>
    </div>
  )
};

export default ArticleScreen;
