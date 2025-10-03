import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { toast } from "react-toastify"
const apiBase = "https://lms-server-73ra.onrender.com"
const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        loading: false,
    },
    reducers: {
        fetchAllUsersRequest(state) {
            state.loading = true;
        },
        fetchAllUsersSuccess(state, action) {
            state.loading = false,
                state.users = action.payload;

        },
        fetchAllUsersFailed(state) {
            state.loading = false;
        },
        addNewAdminRequest(state) {
            state.loading = true;
        },
        addNewAdminSuccess(state) {
            state.loading = false;
        },
        addNewAdminFailed(state) {
            state.loading = false;
        },
        addUserRequest(state) {
            state.loading = true;
        },
        addUserSuccess(state) {
            state.loading = false;
        },
        addUserFailed(state) {
            state.loading = false;
        },
    }
})

export const fetchAllUsers = () => async (dispatch) => {
    dispatch(userSlice.actions.fetchAllUsersRequest());
    await axios.get(`${apiBase}/api/v1/user/all`, { withCredentials: true })
        .then(res => {
            dispatch(userSlice.actions.fetchAllUsersSuccess(res.data.users))
        }).catch((err) => {
            dispatch(userSlice.actions.fetchAllUsersFailed(err.response.data.message))
        })
};

export const addNewAdmin = (data) => async (dispatch) => {
    dispatch(userSlice.actions.addNewAdminRequest())
    await axios.post(`${apiBase}/api/v1/user/add/new-admin`, data, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }).then(res => {
        dispatch(userSlice.actions.addNewAdminSuccess());
        toast.success(res.data.message);

    })
        .catch((err) => {
            userSlice.actions.addNewAdminFailed();
            toast.error(err.response.data.message);
        })
};

// Add new user
export const addUser = (data) => async (dispatch) => {
    dispatch(userSlice.actions.addUserRequest());
    try {
        const res = await axios.post(`${apiBase}/api/v1/user/add/new-user`, data, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        dispatch(userSlice.actions.addUserSuccess());
        toast.success(res.data.message);
        dispatch(fetchAllUsers()); // refresh user list after adding
    } catch (err) {
        dispatch(userSlice.actions.addUserFailed());
        toast.error(err.response?.data?.message || "Failed to add user");
    }
};

export default userSlice.reducer;