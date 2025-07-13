import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FavoritesPage from "./pages/FavoritesPage";
import SearchResults from "./pages/SearchResults";
import ChatBot from "./components/ChatBot";
import { useAppContext } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { cartFavorite, setCartFavorite } = useAppContext();

  const handleToggleFavorite = (id) => {
    if (cartFavorite.includes(id)) {
      setCartFavorite(cartFavorite.filter((f) => f !== id));
    } else {
      setCartFavorite([...cartFavorite, id]);
    }
  };

  const handleViewDetail = (product) => {

  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>

      <ChatBot
        onViewDetail={handleViewDetail}
        onToggleFavorite={handleToggleFavorite}
        favorites={cartFavorite}
      />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
