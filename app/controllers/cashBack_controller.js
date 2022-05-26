const { getError } = require('./../utils/getErros');
const axios = require("axios");

module.exports = {
	async getApiBoticario (req, res){
		try {
			let cpf = req.params.cpf;
			let urlBoticario = process.env.API_BOTICARIO
			let resp = await axios.get( urlBoticario + cpf, {timeout : 3000 });
			if(resp.status != 200) new Error(resp.status)
			return res.status(200).send(resp.data);
		} catch (error) {
			console.log(error)
			const e = getError(error)
			return res.status(e.code).send(e);
		}
	}
};