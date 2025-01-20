import { RouterProvider } from "react-router-dom";
import { appRouter } from "./router";
import { Provider } from "react-redux";
import { store } from "./core/store/store";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />;
    </Provider>
  );
}

export default App;
