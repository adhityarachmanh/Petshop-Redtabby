const initState = {
  loading: false,
  alert: {
    status: false
  },
  progress: {
    status: false
  },
  marker: {
    status: false
  }
};

export const sharedReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOADING_START":
      return {
        loading: true
      };
    case "LOADING_END":
      return {
        loading: false
      };
    case "ALERT_START":
      return {
        alert: {
          status: true,
          text: action.text,
          color: action.color
        }
      };
    case "ALERT_END":
      return {
        alert: {
          status: false
        }
      };
    case "PROGRESS_START":
      return {
        progress: {
          status: true,
          data: action.progress
        }
      };
    case "PROGRESS_END":
      return {
        progress: {
          status: false
        }
      };
    case "MARKER_START":
      return {
        marker: {
          status: true,
          id: action.id
        }
      };
    case "MARKER_END":
      return {
        marker: {
          status: false
        }
      };
    default:
      return state;
  }
};
