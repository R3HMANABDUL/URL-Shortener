const express = require("express")
const router = express.Router();
const {GetAllShortUrl,NewShortUrl} = require("../controller/ShortUrl.controller")

router.get('/',GetAllShortUrl)
router.post('/',NewShortUrl)
module.exports = router;
