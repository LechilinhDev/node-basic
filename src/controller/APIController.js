import pool from '../config/connectDB';
let getAllUser = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.status(200).json({
        message: "ok Conecting to React>>>....",
        data: rows
    })
}

let createNewUser = async (req, res) => {
    let { fname, lname, email, adress } = req.body;
    if (!fname || !lname || !email || !adress) {
        return res.status(200).json({
            message: "missing create user"
        })
    }
    await pool.execute('INSERT INTO `users` ( `fisrtname`, `lastname`, `email`, `address`) VALUES (?, ?, ?, ?)', [fname, lname, email, adress]);
    return res.status(200).json({
        message: "ok api create user"
    })
}

let updateUser = async (req, res) => {
    let { fname, lname, email, adress, id } = req.body;
    if (!fname || !lname || !email || !adress || !id) {
        return res.status(200).json({
            message: "missing upadate user"
        })
    }
    await pool.execute('UPDATE users SET fisrtname = ?, lastname= ?, email= ?, address = ? WHERE id=?', [fname, lname, email, adress, id]);
    return res.status(200).json({
        message: "ok put method"
    })
}

let deleteUser = async (req, res) => {
    let userId = req.params.id;
    if (!userId) {
        return res.status(200).json({
            message: "missing Delete user"
        })
    }

    await pool.execute(' DELETE FROM users WHERE id=?', [userId]);
    return res.status(200).json({
        message: "ok"
    })
}

module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser
}