const express = require("express")
const router = express.Router();
const {GetAllShortUrl,NewShortUrl,handelredirectUrl} = require("../controller/ShortUrl.controller")

router.get('/',GetAllShortUrl)
router.post('/',NewShortUrl)
router.get('/:shortid',handelredirectUrl)
module.exports = router;
