var express = require('express');
var router = express.Router();
var Users = require('./../cache/Users')

/* GET users listing. */

router.get('/', async function(req, res, next) {
  const userInstance = await Users.getInstance()
  const users = await userInstance.getAllUsers()
  return res.send({
    data: users || []
  })
 });

router.post('/', async function(req, res, next) {
  const userName = req.body.name
  const userInstance = await Users.getInstance()
  if(userName) {
    const data = await userInstance.addUser(userName)
    return res.status(200).send({
      message: 'added User',
      data
    })
  }
  res.status(400).send({message: 'forbidden'})
})

module.exports = router;
