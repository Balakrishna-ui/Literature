import multer from 'multer';
import path from 'path';

// Configure storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // The path is relative to where the server is run, we mapped '/uploads' to '../public/uploads'
    // but in Node it resolves relative to cwd. It's safer to resolve it absolutely.
    // However, for simplicity let's use a simple relative path 'public/uploads/'
    cb(null, 'public/uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Check file type
function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only! (JPG, PNG, WEBP)'));
  }
}

// Init upload
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

export default upload;
