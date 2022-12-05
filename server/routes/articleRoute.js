//Express
const express = require("express");
const router = express.Router();

var bodyParser = require('body-parser')

//Models
const Article = require('../models/articleModel')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

//Get all Products
router.get("/getallarticles", (req, res) => {

    console.log('Get all articles requested')

    var query = req.query.keyword

    if (query == '' || typeof(query) == 'undefined'){
        query = '' 
    }

    try {
        Article.find({} , (err , data)=>{

            if(!err){
                console.log('Query: ', query)
                return res.send(data);
            } else {
                return res.status(400).json({ message: 'Something went wrong' });
            }
        
        })

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

});

//Get Product ID by POST using Body
router.post("/getarticlebyid", (req, res) => {

    console.log('Get articles by ID requested: ', req.body.articleid)

    try {
        Article.find({_id : req.body.articleid} , (err , data)=>{

            if(!err)
            {
                res.send(data[0])
            }
            else{
                return res.status(400).json({ message: 'Something went wrong' });
            }
    
        })
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

});

//Get Product ID by POST using Body
router.post("/getarticlebycategory", (req, res) => {

    console.log('Get all articles in categories requested')

    Article.find({category : req.body.category} , (err , docs)=>{

        if(!err)
        {
            res.send(docs)
        }
        else{
            return res.status(400).json({ message: 'Something went wrong' });
        }

    })
  
});

//Create a product
router.post("/create", (req, res) => {

    console.log('Create a new article requested')

    const {article} = req.body

    //console.log(product);

    const articleModel = new Article({
        title : article.title , 
        image : article.image,
        category : article.category,
        writer : article.writer,
        comments : article.comments,
        text : article.text,
        date: article.date,
        image: article.image

    })

    articleModel.save(err=>{
        if(err){
            return res.status(400).json({ message: 'Something went wrong' });
        }else{
            res.send('Product Added Successfully')
        }
    })
  
});

module.exports = router