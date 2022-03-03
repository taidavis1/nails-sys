import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PlatformBaseUrl } from '../../../utils';

//! GET ServiceCategory
export const getServiceCategoriesAsync = createAsyncThunk('services/getServiceCategoriesAsync', async () => {
    const response = await fetch(PlatformBaseUrl.baseApiUrl('/api/services'));
    if (response.ok) {
        // const {categories} = await response.json();
        // return categories; // payload Action
        const { serviceCategories } = await response.json();
        return serviceCategories; // payload Action
    }
});

//! CREATE ServiceCategory
export const addServiceCategoryAsync = createAsyncThunk('services/addServiceCategoryAsync', async (payload) => {
    // console.log(`servicesSlice - addServiceCategoryAsync: `, payload);
    const response = await fetch(PlatformBaseUrl.baseApiUrl('/api/services'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: payload.name }),
    });

    if (response.ok) {
        const { serviceCategory } = await response.json();
        // const { category } = data;
        return serviceCategory; //! return Action 1 Array
    }
});

//! CREATE Service
export const addServiceAsync = createAsyncThunk('services/addServiceAsync', async (payload, { getState }) => {
    const { serviceCategoryId } = getState().modal.modalProps; //! OK

    // console.log(`servicesSlice - serviceCategoryId : `, serviceCategoryId);
    // console.log(`servicesSlice - payload: `, payload);

    const response = await fetch(PlatformBaseUrl.baseApiUrl(`/api/services/${serviceCategoryId}`), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: payload.name, price: payload.price, description: payload.description }),
    });

    if (response.ok) {
        const { service } = await response.json();
        return service;
    }
});

//! DELETE Service
export const removeServiceAsync = createAsyncThunk('services/removeServiceAsync', async (payload, { getState }) => {
    const { serviceCategoryId, serviceId } = getState().modal.modalProps;

    const response = await fetch(PlatformBaseUrl.baseApiUrl(`/api/services/${serviceCategoryId}/${serviceId}`), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ serviceId }),
    });

    if (response.ok) {
        const { service } = await response.json();
        return service;
    }
});

//! UPDATE Service
export const updateServiceAsync = createAsyncThunk('services/updateServiceAsync', async (payload, { getState }) => {
    const { serviceCategoryId, serviceId } = getState().modal.modalProps;
    const { name, price, description } = payload;

    const response = await fetch(PlatformBaseUrl.baseApiUrl(`/api/services/${serviceCategoryId}/${serviceId}`), {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price, description }),
    });

    if (response.ok) {
        const { updatedService } = await response.json();
        return updatedService; //! return a Object
    }
});

const initialState = {
    isLoading: false,
    error: false,
    serviceCategories: [],
    // services: [],
};

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getServiceCategoriesAsync.pending, (state, action) => {
            console.log('getServiceCategoriesAsync pending');
        });
        builder.addCase(getServiceCategoriesAsync.fulfilled, (state, action) => {
            console.log('getServiceCategoriesAsync fulfilled');
            // console.log(`action.payload: `, action.payload); //! return Array of serviceCategory
            state.serviceCategories = action.payload;
        });
        builder.addCase(addServiceCategoryAsync.fulfilled, (state, action) => {
            console.log('addServiceCategoryAsync fulfilled');
            // console.log(`action.payload: `, action.payload); //! return object
            state.serviceCategories.push(action.payload);
        });
        builder.addCase(addServiceAsync.pending, (state, action) => {
            console.log('addServiceAsync pending');
        });
        builder.addCase(addServiceAsync.fulfilled, (state, action) => {
            console.log('addServiceAsync fulfilled');
            // console.log(`action.payload: `, action.payload); //! return a Object of Service
            let categories = [...state.serviceCategories];
            let catIndex = categories.findIndex((item) => item._id === action.payload.category);
            if (catIndex != -1) categories[catIndex].services.push(action.payload);
            state.serviceCategories = categories;
        });
        builder.addCase(removeServiceAsync.pending, (state, action) => {
            console.log('removeServiceAsync pending');
        });
        builder.addCase(removeServiceAsync.fulfilled, (state, action) => {
            console.log('removeServiceAsync fulfilled');
            // console.log(`action.payload: `, action.payload); //! return a Object of Service
            let categories = state.serviceCategories;
            let catIndex = categories.findIndex((item) => item._id === action.payload.category);
            let updatedServices = categories[catIndex].services.filter((service) => service._id !== action.payload._id);
            if (catIndex != -1) state.serviceCategories[catIndex].services = updatedServices;
        });
        builder.addCase(updateServiceAsync.pending, (state, action) => {
            console.log('updateServiceAsync pending');
        });
        builder.addCase(updateServiceAsync.fulfilled, (state, action) => {
            console.log('updateServiceAsync fulfilled');
            let categories = state.serviceCategories;
            let catIndex = categories.findIndex((item) => item._id === action.payload.category);
            let updatedServices = categories[catIndex].services.map((service) => (service._id === action.payload._id ? action.payload : service));
            if (catIndex != -1) state.serviceCategories[catIndex].services = updatedServices;
        });
    },
});

//! exp Actions
export const {} = servicesSlice.actions;
//! exp Reducer
export default servicesSlice.reducer;
