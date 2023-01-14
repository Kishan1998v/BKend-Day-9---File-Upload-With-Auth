const multer = require('multer'); 
const path = require('path')

const storage = multer.diskStorage({
    //who ever is uploading a file where should it go?

    //so whenever the file is uploaded put it in COntent FOlder (../Content)
    destination: (req, file, cb) => {
        cb(null, "Content")
    },
    //suppose we both are uploading a 2dif images with same filename ...
    //that will create a issue
    //so handle That: 
    //              we convert the filename into something some other name ...just like token name
    filename: (req, file, cb) => { //cb = callback
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

//now we check for extentions

const upload = multer({ // below these are all some propeties
    storage,
    limits: { fileSize: 100000 * 100 },//Around 10mb
    fileFilter: (req, file, callback) => {
        const fileTypes = /jpg|png|mp4|gif/;
        // const mimeType = fileTypes.test(file.mimetype);//for images we call it mimeTypes
        // const extname = fileTypes.test(path.extname(file.originalname));
        // console.log(mimeType, extname);
        // if (mimeType && extname) {
            return callback(null, true);
        // }
        // callback("ONLY IMAGES SUPPORTED");
    }
    //single means we say at a time upload a single file 
}).single("content");//this is key in which person will upload a file.


module.exports = upload;