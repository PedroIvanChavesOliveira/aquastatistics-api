const express = require('express');
const System = require('../models/System.js');
const ProbeParameters = require('../models/ProbeParameters.js');
const DeskParameters = require('../models/DeskParameters.js');
const router = express.Router();

//GET User Systems
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const findByUserId = await System.find({ userId: userId });
    if (findByUserId.lenght != 0) {
      return res.send(findByUserId);
    } else {
      return res.send('Lista Vazia');
    }
  } catch (err) {
    res.status(400).send('Erro');
  }
});

//POST Add System
router.post('/saveSystem', async (req, res) => {
  try {
    const saveSystem = await System.create(req.body);
    return res.send(saveSystem);
  } catch (err) {
    res.status(400).send('Erro');
  }
});

//PUT Update System
router.put('/updateSystem/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateSystem = await System.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    return res.send(updateSystem);
  } catch (err) {
    res.status(400).send('Erro');
  }
});

//DELETE Delete System
router.delete('/deleteSystem/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleteProbeParameters = await ProbeParameters.deleteMany({
      systemId: id,
    });
    const deleteDeskParameters = await DeskParameters.deleteMany({
      systemId: id,
    });
    const deleteSystem = await System.deleteOne({ _id: id });
    return res.send('Sistema Deletado com Sucesso!');
  } catch (err) {
    res.status(400).send('Erro');
  }
});

module.exports = (app) => app.use('/system', router);
