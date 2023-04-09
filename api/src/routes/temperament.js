const Router = require('express')
const axios = require('axios');
const {Dog, Temperament} = require('../db')
const {YOUR_API_KEY} = process.env;


const router = Router()

router.get('/', async (req, res) => {
    const temperamentApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
    const temperaments = temperamentApi.data.map(el => el.temperament);
    let temps = temperaments.join().split(",");
    temps = temps.map(el => el.trim())
    temps.forEach(el => {
        if(el !== ''){
            Temperament.findOrCreate({
                where: {name: el}
            })
        }
    })
    const allTemp = await Temperament.findAll()
    res.status(200).send(allTemp)
})



module.exports = router