
const multer = require('multer');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');

const serviceAccount = require('../wave-sight-images-firebase-adminsdk-dtfff-eca7dc8fa7.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const storage = new Storage({
    projectId: 'wave-sight-images',
    keyFilename: 'wave-sight-images-firebase-adminsdk-dtfff-eca7dc8fa7.json'
});

const bucket = storage.bucket('gs://wave-sight-images.appspot.com');

const storageRef = bucket;
const multerStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG or PNG are allowed.'), false);
    }
};

const upload = multer({ storage: multerStorage, fileFilter: fileFilter });

const handleFileUploads = (req, res, next) => {

    const uploadFields = [
        { name: 'product_imgs', maxCount: 10 },
        // { name: 'product_detailImages', maxCount: 10 }
    ];

    //call upload.fields method.
    upload.fields(uploadFields)(req, res, err => {
        if (err) {
            return next(err);
        }

        //get upload files.
        const { product_imgs } = req.files;

        // if upload files is empty，Then call next() directly to skip the file upload section.
        if (!product_imgs) {
            console.log('No product images uploaded.');
            return next();
        }

        // process upload files.
        const productImgPromises = product_imgs.map(file => handleImageUpload(file));


        Promise.all(productImgPromises)
            .then(imgs => {

                req.body.product_imgs = imgs;
                next();
            })
            .catch(error => {
                next(error);

            });
    });
};

const handleImageUpload = (file) => {
    return new Promise((resolve, reject) => {
        const fileName = `${Date.now()}_${file.originalname}`;
        const imageRef = storageRef.file('images/' + fileName);
        const uploadTask = imageRef.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        uploadTask.on('error', (error) => {
            reject(error);
        });

        uploadTask.on('finish', () => {
            imageRef.getSignedUrl({ action: 'read', expires: '03-17-2025' }, (error, url) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(url);
                }
            });
        });
        uploadTask.end(file.buffer);
    });
};

const deleteUploadedImg = (req, res, next) => {

    const imgRef = req.body.imgFile;
    const filePathMatch = imgRef.match(/images\/[^?]+/);

    const file = storageRef.file(filePathMatch);

    file.delete()
        .then(() => {
            next();
        })
        .catch(error => {
            next(error);
        });
};

module.exports = { handleFileUploads, deleteUploadedImg };
