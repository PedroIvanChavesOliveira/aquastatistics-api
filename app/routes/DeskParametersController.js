const express = require('express');
const DeskParameters = require('../models/DeskParameters.js');
const router = express.Router();

// POST Desk Parameters
router.post('/setParameters', async (req, res) => {
  try {
    const parameters = await DeskParameters.create(req.body);

    return res.send(parameters);
  } catch (err) {
    return res.status(400).send({ error: 'Parâmetros não registrados' });
  }
});

//GET All By SystemId
router.get('/getAll/:systemId', async (req, res) => {
  try {
    const systemId = req.params.systemId;
    const findBySystemId = await DeskParameters.find({ systemId: systemId });
    if (findBySystemId.length === 0) {
      return res.send('Sistema Vazio');
    } else {
      return res.send(findBySystemId);
    }
  } catch (err) {
    return res.status(400).send({ error: 'Sistema não encontrado' });
  }
});

//GET Last Date Modified
router.get('/:systemId', async (req, res) => {
  try {
    const systemId = req.params.systemId;
    let aux = '';
    const findBySystemId = await DeskParameters.find({ systemId: systemId });
    findBySystemId.forEach((system) => {
      if (system.registerAt > aux) {
        aux = system.registerAt;
      }
    });
    res.send(aux);
  } catch (err) {
    res.status(400).send({ error: 'Sistema não encontrado' });
  }
});

//GET By Period And System Id
router.get('/:systemId/:period', async (req, res) => {
  try {
    const systemId = req.params.systemId;
    const period = req.params.period;
    let weekList = [];
    let monthList = [];
    let biweekList = [];
    const findBySystemId = await DeskParameters.find({ systemId: systemId });

    findBySystemId.forEach((param) => {
      if (period === 'month' && param.registerAt >= Date.now() - 2764800000) {
        monthList.push(param);
      } else if (
        period === 'biweek' &&
        param.registerAt >= Date.now() - 1382400000
      ) {
        biweekList.push(param);
      } else if (param.registerAt >= Date.now() - 777600000) {
        weekList.push(param);
      }
    });

    switch (period) {
      case 'week':
        return res.send(weekList);
        break;
      case 'biweek':
        return res.send(biweekList);
        break;
      case 'month':
        return res.send(monthList);
        break;
      default:
        break;
    }
  } catch (err) {
    res.status(400).send({ error: 'Algo deu errado' });
  }
});

module.exports = (app) => app.use('/deskParameters', router);
