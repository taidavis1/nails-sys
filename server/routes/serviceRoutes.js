const express = require('express');
const router = express.Router();
//! imp Controllers
const servicesController = require('../controllers/servicesController');
//! get All ServiceCategory
// router.post("/:serviceCategoryId", servicesController.create);
// router.get("/:serviceCategoryId", servicesController.readAll);

//! Get All of Service Categories
router.get('/', servicesController.getAllServiceCategories);
//! Get SubCategories by CatId
// router.get('/:serviceCategoryId', servicesController.getSubCategoriesByCatId);
//! Get Services by SubId
// router.get('/:serviceCategoryId/:subCategoryId', servicesController.getServicesBySubId);
//! CREATE ServiceCategory
router.post('/', servicesController.createServiceCategory);
//! CREATE Sub
router.post('/:serviceCategoryId', servicesController.createSubCategory);
//! CREATE Service
router.post('/:serviceCategoryId/:subCategoryId', servicesController.createService);
//! DELETE Service within Category
router.delete('/:serviceCategoryId/:serviceId', servicesController.deleteService);
//! UPDATE Service within Category
router.patch('/:serviceCategoryId/:serviceId', servicesController.updateService);

module.exports = router;
