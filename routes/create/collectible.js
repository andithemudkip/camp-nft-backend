const { Router } = require('express');
const multer = require('multer');
const { generateSmallSize } = require('../../lib/resizeFile');
const { initIpfs } = require('../../lib/IPFS');

const log = (req, res, next) => {
    console.log('req log=', req.path);
    next();
}

const uploadToIPFS = async file => {
    const ipfs = initIpfs();
    const buffer = file.arrayBuffer ? await file.arrayBuffer() : file;
    const addedFile = await ipfs.add(buffer);
    await ipfs.pin.add(addedFile.path);
    return addedFile.path;
}

const mediaUpload = multer({
    storage: multer.memoryStorage(), //storage,//
    limits: {
        fileSize: 100000000
    },
});
let upload = async(req, res, next) => {
    const file = req.files.fileData[0];
    try {
        const small = await generateSmallSize(cover.buffer);
        const res = await uploadToIPFS(small);
        const metadata = {
            name: req.body.name || 'Odd Sparky',
            description: req.body.description || "",
            image: `ipfs://${res}`,
            mimetype: file.mimetype
        }
        const meta = await uploadToIPFS(JSON.stringify(metadata));
        res.status(200).json({
            metadata: 'ipfs://' + meta
        });
    } catch (err) {
        next(err);
    }
}

module.exports = () => {
    const router = Router();
    router.post('/upload',
        log,
        mediaUpload.fields([{ name: 'fileData', maxCount: 1 }]),
        upload);
    return router;
}