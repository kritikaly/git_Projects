const mongoose = require("mongoose");
const File_path = mongoose.model('File_path');

module.exports.docPost = (req, res, next) => {
    res.send('you have called the document back end bro!');
    const filePath = new File_path();
    console.log(req.files);
    res.send(req.files);
    let file = req.files.images,
    filename = file.name,
    fp = "../real_files/"+filename;

    file.mv(fp, (err) => {
        if(err) {
            console.log(err);
            res.send('error occured');
        }
        else{
            console.log(req.files);
            console.log('this is what was sent!');
        }
    });
    filePath.name = filename;
    filePath.path = fp;

    filePath.save((err, results) => {
        if(err) {
            res.send('could not send the data because of: ' + err);
            console.log(err);
        }
        else {
            console.log(results);
            res.json({filePath: results});
        }
    });
};