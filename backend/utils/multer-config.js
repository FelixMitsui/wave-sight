const multer = require('multer');

function uploadFile(req, res, next) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/images')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })

    //dest 值爲文件存儲的路徑;single方法,表示上傳單個文件,參數爲表單數據對應的key
    let upload = multer({ storage: storage }).fields([{ name: "productImgs", maxCount: 5 }, { name: "productDetailImgs", maxCount: 3 }]);
    upload(req, res, (err) => {

        //打印結果看下面的截圖
        // console.log(JSON.parse(req.body.data));
        // console.log('files' + req.files);
        if (err) {
            res.send("err:" + err);
        } else {
            //將文件信息賦值到req.body中，繼續執行下一步
            req.files = req.files;
            req.body = req.body
            res.send(200)
            next();
        }
    })
}
module.exports = uploadFile