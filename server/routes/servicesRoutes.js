const express = require('express');
const router = express.Router();
//! imp Controllers
const servicesController = require('../controllers/servicesController');
//! get All ServiceCategory
// router.post("/:serviceCategoryId", servicesController.create);
// router.get("/:serviceCategoryId", servicesController.readAll);

//! Get All of Service Category
router.get("/", servicesController.getAllServiceCategories);
//! CREATE ServiceCategory
router.post('/', servicesController.createServiceCategory);
//! CREATE Service
router.post('/:serviceCategoryId', servicesController.createService);
//! DELETE Service within Category
router.delete('/:serviceCategoryId/:serviceId', servicesController.deleteService);

module.exports = router;