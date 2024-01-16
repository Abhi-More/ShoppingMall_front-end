import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContextApi from "./ContextApi/ContextApi.jsx";
<<<<<<< Updated upstream
import { CartProvider } from './ContextApi/Cart.jsx';
=======
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

>>>>>>> Stashed changes
ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextApi>
    <CartProvider>
      <App />
    </CartProvider>
  </ContextApi>
);
