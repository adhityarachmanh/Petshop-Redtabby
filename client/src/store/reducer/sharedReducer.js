const initState = {
  progress: false,
  progressVal: 0
};

export const sharedReducer = (state = initState, action) => {
  switch (action.type) {
    case "PROGRESS_LOAD":
      return {
        progressVal: action.progressVal,
        progress: true
      };
    case "PROFRESS_ERROR":
      return {
        progress: false
      };
    case "UPLOAD_FINISH":
      return {
        progress: false
      };
    default:
      return state;
  }
};
