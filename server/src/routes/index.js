const express = require('express')
const routeNhanVien = require('./nhanvien')
const routeAccount = require('./account')
const routes = express.Router();
// const routeNhanVien = require("../app/controllers/nhanvienController");

routes.use('/',routeNhanVien);
routes.use('/account', routeAccount);
// router.get('/listdata',nhanvienController.aaa);


module.exports = routes;

// const a = "aaaa"
// console.log(a);
// module.exports = a;