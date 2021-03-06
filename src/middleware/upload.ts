import multer from 'multer'

const upload = multer(
    {
        limits: {
            fileSize: 1000000
        },
        fileFilter(req, file, next) {
            if (!file.originalname.match(/\.(png|PNG|jpg|jpeg)$/)) {
                return next(Error('you must upload image'))
            }
            next(null, true)
        }
    }
).single('avatar')
export default upload