export default (state = [], action) => {
  let { type, payload } = action;
  switch (type) {
    case "LOCATION_SET":
      return payload;
    case "LOCATION_CREATE":
      return [payload, ...state];
    case "LOCATION_UPDATE":
      return payload;
    // return state.map(item => item._id === payload._id ? payload : item);
    case "LOCATION_DELETE":
      return state.filter(item => item._id !== payload._id);
    default:
      return state;
  }
};
