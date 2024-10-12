const express =require("express");
const router= express.Router();
const asynchandler = require('express-async-handler')
const Post=require("../models/posts")




router.get('', async (req, res) => {
    try {

      let perPage = 10;
      let page = req.query.page || 1;
  
      const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
  
      // Count is deprecated - please use countDocuments
      // const count = await Post.count();
      const count = await Post.countDocuments({});
      const nextPage = parseInt(page) + 1;
      const hasNextPage = nextPage <= Math.ceil(count / perPage);
  
      res.render('index', { 
        data,
        current: page,
        nextPage: hasNextPage ? nextPage : null,
        currentRoute: '/'
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });

router.get("/post/:id",asynchandler(async(req,res)=>{

    let slug = req.params.id;
    const data= await Post.findById({_id:slug});
    res.render('post',{data});

}))

router.post("/search",asynchandler(async(req,res)=>{

    let searchTerm = req.body.searchTerm;
    const searchnoSpecialChar=searchTerm.replace(/[^a-zA-Z0-9]/g,"");
    const data =await Post.find({
        $or:[
            {title:{$regex:new RegExp(searchnoSpecialChar,'i')}},
            {body:{$regex:new RegExp(searchnoSpecialChar,'i')}},
        ]
    })

    res.render('search_result',{data});

}));

router.get("/about",asynchandler((req,res)=>{
    res.render('about');
    
}));


module.exports=router;