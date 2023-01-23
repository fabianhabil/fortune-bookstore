import multer from 'multer';
import path from 'path';

const uploader = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../images'));
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    }
});

export default uploader;
