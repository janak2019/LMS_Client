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
        
    },
    reducers:{
        toogleSettingPopup:(state)=>{
            state.settingPopup = !state.settingPopup;
        },
        toogleAddBookPopup:(state)=>{
            state.addBookPopup = !state.addBookPopup;
        },
        toogleReadBookPopup:(state)=>{
            state.readBookPopup = !state.readBookPopup;
        },
        toogleRecordBookPopup:(state)=>{
            state.recordBookPopup = !state.recordBookPopup;
        },
        toogleReturnBookPopup:(state)=>{
            state.returnBookPopup = !state.returnBookPopup;
        },
        toogleAddNewAdminPopup:(state)=>{
            state.addNewAdminPopup = !state.addNewAdminPopup;
        },
        closeAllPopup(state){
        state.settingPopup = false
        state.addBookPopup = false
        state.readBookPopup = false
        state.recordBookPopup = false
        state.returnBookPopup = false
        state.addNewAdminPopup = false
        }
        
    }
})

export const {
    closeAllPopup,
    toogleAddBookPopup,
    toogleAddNewAdminPopup,
    toogleReadBookPopup,
    toogleRecordBookPopup,
    toogleReturnBookPopup,
    toogleSettingPopup,
    
} = popupSlice.actions;

export default popupSlice.reducer;