const initState = {
  authError: null
};
export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_BERHASIL":
      console.log("login berhasil");
      return {
        ...state,
        authError: null
      };
    case "LOGIN_GAGAL":
      console.log("login gagal");
      return {
        authError: action.err.message
      };
    case "DAFTAR_BERHASIL":
      console.log("daftar berhasil");
      return {
        ...state,
        authError: null
      };

    case "DAFTAR_GAGAL":
      console.log("daftar gagal");
      return {
        ...state,
        authError: action.err.message
      };
    case "LOGOUT_BERHASIL":
      console.log("daftar gagal");
      return {
        ...state,
        authError: null
      };
    default:
      return state;
  }
};
