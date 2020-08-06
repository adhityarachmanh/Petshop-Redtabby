const initState = {
  authError: null
};
export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_BERHASIL":
      
      return {
        ...state,
        authError: null
      };
    case "LOGIN_GAGAL":

      return {
        authError: action.err.message
      };
    case "DAFTAR_BERHASIL":
      
      return {
        ...state,
        authError: null
      };

    case "DAFTAR_GAGAL":
    
      return {
        ...state,
        authError: action.err.message
      };
    case "LOGOUT_BERHASIL":
    
      return {
        ...state,
        authError: null
      };
    default:
      return state;
  }
};
