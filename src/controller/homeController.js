import pool from '../config/connectDB';
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

module.exports = {
    getHomePage, getDetailPage, createNewUser, deleteUser, editUser, updateUser
}