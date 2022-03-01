import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    modalId: null, //! id-Modal
    modalProps: {},
};
// |-modalProps
// |   |- serviceCategoryId

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModal(state, action) {
            // state.modalId = action.payload.modalId ? action.payload.modalId : state.modalId;
            // state.modalProps = action.payload.modalProps ? action.payload.modalProps : state.modalProps;
            // state.modalProps = action.payload?.modalProps;
            // console.log(`action.payload.modalId: `, action.payload.modalId);

            return {
                ...state,
                modalId: action.payload.modalId,
                modalProps: { ...state.modalProps, ...action.payload.modalProps },
            };
        },
        hideModal(state, action) {
            // return initialState;
            state.modalId = initialState.modalId;
        },
        setModalProps(state, action) {
            state.modalProps = action.payload;
        },
    },
});

//! exp Actions
export const { showModal, hideModal, setModalProps } = modalSlice.actions;

//! exp Reducer
export default modalSlice.reducer;
