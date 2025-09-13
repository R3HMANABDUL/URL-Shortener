const Url = require("../models/UrlShortmodel.js")
const shortid = require("shortid");


const GetAllShortUrl = async(req,res)=>{
    try {
        const AllUrl = await Url.find()
        if(!AllUrl) return res.status(400).json({massege:"NOT All Url Get"})
            res.status(200).json({URL:AllUrl});
    } catch (error) {
        res.status(500).json({massege:error.massege})
    } 
}

const NewShortUrl = async(req,res)=>{
    try {
        const body = req.body;
        if(!body.url){
            res.status(400).json({massage:"URL NOT IN BODY"})
        }
        const SHORTID = shortid.generate()
        const NewUrl = await Url.create({
            shortId:SHORTID,
            originalUrl:body.url,
            visitHistory:[],
        })
        console.log(NewUrl);
       return res.status(200).json({id:SHORTID});
       
    } catch (error) {
        console.error(error)
        return res.status(500).json({err:"server side error"});
    }
}



const handelredirectUrl = async (req, res) => {
    const shortId = req.params.shortid;

    try {
        if (!shortId) {
            return res.json({ message: "Short id is missing" });
        }

        const entry = await Url.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: { timestamp: Date.now() }
                }
            },
            { new: true }
        );

        if (!entry) {
            return res.status(404).json({ err: "Entry not found" });
        }

        return res.redirect(entry.originalUrl);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ err: "Server error" });
    }
};





module.exports=
{
    GetAllShortUrl,
    NewShortUrl,
    handelredirectUrl
}


