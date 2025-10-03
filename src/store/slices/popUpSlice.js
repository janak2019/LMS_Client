import {createSlice} from '@reduxjs/toolkit'


const popupSlice = createSlice({
    name:"popup",
    initialState:{
        settingPopup: false,
        addBookPopup:false,
        readBookPopup:false,
        recordBookPopup:false,
        returnBookPopup:false,
        addNewAdminPopup:false,
        addUserPopup:false,
        
    },
    reducers:{
        toggleSettingPopup:(state)=>{
            state.settingPopup = !state.settingPopup;
        },
        toggleAddBookPopup:(state)=>{
            state.addBookPopup = !state.addBookPopup;
        },
        toggleReadBookPopup:(state)=>{
            state.readBookPopup = !state.readBookPopup;
        },
        toggleRecordBookPopup:(state)=>{
            state.recordBookPopup = !state.recordBookPopup;
        },
        toggleReturnBookPopup:(state)=>{
            state.returnBookPopup = !state.returnBookPopup;
        },
        toggleAddNewAdminPopup:(state)=>{
            state.addNewAdminPopup = !state.addNewAdminPopup;
        },
        toggleAddUserPopup:(state)=>{
            state.addUserPopup = !state.addUserPopup;
        },
        closeAllPopup(state){
        state.settingPopup = false
        state.addBookPopup = false
        state.addUserPopup = false
        state.readBookPopup = false
        state.recordBookPopup = false
        state.returnBookPopup = false
        state.addNewAdminPopup = false
        }
        
    }
})

export const {
    closeAllPopup,
    toggleAddBookPopup,
    toggleAddNewAdminPopup,
    toggleReadBookPopup,
    toggleRecordBookPopup,
    toggleReturnBookPopup,
    toggleSettingPopup,
    toggleAddUserPopup,
    
} = popupSlice.actions;

export default popupSlice.reducer;