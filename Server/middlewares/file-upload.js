const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const MIME_TYPE_MAP = {
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx'
};

const fileUpload = multer({
  storage: multer.diskStorage({
    destination:  (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: async (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, '/'+uuidv4() + '.' + ext);
    }
  }),
  fileFilter:  (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error('Invalid mime type!');
    cb(error, isValid);
  }
});

module.exports = fileUpload;
