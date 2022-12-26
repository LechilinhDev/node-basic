import pool from '../config/connectDB';
import multer from 'multer';
// import path from 'path';
let getHomePage = async (req, res) => {

    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.render("index.ejs", { dataUser: rows });



}
let getDetailPage = async (req, res) => {
    let userId = req.params.userId;
    const [user] = await pool.execute('SELECT * FROM `users` WHERE id =?', [userId]);
    return res.send(user);
}

let createNewUser = async (req, res) => {
    let { fname, lname, email, adress } = req.body;
    console.log(req.body);
    await pool.execute('INSERT INTO `users` ( `fisrtname`, `lastname`, `email`, `address`) VALUES (?, ?, ?, ?)', [fname, lname, email, adress]);
    return res.redirect('/');
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId;

    await pool.execute(' DELETE FROM users WHERE id=?', [userId]);
    return res.redirect('/');
}

let editUser = async (req, res) => {
    let id = req.params.id;
    let [data] = await pool.execute('SELECT * FROM users where id = ?', [id]);
    console.log(data);
    return res.render('updateUser.ejs', { data: data[0] });
}
let updateUser = async (req, res) => {
    let { fname, lname, email, adress, id } = req.body;
    console.log(id);
    await pool.execute('UPDATE users SET fisrtname = ?, lastname= ?, email= ?, address = ? WHERE id=?', [fname, lname, email, adress, id]);
    return res.redirect('/');
}

let uploadFile = (req, res) => {

    return res.render('uploadFile.ejs');
}








let handleUploadFile = async (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    const upload = multer().single('profile_pic');
    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {

            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="image/${req.file.filename}" width="500"><hr /><a href="./uploadFile">Upload another image</a>`);
    });



}

let handleUploadMultipleFile = async (req, res) => {
    // logic upload multiple controller


    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (req.files.length === 0) {

        return res.send('Please select an image to upload');
    }

    else {
        let result = "You have uploaded these images: <hr />";
        const files = req.files;
        let index, len;

        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {

            result += `<img src="image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
        }
        result += '<hr/><a href="./uploadFile">Upload more images</a>';
        res.send(result);

    }





}

module.exports = {
    getHomePage, getDetailPage, createNewUser, deleteUser, editUser, updateUser, uploadFile, handleUploadFile, handleUploadMultipleFile
}