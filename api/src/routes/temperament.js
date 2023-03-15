const Router = require('express')
const axios = require('axios');
const {Dog, Temperament} = require('../db')
const {YOUR_API_KEY} = process.env;


const router = Router()

router.get('/', async (req, res) => {
    const temperamentApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
    const temperaments = temperamentApi.data.map(t => t.temperament);
    const temps = temperaments.toString().split(",");
    temps.forEach(el => {
        let i = el.trim()
        Temperament.findOrCreate({
            where: {
                name: i
            }
        })
    })

    const allTemp = await Temperament.findAll()
    res.send(allTemp)
})



module.exports = router