const moment = require('moment');
const mongoose = require('mongoose');
const Saller = mongoose.model('Saller');
const Purschase = mongoose.model('Purschase');
const { getError } = require('./../utils/getErros');

module.exports = {
	async newPurschase (req, res) {
		try {
		const token = req.headers.authorization;
			if(!token) throw new Error('token is required');

			const { code, value, saller_id } = req.body;

		const userFound = await Saller.findOne({ saller_id }).select('+password');
			if(!userFound) throw new Error("user not found");

			if(!token.includes(userFound.token)) throw 'token-incorrect';

			let status = "Em Validação";
			if(userFound.cpf == 15350946056) status = "Aprovado"
			
			let cashBack = cashBackValue(value);

			const purschase = new Purschase ({
				code: code,
				value: value,
				date: moment().format("DD/MM/YYYY - HH:mm:SS"),
				cpf: userFound.cpf,
				saller_id: saller_id,
				status: status,
				cashBack: cashBack
			});

			const saved = await purschase.save();
			return res.status(200).json(saved);
		} catch (error) {
			console.log(error)
			const e = getError(error)
			return res.status(e.code).json(e);
		}
	},

	async getPurschases (req, res){
		try {
			let saller_id = req.params.id;
			let cpf = req.query.cpf;
			let page = req.query.page || 0;
			let skip = page * 10;
			
			let query = { }
			if(cpf) query = { cpf: cpf }
			else if(saller_id) query = { saller_id: saller_id };
			

			let found = []
			let cashBackTotal = []
			let cashBackValueTotal = 0
			
			await Promise.all([ 
				Purschase.find( query ).limit(10).skip(skip),  
				Purschase.find( query )
			]).then(res => {
				found = res[0];
				cashBackTotal = res[1]
			})
			
			cashBackTotal.forEach(el => {
				console.log(el.value)
				cashBackValueTotal = cashBackValueTotal + el.cashBack	
				console.log(cashBackValueTotal)
			})

			return res. status(200).json({
				totalPerPage: found.length,
				page: page,
				cashBackValueTotal: cashBackValueTotal, 
				data: found
			});

		} catch (error) {
			console.log(error)
			const e = getError(error)
			return res.status(e.code).json(e);
		}
	}
}

const cashBackValue = (value) => {
	let cashBack = {}
	switch (true){
		case (value) > 1500:
			cashBack = (Math.floor(value * 20) / 100).toFixed(2);
			break;
		case (value >= 1000 && value <= 1500):
			cashBack = (Math.floor(value * 15) / 100).toFixed(2)
			break;
		default:
			cashBack = (Math.floor(value * 10) / 100).toFixed(2) 
	}
	return cashBack
};