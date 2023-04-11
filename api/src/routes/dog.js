const Router = require('express')
const axios = require('axios');
const {Dog, Temperament} = require('../db')
const {YOUR_API_KEY} = process.env;
const {v4: newUuid} = require('uuid')


const router = Router()

const getApiInfo = async() => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?key=${YOUR_API_KEY}`);
    const apiInfo = await apiUrl.data.map(e => {
        return {
            id: e.id,
            name: e.name,
            image: e.image.url,
            weight_min: parseInt(e.weight.metric.slice(0, 2).trim()),
            weight_max: parseInt(e.weight.metric.slice(4).trim()),
            height_min: parseInt(e.height.metric.slice(0, 2).trim()),
            height_max: parseInt(e.height.metric.slice(4).trim()),
            life_span: e.life_span,
            temperament: e.temperament,
        }
    })
    return apiInfo
}

const getDbInfo = async() => {
    const dogsDB = await Dog.findAll({
        inclue: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            },
        }
    });
    return dogsDB;
}

const getAllInfo = async() => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo)
    return infoTotal;
}

router.get('/', async (req,res) => {
    const {name} = req.query
    try{
        let dogs = await getAllInfo();
        if(name){
            let dogsName = await dogs.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
            if(dogsName.lenght === 0){
                return res.status(404).send('dog not found')
            } else {
                return res.status(200).send(dogsName)
            }
        } else {
            res.status(200).send(dogs)
        }
    } catch(e) {
        res.status(404).json("There is no dogs with this name")
    }
})



router.get('/:idRaza', async(req, res) => {
    const {idRaza} = req.params;
    try{
        const dogs = await getAllInfo();
        if(!idRaza){
            res.status(404).send("Couldn't find the dog's name")
        } else {
            const dog = await dogs.find(d => d.id.toString() === idRaza)
            res.status(200).json(dog)
        }
    } catch(e){
        res.status(404).send('There is no dog with this id')
    }
})

router.post('/', async(req, res) => {
    const {
        name, 
        image, 
        height_min, 
        height_max, 
        weight_min, 
        weight_max, 
        life_span, 
        temperament
    } = req.body
    if(!name || !height_min || !height_max || !weight_min || !weight_max || !life_span || !image){
        return res.status(400).send({msg: "Some data is missing"})
    }
    try {
        let dogCreated = await Dog.create(req.body)
        let temperamentDb = await Temperament.findAll({
            where: {name: temperament}
        });
        dogCreated.addTemperament(temperamentDb)
        res.send("Dog created succesfully")
    } catch(e) {
        console.log(e)
    }
})
    
    


module.exports = router