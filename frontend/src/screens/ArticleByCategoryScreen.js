import React, {useEffect} from 'react'

//Router
import { useParams, useLocation } from "react-router-dom"; //Library React Router Dom

//Redux
import { useDispatch, useSelector } from 'react-redux' 
//useSelector - allows us to used certain parts of the state/reducer

//Actions
import { listArticles } from '../actions/articleActions'

//Boostrap Components
import { Row, Col } from 'react-bootstrap'

//Components
import Article from '../components/Article'
import Categories from '../components/Categories'
import Loader from '../components/Loader'
import Message from '../components/Message'

export default function ArticleByCategoryScreen({ match }){

    const dispatch = useDispatch()
  
    const articleList = useSelector(state => state.articleList)
    const {error, loading, articles} = articleList 

    let history = useLocation(); //for V6 it is useLocation, NOT useHistory

    let keyword = history.search //for V6 it is search, NOT pathname

    useEffect(() => {
        dispatch(listArticles(keyword))
    }, [dispatch, keyword])

    let { category } = useParams(match); //get the category name in the address

    return(
    <div>
        <Row>
            {loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        :
                        <Col md={9}>
                            {articles?.length && (articles.map(article => {

                                if(article.category.search(`${category}`)){
                                    return ( 
                                        <div key={article._id}>
                                            <Article article={article} />
                                        </div>
                                    )
                                } 
                                }))}
                        </Col>
            }
            <Col md={3}>
                <Categories/>
            </Col>
            
        </Row>
    </div>
    )
}