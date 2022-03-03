//! imp Models
const ServiceCategory = require('../models/ServiceCategory');
const Service = require('../models/Service');

//! GET ServiceCategory (GET)
const getAllServiceCategories = async (req, res, next) => {
    try {
        let serviceCategories = await ServiceCategory.find({}).populate({ path: 'services', model: 'Service' });
        //! response
        res.status(200).json({ serviceCategories });
    } catch (error) {
        console.log('service getAll() error: ', error);
        res.status(500).json({
            errorMessage: 'Please try again next time',
        });
    }
};

const getServicesWithCategory = async (req, res, next) => {
    const { serviceCategoryId } = req.params;
    console.log(`serviceController - serviceCategoryId: `, serviceCategoryId);
    try {
        let servicesCategory = await ServiceCategory.findById({ serviceCategoryId }).populate({ path: 'services', model: 'Service' });
        // const services = await ServiceCategory.find({ _id: serviceCategoryId });
        let services = servicesCategory[0].services;
        console.log('SUCCESS serviceController - getServicesWithCategory: ', services);
        res.status(200).json({ services }); //! return -> Action payload
    } catch (error) {
        console.log('ERROR serviceController - getServicesWithCategory: ', error);
        res.status(500).json({
            errorMessage: 'Please try again next time',
        });
    }
};

//! CREATE ServiceCategory (POST)
const createServiceCategory = async (req, res) => {
    try {
        const { name } = req.body;

        let existServiceCategory = await ServiceCategory.findOne({ name });
        if (existServiceCategory) {
            return res.status(400).json({ errorMessage: `Category: ${name} already exists!` });
        }

        let serviceCategory = new ServiceCategory();
        serviceCategory.name = name;
        serviceCategory = await serviceCategory.save();

        // const serviceCategory = ServiceCategory.create(serviceCategory);
        res.status(200).json({
            serviceCategory,
            successMessage: `Service Category ${serviceCategory.name} created successfully!`,
        });

        console.log('SUCCESS serviceController.createServiceCategory: ', serviceCategory);
    } catch (error) {
        res.status(500).json({
            errorMessage: 'Please try again next time',
        });
        console.log('ERROR serviceController.createServiceCategory: ', error);
    }
};

//! CREATE Service (POST)
const createService = async (req, res, next) => {
    try {
        const { name, price, description } = req.body;
        const { serviceCategoryId } = req.params;

        console.log(`serviceController - id: `, serviceCategoryId);

        let existService = await Service.findOne({ name });
        if (existService) {
            console.log('ERROR serviceController.createService');
            return res.status(400).json({ errorMessage: `Service - ${name} already exists!` });
        }

        let service = new Service();
        service.name = name;
        service.price = price;
        service.description = description;
        service.category = serviceCategoryId;
        service = await service.save();

        //! UPDATE - Service Category
        await ServiceCategory.findByIdAndUpdate(serviceCategoryId, { $push: { services: service._id } }, { new: true });

        res.status(200).json({
            service,
            successMessage: `Service ${service.name} created successfully!`,
        });

        // const newServiceCategory = ServiceCategory.create(serviceCategory);
        console.log('SUCCESS serviceController.createService: ', service);
    } catch (error) {
        res.status(500).json({
            errorMessage: 'Please try again next time',
        });
        console.log('ERROR serviceController.createService: ', error);
    }
};

//! DELETE Serivce (DELELTE)
const deleteService = async (req, res, next) => {
    try {
        const { serviceCategoryId, serviceId } = req.params;
        console.log(`serviceController.deleteService - serviceCategoryId: `, serviceCategoryId);
        console.log(`serviceController.deleteService - serviceId: `, serviceId);

        let existService = await Service.findById(serviceId);
        if (!existService) {
            console.log('ERROR serviceController.deleteService: Service not exist');
            return res.status(400).json({ errorMessage: `Service exist!` });
        }

        // await ServiceCategory.updateMany({ _id: service.category }, { $pull: { products: product._id } });
        //! Update delete id Category

        let service = await existService.remove();

        console.log(`SUCCESS serviceController.deleteService - removalService: `, service);

        res.status(200).json({
            service,
            successMessage: `Service removed successfully!`,
        });
    } catch (error) {
        res.status(500).json({
            errorMessage: 'Please try again next time',
        });
        console.log('ERROR serviceController.deleteService: ', error);
    }
};

//! EDIT Service (PUT)
const updateService = async (req, res, next) => {
    try {
        const { name, price, description } = req.body;
        const { serviceCategoryId, serviceId } = req.params;

        console.log(`serviceController.updateService - serviceCategoryId: `, serviceCategoryId);
        console.log(`serviceController.updateService - serviceId: `, serviceId);

        let existService = await Service.findById(serviceId);
        if (!existService) {
            console.log('ERROR serviceController.updateService: Service exist');
            return res.status(400).json({ errorMessage: `Service not exist!` });
        }

        let updatedService = await Service.findByIdAndUpdate(serviceId, req.body, { new: true });
        // { sort: { points: 1 }, upsert: false, returnNewDocument: true }
        //! The `upsert` = true option creates the object if it doesn't exist. defaults to false.
        //! If `new`: false, findOneAndUpdate()` will return the document as it was _before_ it was updated. (false -> old, true -> new)

        console.log(`SUCCESS serviceController.updateService: `, updatedService);
        res.status(200).json({
            updatedService,
            successMessage: `Service updated successfully!`,
        });

        // console.log(`SUCCESS serviceController.deleteService - removeService: `, service);
    } catch (error) {
        res.status(500).json({
            errorMessage: 'Please try again next time',
        });
        console.log('ERROR serviceController.updateService: ', error);
    }
};

module.exports = {
    getAllServiceCategories,
    getServicesWithCategory,
    createServiceCategory,
    createService,
    deleteService,
    updateService,
};
