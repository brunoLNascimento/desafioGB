const mongoose = require('mongoose');
const Saller = mongoose.model('Saller')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = process.env.JWT_SECRET;
const validatorEmail = require("email-validator");
const { cpf } = require("cpf-cnpj-validator");
const { getError } = require('./../utils/getErros');

module.exports = {
	async newSaller (req, res) {
		try {
			let { fullName, doc, email, password } = req.body;

			let isValid = validatorEmail.validate(email);
			if(!isValid) throw new Error("Email is not valid");

			let isCpfValid = cpf.isValid(doc);
			if(!isCpfValid) throw new Error("Email is not valid");
		
			await Promise.all([ 
				Saller.find({ doc: doc }),  
				Saller.find({ email: email })
			]).then(res => {
				if(res[0][0] || res[1][0])
					throw new Error("CPF or Email already exist");
			})

			password = await bcrypt.hash(password, 10);
			
			const token = jwt.sign(req.body, secret);
			const saller = new Saller ({
					fullName: fullName,
					cpf: cpf,
					email: email,
					password: password,
					token: token
			});

			const saved = await saller.save();
			return res.status(200).json(saved);
		} catch (error) {
			console.log(error);
			const e = getError(error);
			return res.status(e.code).json(e);
		}
	},

	async getSaller (req, res){
		try {
			let saller_id = req.params.id;
			let cpf = req.query.cpf;
			let page = req.query.page || 0;
			let skip = page * 10;
			
			let query = {};
			if(cpf) query = { cpf: cpf };
			else if(saller_id) query = { saller_id: saller_id };

			let found = await Saller.find(query).limit(10).skip(skip);
			return res.status(200).send({total: found.length, data: found});
		} catch (error) {
			console.log(error);
			const e = getError(error);
			return res.status(e.code).send(e);
		}
	}
};
