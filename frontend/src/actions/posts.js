import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  AUTH,
  LOGOUT,
  GOOGAUTH,
  GOOGCREATE,
} from '../constants/actionTypes';

import * as api from '../api/index';

export const getUser = (user) => async (dispatch) => {
  try {
    console.log(user.verified);
    if (user.verified == true) {
      console.log('YEA');

      const { data } = await api.getUser(user);
      //data.user.verified == true;
      console.log(data);
      dispatch({ type: 'AUTH', payload: data });
    } else {
      const { data } = await api.getUser(user);
      //console.log(error.message);
      dispatch({ type: 'AUTH', payload: data });
    }
  } catch (error) {
    dispatch({ type: 'AUTH', payload: error.response.data.message });
    console.log(error.response.data.message);
  }
};

/*
export const googgetUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.googgetUser(user);
    console.log(data);
    //console.log(error.message);
    dispatch({ type: "GOOGAUTH", payload: data });
  } catch (error) {
    dispatch({ type: "GOOGAUTH", payload: error.response.data.message });
    console.log(error.response.data.message);
  }
};
export const googcreateUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.googcreateUser(user);
    console.log(data);
    dispatch({ type: "GOOGCREATE", payload: data });
  } catch (error) {
    console.log(error.message); //ERROR HERE
  }
};
*/
export const createUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.createUser(user);
    console.log(data);
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error.message); //ERROR HERE
  }
};