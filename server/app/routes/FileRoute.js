import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hola mundo')
})

router.post('/upload', (req, res) => {
    res.send('Archivo subido');
})

export default router