const router = require('express').Router();
const {User, BlogPost} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req,res) => {
    
    try{
        //Get all blog posts and render to page 
        const BlogPostData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                }
            ]
        });

        // Serialize Data so that the template can read it
        const blogPosts = BlogPostData.map((posts) => posts.get({plain: true}));

        //Pass Serialized data and session flag into template
        res.render('homepage', {
            blogPosts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    //If the user is already logged in, redirect the request to another route
    try{
        if (req.session.logged_in) {
            res.redirect('profile');
            return;
        } else {
            res.render('login');
        }
    } 
    catch (err){
    res.status(500).json(err);
   }
});

router.get('/createPost', async (req, res) => {
    //If the user is already logged in, redirect the request to another route
    try{
        res.render('createPost');
    } 
    catch (err){
    res.status(500).json(err);
   }
});


//Use withAuth to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
    try{

        const user = await User.findByPk(req.session.user_id);

        const postData = await BlogPost.findAll({
            include: [User],
            where: {
                user_id: req.session.user_id
            }
        });

        const name = user.name;
        const posts = postData.map((post) => post.get({plain: true}));
        res.render('profile', {
            posts,
            name,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});


module.exports = router;
