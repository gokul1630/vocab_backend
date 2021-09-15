const router = require('express').Router()
const { default: axios } = require('axios')
const VocabModel = require('../model/VocabModel')

router.get('/', async (req, res) => {
	try {
		const response = await VocabModel.find()
		res.status(200).json(response)
	} catch (error) {
		console.log(error)
	}
})
router.get('/search', async (req, res) => {
	try {
		const { query } = req.query
		console.log(query)
		let response = await axios(
			`https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${query}`,
			{
				method: 'GET',
				headers: {
					app_key: process.env.APP_KEY,
					app_id: process.env.APP_ID,
					'Content-Type': 'application/json',
					Accept: 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			}
		)
		const data = await VocabModel.create({
			vocabName: query,
			vocabData: JSON.stringify(response.data),
		})
		res.status(200).json(data)
	} catch (error) {
		console.log(error)
	}
})

module.exports = router
