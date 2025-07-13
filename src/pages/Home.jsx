import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import ViewHistory from '../components/ViewHistory';
import ChatBot from '../components/ChatBot';
import { useAppContext } from "../context/AppContext";
import { Container } from '@mui/material';
import { useState } from 'react'
const Home = () => {
  const { cartFavorite, setCartFavorite } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
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
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Container>
        <Banner />
        <ProductList searchTerm={searchTerm} />
        <ViewHistory />
      </Container>
      <Footer />

      <ChatBot
        onViewDetail={handleViewDetail}
        onToggleFavorite={handleToggleFavorite}
        favorites={cartFavorite}
      />
    </>
  );
};

export default Home;
