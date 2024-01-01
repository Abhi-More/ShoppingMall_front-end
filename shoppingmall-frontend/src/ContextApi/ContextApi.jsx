import AppContext from "./CreateContextApi";

const ContextApi = (props) => {
  const data = "TNS Project";

  return (
    <AppContext.Provider value={data}>{props.children}</AppContext.Provider>
  );
};
export default ContextApi;
