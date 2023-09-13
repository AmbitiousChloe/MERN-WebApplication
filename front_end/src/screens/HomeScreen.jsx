import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Products from '../components/Products';
import { useGetProductsQuery } from '../slices/productApiSlice';
import Loader from '../components/loader';
import Message from '../components/Message';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <>
        { isLoading?(
          <Loader />
        ): error ? (
          <Message variant={'danger'}>{error?.data?.message || error.error}</Message>
        ): (<>
        <h1>Lastest Products</h1>
        <Row>
            {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}> 
                    <Products product={product} />
                </Col>
            ))}
        </Row>
        </>)}
    </>
  );
};

export default HomeScreen