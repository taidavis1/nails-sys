const express = require('express');
const router = express.Router();
//! imp Controllers
const serviceController = require('../controllers/serviceController');
//! get All ServiceCategory
// router.post("/:serviceCategoryId", serviceController.create);
// router.get("/:serviceCategoryId", serviceController.readAll);

//! Get All of Service Category
router.get("/", serviceController.getAllServiceCategories);
//! CREATE ServiceCategory
router.post('/', serviceController.createServiceCategory);
//! CREATE Service
router.post('/:serviceCategoryId', serviceController.createService);
//! DELETE Service within Category
router.delete('/:serviceCategoryId/:serviceId', serviceController.deleteService);
//! UPDATE Service within Category
router.patch('/:serviceCategoryId/:serviceId', serviceController.updateService);

module.exports = router;