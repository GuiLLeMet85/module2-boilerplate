const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({ 
    cloud_name: 'dnxl4zry6', 
    api_key: '894588674648329', 
    api_secret: 'iPWxC4xe3muLHzFWEjF-mM6aqD0' 
  });

const storage = new CloudinaryStorage({
    // cloudinary: cloudinary,
    cloudinary,
    params: {
        allowed_formats: ['jpg', 'png'],
        folder: 'pictures' // The name of the folder in cloudinary
        // resource_type: 'raw' => this is in case you want to upload other type of files, not just images
    }
});

//                     storage: storage
module.exports = multer({ storage });