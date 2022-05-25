const mongoose = require('mongoose');
const Saller = mongoose.model('Saller')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getError } = require('./../utils/getErros');
const secret = process.env.JWT_SECRET;

module.exports = {
	async newSaller (req, res) {
		try {
			let { fullName, cpf, email, password } = req.body;
			password = await bcrypt.hash(password, 10)   
			
			const token = jwt.sign(req.body, secret);
			const saller = new Saller ({
					fullName: fullName,
					cpf: cpf,
					email: email,
					password: password,
					token: token
			})

			const saved = await saller.save();
			return res.status(200).json(saved);
		} catch (error) {
			console.log(error)
			const e = getError(error)
			return res.status(e.code).json(e);
		}
	}
}
