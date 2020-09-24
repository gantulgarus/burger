import axios from "../../axios-orders";

export const loadOrders = () => {
  return function (dispatch, getState) {
    //Захиалгыг татаж эхэллээ гэдгийг мэдэгдэнэ.
    dispatch(loadOrdersStart());

    const token = getState().signupReducer.token;
    const userId = getState().signupReducer.userId;

    axios
      .get(`orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then((response) => {
        dispatch(loadOrdersSuccess(Object.entries(response.data).reverse()));
      })
      .catch((err) => {
        dispatch(loadOrdersError(err));
      });
  };
};

export const loadOrdersStart = () => {
  return {
    type: "LOAD_ORDERS_START",
  };
};

export const loadOrdersSuccess = (loadedOrders) => {
  return {
    type: "LOAD_ORDERS_SUCCESS",
    orders: loadedOrders,
  };
};

export const loadOrdersError = (error) => {
  return {
    type: "LOAD_ORDERS_ERROR",
    error,
  };
};

//Захиалгыг хадгалах хэсэг
export const saveOrder = (newOrder) => {
  return function (dispatch, getState) {
    //spinner ergeldene
    dispatch(saveOrderStart());

    const token = getState().signupReducer.token;

    //firebaseruu hadgalna
    axios
      .post(`/orders.json?auth=${token}`, newOrder)
      .then((response) => {
        dispatch(saveOrderSuccess());
      })
      .catch((error) => {
        dispatch(saveOrderError(error));
      });
  };
};

export const saveOrderStart = () => {
  return {
    type: "SAVE_ORDER_START",
  };
};

export const saveOrderSuccess = () => {
  return {
    type: "SAVE_ORDER_SUCCESS",
  };
};

export const saveOrderError = (error) => {
  return {
    type: "SAVE_ORDER_ERROR",
    errorMessage: error,
  };
};
