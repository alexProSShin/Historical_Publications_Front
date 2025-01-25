import { RouterProvider } from "react-router-dom";
import { appRouter } from "./router";
import { Provider } from "react-redux";
import { store } from "./core/store/store";
import { CheckMe } from "./components/CheckMe";

function App() {
  return (
    <Provider store={store}>
      <CheckMe />
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
