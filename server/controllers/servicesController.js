//! imp Models
const ServiceCategory = require('../models/ServiceCategory');
const Service = require('../models/Service');
const SubCategory = require('../models/SubCategory');

//! GET ServiceCategory (GET)
const getAllServiceCategories = async (req, res, next) => {
    try {
        let serviceCategories = await ServiceCategory.find({}).populate({
            path: 'subCategories',
            model: 'SubCategory',
            populate: { path: 'services', model: 'Service' },
        });
        //! response
        res.status(200).json({ serviceCategories });
    } catch (error) {
        console.log('service getAll() error: ', error);
        res.status(500).json({
            errorMessage: 'Please try again next time',
        });
    }
};

const getSubCategoriesByCatId = async (req, res, next) => {
    const { serviceCategoryId } = req.params;
    console.log(`servicesController - getSubCategoriesByCatId: `, serviceCategoryId);
    try {
        let subCategories;
        if (serviceCategoryId === '0') {
            subCategories = await SubCategory.find({});
        } else {
            let servicesCategory = await ServiceCategory.findOne({ _id: serviceCategoryId }).populate({
                path: 'subCategories',
                model: 'SubCategory',
            });
            subCategories = servicesCategory.subCategories;
        }
        res.status(200).json({ subCategories }); //! return -> Action payload
        console.log('SUCCESS servicesController - getSubCategoriesByCatId: ', subCategories);
    } catch (error) {
        console.log('ERROR servicesController - getSubCategoriesByCatId: ', error);
        res.status(500).json({
            errorMessage: 'Please try again next time',
        });
    }
};

const getServicesBySubId = async (req, res, next) => {
    const { serviceCategoryId, subCategoryId } = req.params;
    console.log(`servicesController.getServicesBySubId - serviceCategoryId: `, serviceCategoryId);
    console.log(`servicesController.getServicesBySubId - subCategoryId: `, subCategoryId);
    try {
        //! if Cate !==0 , SubCat === 0 => All Service of Cat
        //! if Cate !==0, SubCat !==0 Có chọn lọc
        let services = [];
        if (serviceCategoryId === '0') {
            // let serviceCategories = await ServiceCategory.findOne({ _id: subCategoryId }).populate({ path: 'services', model: 'Service' });
            services = await Service.find({});
            if (subCategoryId !== '0') {
                let subCategories = await SubCategory.findOne({ _id: subCategoryId }).populate({ path: 'services', model: 'Service' });
                services = subCategories.services;
            }
        } else {
            //! serviceCategoryId !==0
            if (subCategoryId === '0') {
                let servicesCategory = await ServiceCategory.findOne({ _id: serviceCategoryId }).populate({
                    path: 'subCategories',
                    populate: { path: 'services' },
                });
                let tester = servicesCategory.subCategories.forEach((s) => {
                    services.push(...s.services);
                });
                console.log(`servicesCategory: `, services);
                //! sum services of sub cats
                // services
            } else {
                let subCategories = await SubCategory.findOne({ _id: subCategoryId }).populate({ path: 'services', model: 'Service' });
                services = subCategories.services;
            }
        }
        console.log(services);
        res.status(200).json({ services }); //! return -> Action payload
    } catch (error) {
        console.log('ERROR servicesController.getServicesBySubId: ', error);
        res.status(500).json({
            errorMessage: 'Please try again next time',
        });
    }
};

//! CREATE ServiceCategory (POST)
const createServiceCategory = async (req, res) => {
    try {
        const { name, color } = req.body;

        let existServiceCategory = await ServiceCategory.findOne({ name });
        if (existServiceCategory) {
            return res.status(400).json({ errorMessage: `Category: ${name} already exists!` });
        }

        let serviceCategory = new ServiceCategory();
        serviceCategory.name = name;
        serviceCategory.color = color;
        serviceCategory = await serviceCategory.save();

        // const serviceCategory = ServiceCategory.create(serviceCategory);
        res.status(200).json({
            serviceCategory,
            successMessage: `Category ${serviceCategory.name} is created successfully!`,
        });

        console.log('SUCCESS servicesController.createServiceCategory: ', serviceCategory);
    } catch (error) {
        res.status(500).json({
            errorMessage: 'Please try again next time',
        });
        console.log('ERROR servicesController.createServiceCategory: ', error);
    }
};
//! CREATE SubCategory (POST)
// router.post('/:serviceCategoryId/:subCategoryId', servicesController.createService);
const createSubCategory = async (req, res) => {
    try {
        const { serviceCategoryId } = req.params;
        const { name } = req.body;

        let existSubCategory = await SubCategory.findOne({ name });
        if (existSubCategory) {
            return res.status(400).json({ errorMessage: `SubCategory: ${name} already exists!` });
        }

        let subCategory = new SubCategory();
        subCategory.name = name;
        // subCategory.color = color;
        //! update relationship
        subCategory.category = serviceCategoryId;
        subCategory = await subCategory.save();
        //! update
        await ServiceCategory.findByIdAndUpdate(serviceCategoryId, { $push: { subCategories: subCategory._id } }, { new: true });

        res.status(200).json({
            subCategory,
            successMessage: `SubCategory ${subCategory.name} is created successfully!`,
        });

        console.log('SUCCESS servicesController.createSubCategory: ', subCategory);
    } catch (error) {
        res.status(500).json({
            errorMessage: 'Please try again next time',
        });
        console.log('ERROR servicesController.createSubCategory: ', error);
    }
};

//! CREATE Service (POST)
// name: '', // displayName: '',// price: 0,// commission: 0,// color: '',// photo: '',// subCategory: '',

const createService = async (req, res, next) => {
    try {
        const { name, displayName, price, commission, color, photo } = req.body;
        const { serviceCategoryId, subCategoryId } = req.params;

        let existService = await Service.findOne({ name });
        if (existService) {
            console.log('ERROR servicesController.createService');
            return res.status(400).json({ errorMessage: `Service - ${name} already exists!` });
        }

        let service = new Service();
        service.name = name;
        service.displayName = displayName;
        service.price = price;
        service.commission = commission;
        service.color = color;
        service.photo = photo;

        //! Update Relationship
        service.subCategory = subCategoryId;
        service = await service.save();
        //! Update for SubCategory
        await SubCategory.findByIdAndUpdate(subCategoryId, { $push: { services: service._id } }, { new: true });

        res.status(200).json({
            service,
            successMessage: `Service ${service.name} is created successfully!`,
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

//! DELETE Serivce (DELELTE)
const deleteService = async (req, res, next) => {
    try {
        const { serviceCategoryId, serviceId } = req.params;
        console.log(`servicesController.deleteService - serviceCategoryId: `, serviceCategoryId);
        console.log(`servicesController.deleteService - serviceId: `, serviceId);

        let existService = await Service.findById(serviceId);
        if (!existService) {
            console.log('ERROR servicesController.deleteService: Service not exist');
            return res.status(400).json({ errorMessage: `Service exist!` });
        }

        // await ServiceCategory.updateMany({ _id: service.category }, { $pull: { products: product._id } });
        //! Update delete id Category

        let service = await existService.remove();

        console.log(`SUCCESS servicesController.deleteService - removalService: `, service);

        res.status(200).json({
            service,
            successMessage: `Service removed successfully!`,
        });
    } catch (error) {
        res.status(500).json({
            errorMessage: 'Please try again next time',
        });
        console.log('ERROR servicesController.deleteService: ', error);
    }
};

//! EDIT Service (PUT)
const updateService = async (req, res, next) => {
    try {
        const { name, price, description } = req.body;
        const { serviceCategoryId, serviceId } = req.params;

        console.log(`servicesController.updateService - serviceCategoryId: `, serviceCategoryId);
        console.log(`servicesController.updateService - serviceId: `, serviceId);

        let existService = await Service.findById(serviceId);
        if (!existService) {
            console.log('ERROR servicesController.updateService: Service exist');
            return res.status(400).json({ errorMessage: `Service not exist!` });
        }

        let updatedService = await Service.findByIdAndUpdate(serviceId, req.body, { new: true });
        // { sort: { points: 1 }, upsert: false, returnNewDocument: true }
        //! The `upsert` = true option creates the object if it doesn't exist. defaults to false.
        //! If `new`: false, findOneAndUpdate()` will return the document as it was _before_ it was updated. (false -> old, true -> new)

        console.log(`SUCCESS servicesController.updateService: `, updatedService);
        res.status(200).json({
            updatedService,
            successMessage: `Service updated successfully!`,
        });

        // console.log(`SUCCESS servicesController.deleteService - removeService: `, service);
    } catch (error) {
        res.status(500).json({
            errorMessage: 'Please try again next time',
        });
        console.log('ERROR servicesController.updateService: ', error);
    }
};

module.exports = {
    getAllServiceCategories,
    getSubCategoriesByCatId,
    getServicesBySubId,
    createServiceCategory,
    createSubCategory,
    createService,
    deleteService,
    updateService,
};
