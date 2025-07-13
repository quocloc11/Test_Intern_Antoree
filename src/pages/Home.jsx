import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import ViewHistory from '../components/ViewHistory';
import { Container } from '@mui/material';
import { useState } from 'react';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Container>
        <Banner />
        <ProductList searchTerm={searchTerm} />
        <ViewHistory />
      </Container>
      <Footer />
    </>
  );
};

export default Home;
