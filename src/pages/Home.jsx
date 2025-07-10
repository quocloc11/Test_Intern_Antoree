import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Header from '../components/Header'
import ProductList from '../components/ProductList';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  InputBase,
  IconButton,
  Paper,
  Divider, MenuItem, Menu,
  Badge
} from '@mui/material';
import ViewHistory from '../components/ViewHistory';
const Home = () => {
  return (
    <>
      <Header />
      <Container>
        <Banner />
        <ProductList />
        <ViewHistory />
      </Container>
      <Footer />
    </>
  );
};
export default Home