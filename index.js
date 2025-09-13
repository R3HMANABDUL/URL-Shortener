const express  = require('express');
const app = express();
const port = 5000;
const DbConnection = require('./config/Database');
const path = require('path');
const UrlShortnerRoute = require('./router/UrlShortner.route');
const Url = require("./models/UrlShortmodel.js");
const { timeStamp } = require('console');




// DatabASeConnection 
DbConnection();

// middelWare
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("./uploads",express.static(path.join(__dirname,'uploads')));
app.use(express.static('public'));

// Route Middleware
app.use('/api/url',UrlShortnerRoute)

app.get('/api/url/:shortid', async (req, res) => {
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
});


app.listen(port,()=>{
    console.log(`Server is start port : ${port}`);
    
})