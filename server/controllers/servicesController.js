//! imp Models
const ServiceCategory = require('../models/ServiceCategory');
const Service = require('../models/Service');

//! GET ServiceCategory
const getAllServiceCategories = async (req, res, next) => {
    try {
        const serviceCategories = await ServiceCategory.find({}).populate({ path: 'services', model: 'Service' });
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
    console.log(`servicesController - serviceCategoryId: `, serviceCategoryId);
    try {
        const servicesCategory = await ServiceCategory.findById({ serviceCategoryId }).populate({ path: 'services', model: 'Service' });
        // const services = await ServiceCategory.find({ _id: serviceCategoryId });
        const services = servicesCategory[0].services;
        console.log('SUCCESS servicesController - getServicesWithCategory: ', services);
        res.status(200).json({ services }); //! return -> Action payload
    } catch (error) {
        console.log('ERROR servicesController - getServicesWithCategory: ', error);
        res.status(500).json({
            errorMessage: 'Please try again next time',
        });
    }
};

//! CREATE ServiceCategory
const createServiceCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const existServiceCategory = await ServiceCategory.findOne({ name });
        if (existServiceCategory) {
            return res.status(400).json({ errorMessage: `Category: ${name} already exists!` });
        }

        var serviceCategory = new ServiceCategory();
        serviceCategory.name = name;
        serviceCategory = await serviceCategory.save();

        // const serviceCategory = ServiceCategory.create(serviceCategory);
        res.status(200).json({
            serviceCategory,
            successMessage: `Service Category ${serviceCategory.name} created successfully!`,
        });

        console.log('SUCCESS servicesController.createServiceCategory: ', serviceCategory);
    } catch (error) {
        res.status(500).json({
            errorMessage: 'Please try again next time',
        });
        console.log('ERROR servicesController.createServiceCategory: ', error);
    }
};

const createService = async (req, res, next) => {
    try {
        const { name, price, description } = req.body;
        const { serviceCategoryId } = req.params;

        console.log(`servicesController - id: `, serviceCategoryId);

        const existService = await Service.findOne({ name });
        if (existService) {
            console.log('ERROR servicesController.createService');
            return res.status(400).json({ errorMessage: `Service - ${name} already exists!` });
        }

        //! CREATE - Serivce
        var service = new Service();
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
        console.log('SUCCESS servicesController.createService: ', service);
    } catch (error) {
        res.status(500).json({
            errorMessage: 'Please try again next time',
        });
        console.log('ERROR servicesController.createService: ', error);
    }
};

const deleteService = async (req, res, next) => {
    try {
        const { serviceCategoryId, serviceId } = req.params;
        console.log(`serviceController - deleteService - serviceCategoryId: `, serviceCategoryId);
        console.log(`serviceController - deleteService - serviceId: `, serviceId);

        const existService = await Service.findById(serviceId);
        if (! existService) {
            console.log('ERROR servicesController.deleteService existService');
            return res.status(400).json({ errorMessage: `Service not exist!` });
        }
        const service = await existService.remove();

        console.log(`serviceController - deleteService - removeService: `, service);
        
        res.status(200).json({
            service,
            successMessage: `Service removed successfully!`,
        });

        // await ServiceCategory.updateMany({ _id: service.category }, { $pull: { products: product._id } });

        // return res.redirect(product);

        /*
        // console.log(`servicesController - id: `, serviceCategoryId);
        const existService = await Service.findOne({ name });
        if (existService) {
            console.log('ERROR servicesController.createService');
            return res.status(400).json({ errorMessage: `Service - ${name} already exists!` });
        }

        //! CREATE - Serivce
        var service = new Service();
        service.name = name;
        service.price = price;
        service.description = description;
        service.category = category;
        service = await service.save();

        //! UPDATE - Service Category
        await ServiceCategory.findByIdAndUpdate(category, { $push: { services: service._id } }, { new: true });

        res.status(200).json({
            service,
            successMessage: `Service ${service.name} created successfully!`,
        });

        // const newServiceCategory = ServiceCategory.create(serviceCategory);
        console.log('SUCCESS servicesController.createService: ', service);
    */
    } catch (error) {
        res.status(500).json({
            errorMessage: 'Please try again next time',
        });
        console.log('ERROR servicesController.createService: ', error);
    }
};

module.exports = {
    getAllServiceCategories,
    getServicesWithCategory,
    createServiceCategory,
    createService,
    deleteService,
};
