export default (state = [], action) => {
  let { type, payload } = action;
  switch (type) {
    case "WEATHER_SET":
      return payload;
    case "WEATHER_CREATE":
      return [payload, ...state];
    case "WEATHER_UPDATE":
      return payload;
    // return state.map(item => item._id === payload._id ? payload : item);
    case "WEATHER_DELETE":
      return state.filter(item => item._id !== payload._id);
    default:
      return state;
  }
};
