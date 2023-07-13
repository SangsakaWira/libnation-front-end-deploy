import AppRouter from "./pages";
import {
  BrowserRouter,
} from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <AppRouter></AppRouter>
      </BrowserRouter>
    </>
  );
}

export default App;