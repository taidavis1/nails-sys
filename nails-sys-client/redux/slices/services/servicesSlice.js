import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { PlatformBaseUrl } from '../../../utils';

const initialState = {
    isLoading: false,
    error: false,
    serviceCategories: [],
};

function prepend(value, array) {
    var newArray = array.slice();
    newArray.unshift(value);
    return newArray;
}

// ! GET ALL ServiceCategory
export const getServiceCategoriesAsync = createAsyncThunk('services/getServiceCategoriesAsync', async (thunkAPI) => {
    const response = await fetch('http://127.0.0.1:5000/get_data').then( (data) => data.json() )
    return response;
});

//! CREATE ServiceCategory
export const addServiceCategoryAsync = createAsyncThunk('services/addServiceCategoryAsync', async (payload) => {
    // console.log(`servicesSlice - addServiceCategoryAsync: `, payload);
    const response = await fetch('http://127.0.0.1:5000/Add_Category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: payload.name, color: payload.color })
    })

    if (response.ok) {

        const { serviceCategory } = await response.json();

        return serviceCategory;
    }
});

//! CREATE SubCategory

export const addSubCategoryAsync = createAsyncThunk('services/addSubCategoryAsync', async (payload, { getState }) => {
    //! addSubCategoryAsync({}) -> { name}
    const { serviceCategoryId } = getState().modal.modalProps; //! OK
    console.log(`modalsprops serviceCategoryId `, serviceCategoryId);
    const response = await fetch(PlatformBaseUrl.baseApiUrl(`/api/services/${serviceCategoryId}`), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        //! payload : {name, color}
        body: JSON.stringify({ name: payload.name }),
    });

    if (response.ok) {
        const { subCategory } = await response.json();
        // const { category } = data;
        return subCategory; //! return Action 1 Array
    }
});

//! CREATE Service
export const addServiceAsync = createAsyncThunk('services/addServiceAsync', async (payload, { getState }) => {
    // const { serviceCategoryId, subCategoryId } = getState().modal.modalProps; //! OK
    const { category, subCategory } = payload;

    // console.log(`servicesSlice - serviceCategoryId : `, serviceCategoryId);
    // console.log(`servicesSlice - payload: `, payload);

    const response = await fetch(PlatformBaseUrl.baseApiUrl(`/api/services/${category}/${subCategory}`), {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json',
        // },
        headers: {
            'Content-Type': 'multipart/form-data',
        },

        body: JSON.stringify(payload),
    });

    if (response.ok) {
        const { service } = await response.json();
        return { ...service, category: category };
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

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getServiceCategoriesAsync.pending, (state, action) => {
            console.log('getServiceCategoriesAsync.pending');
        });
        builder.addCase(getServiceCategoriesAsync.fulfilled, (state, action) => {
            console.log('getServiceCategoriesAsync.fulfilled');
            state.serviceCategories = action.payload;

        });
        // builder.addCase(getSubCategoriesByCatIdAsync.pending, (state, action) => {
        //     console.log('getSubCategoriesByCatIdAsync.pending');
        // });
        // builder.addCase(getSubCategoriesByCatIdAsync.fulfilled, (state, action) => {
        //     console.log('getSubCategoriesByCatIdAsync.fulfilled');
        //     state.subCategories = action.payload.subCategories;
        //     // state.services = [];
        // });
        // builder.addCase(getServicesBySubIdAsync.pending, (state, action) => {
        //     console.log('getServicesBySubIdAsync.pending');
        // });
        // builder.addCase(getServicesBySubIdAsync.fulfilled, (state, action) => {
        //     console.log('getServicesBySubIdAsync.fulfilled');
        //     state.services = action.payload.services;
        // });
        // builder.addCase(addServiceCategoryAsync.fulfilled, (state, action) => {
        //     console.log('addServiceCategoryAsync fulfilled');
        //     let categories = state.serviceCategories;
        //     let updatedCategories = prepend(action.payload, categories);
        //     state.serviceCategories = updatedCategories;
        // });
        // builder.addCase(addSubCategoryAsync.pending, (state, action) => {
        //     console.log('addSubCategoryAsync pending');
        // });
        // builder.addCase(addSubCategoryAsync.fulfilled, (state, action) => {
        //     console.log('addSubCategoryAsync fulfilled');
        //     let categories = state.serviceCategories;
        //     let catIndex = categories.findIndex((item) => item._id === action.payload.category);
        //     let updatedSubs = prepend(action.payload, categories[catIndex].subCategories);
        //     if (catIndex != -1) state.serviceCategories[catIndex].subCategories = updatedSubs;
        // });
        // builder.addCase(addServiceAsync.pending, (state, action) => {
        //     console.log('addServiceAsync pending');
        // });
        // builder.addCase(addServiceAsync.fulfilled, (state, action) => {
        //     console.log('addServiceAsync fulfilled');
        //     let categories = state.serviceCategories;
        //     let catIndex = categories.findIndex((item) => item._id === action.payload.category);
        //     let subIndex = categories[catIndex].subCategories.findIndex((item) => item._id === action.payload.subCategory);
        //     let updatedServices = prepend(action.payload, categories[catIndex].subCategories[subIndex].services);
        //     if (catIndex != -1 && subIndex != -1) state.serviceCategories[catIndex].subCategories[subIndex].services = updatedServices;
        // });
        // builder.addCase(removeServiceAsync.pending, (state, action) => {
        //     console.log('removeServiceAsync pending');
        // });
        // builder.addCase(removeServiceAsync.fulfilled, (state, action) => {
        //     console.log('removeServiceAsync fulfilled');
        //     // console.log(`action.payload: `, action.payload); //! return a Object of Service
        //     let categories = state.serviceCategories;
        //     let catIndex = categories.findIndex((item) => item._id === action.payload.category);
        //     let updatedServices = categories[catIndex].services.filter((service) => service._id !== action.payload._id);
        //     if (catIndex != -1) state.serviceCategories[catIndex].services = updatedServices;
        // });
        // builder.addCase(updateServiceAsync.pending, (state, action) => {
        //     console.log('updateServiceAsync pending');
        // });
        // builder.addCase(updateServiceAsync.fulfilled, (state, action) => {
        //     console.log('updateServiceAsync fulfilled');
        //     let categories = state.serviceCategories;
        //     let catIndex = categories.findIndex((item) => item._id === action.payload.category);
        //     let updatedServices = categories[catIndex].services.map((service) => (service._id === action.payload._id ? action.payload : service));
        //     if (catIndex != -1) state.serviceCategories[catIndex].services = updatedServices;
        // });
    },
});

//! exp Actions
export const {} = servicesSlice.actions;
//! exp Reducer
export default servicesSlice.reducer;
