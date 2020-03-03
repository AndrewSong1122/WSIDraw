import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/wsidraw');

let drawingSchema = mongoose.Schema({
    drawing: String,
    prompt: String,
    unsplashuser: String,
    unsplashprofile: String,
    photourls: photoSchema
});

let photoSchema = mongoose.Schema({
    photoraw: String,
    photofull: String,
    photoregular: String,
    photosmall: String,
    photothumb: String
});

let Gallery = mongoose.model('Gallery', drawingSchema);

let save = (info, urls, callback) => {
    let submission = new Gallery({
        drawing: info.drawing,
        prompt: info.prompt,
        unsplashuser: info.unsplashuser,
        unsplashprofile: info.unsplashuser,
        photourls: {
            photoraw: urls.photoraw,
            photofull: urls.photofull,
            photoregular: urls.photoregular,
            photosmall: urls.photosmall,
            photothumb: urls.photothumb
        }
    });
    submission.save((err) => {
        if(err) {
            callback(err);
        } else {
            callback(null);
        }
    });
};

module.exports = {
    save
};