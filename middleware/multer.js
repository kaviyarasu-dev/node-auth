import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, 'storage/uploads/')
    },
    filename: function (request, file, callback) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = file.originalname.split('.').pop();

        callback(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
    }
})

/**
 * Filters files based on their MIME type.
 *
 * @param {Object} request - The request object.
 * @param {Object} file - The file object.
 * @param {Function} callback - The callback function.
 *
 * @throws {Error} If the file type is not allowed.
 */
const fileFilter = (request, file, callback) => {
    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(new Error('Invalid file type'), false);
    }
};

export default multer({ storage: storage, fileFilter: fileFilter });

