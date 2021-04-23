import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';
import { Spinner } from 'react-bootstrap';


const ProductDetail = () => {
    const {productKey} = useParams()
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState({});
    document.title = 'Product Details'
    useEffect(() => {

        fetch('https://stormy-coast-46023.herokuapp.com/product/'+ productKey)
        .then(res => res.json())
        .then(data => {
            setProduct(data)
            setLoading(false)
        })
    },[productKey])


    return (
        <div>
            <h1>Your Product Details.</h1>
            {
                loading ? <Spinner animation="border" />: <Product showAddToCart={false} product={product}></Product>
            } 
        </div>
    );
};

export default ProductDetail;