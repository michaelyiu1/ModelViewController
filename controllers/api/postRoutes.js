const router = require('express').Router();
const { BlogPost } = require('../../models');

router.post('/', async (req, res) => {
    try{
        //... is spread operator
        const newPost = await BlogPost.create({...req.body, user_id: req.session.user_id});
        console.log(newPost);

        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;