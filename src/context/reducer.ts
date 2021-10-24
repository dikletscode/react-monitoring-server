const Reducer = (
  state: any,
  { type, payload }: { type: string; payload: object | null }
) => {
  switch (type) {
    case "USER":
      return {
        ...state,
        isLogin: true,
        data: payload,
      };
    case "INVALID_USER":
      return {
        ...state,
        isLogin: false,
        data: null,
      };

    default:
      return state;
  }
};

export default Reducer;
