// reducers/UseReducer.js
export const initialState = JSON.parse(localStorage.getItem('user')) || null;

export const reducer = (state, action) => {
  switch (action.type) {
    case "USER":
      // Store user data in localStorage when setting user
      if (action.payload) {
        localStorage.setItem('user', JSON.stringify(action.payload));
      } else {
        // Clear on logout
        localStorage.removeItem('user');
      }
      return action.payload;
    default:
      return state;
  }
};