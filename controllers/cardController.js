const Card = require('../models/cardModel')
const multer = require('multer')

// multer config for image upload
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const getAllCards = async (req,res) => {
    try{
        const cards = await Card.find().populate('owner');
        res.render('home',{card: cards, user: req.user})
    } catch(err) {
        console.log(err)
    }
}

const uploadPage = (req, res) => {
    res.render('upload', {user: req.user});
};
  
const createCard = async (req, res) => {
    try {
      const card = new Card({
        name: req.body.name,
        bio: req.body.bio,
        location: req.body.location,
        birthDate: req.body.birthDate,
        image: req.file.filename, // multer places the file info in req.file
        createdAt: new Date(),
        owner: req.user._id
      });
  
      await card.save();
      res.redirect('/');
    } catch(err) {
      console.log(err);
    }
};
  
const editPage = async (req, res) => {
    try {
      const card = await Card.findById(req.params.id);
      res.render('edit', { card: card, user: req.user });
    } catch(err) {
      console.log(err);
    }
};
  
const updateCard = async (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    try {
      let card = await Card.findById(req.params.id)
      if(card.owner.equals(req.user._id)){
        await Card.findByIdAndUpdate(req.params.id, req.body);
      }
      res.redirect('/');
    } catch(err) {
      console.log(err);
    }
};
  
const deleteCard = async (req, res) => {
    try {
      let card = await Card.findById(req.params.id)
      if(card.owner.equals(req.user._id)){
        await Card.findByIdAndRemove(req.params.id);
      }
      res.redirect('/');
    } catch(err) {
      console.log(err);
    }
};
  
module.exports = {
    getAllCards,
    upload,
    uploadPage,
    createCard,
    editPage,
    updateCard,
    deleteCard
};