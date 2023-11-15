const express = require('express');
const cardController = require('../controllers/cardController');
const router = express.Router();

router
  .route('/')
  .get(cardController.getAllCards)

router
  .route('/upload')
  .get(cardController.uploadPage)
  .post(cardController.upload.single('image'), cardController.createCard);

router
  .route('/edit/:id')
  .get(cardController.editPage)
  .post(cardController.updateCard);

router
  .route('/delete/:id')
  .post(cardController.deleteCard);

module.exports = router;