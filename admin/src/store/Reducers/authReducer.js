const initState = {
  authError: null
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_BERHASIL":
      return {
        authError: null
      };
    case "LOGIN_GAGAL":
      return {
        authError: action.err
      };
    case "BUKAN_ADMIN":
      return {
        authError: action.err
      };
    case "LOGOUT_BERHASIL":
      return state;
    default:
      return state;
  }
};
