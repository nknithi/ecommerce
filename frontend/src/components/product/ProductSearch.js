import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import Product from "../product/Product";
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import { useParams } from "react-router-dom";
import './ProductSearch.css'

const ProductSearch = () => {
    const dispatch = useDispatch();
    const { products, loading, error, productsCount, resPerPage } = useSelector(state => state.productsState);
    const [currentPage, setCurrentPage] = useState(1);
    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [category, setCategory] = useState(null);
    const [rating, setRating] = useState(0);
    const [priceChanged, setPriceChanged] = useState([1, 1000]);
    const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
    const [searchKeyword, setSearchKeyword] = useState(''); // State to hold search keyword

    const { keyword } = useParams();
    const categories = ['Dress', 'Skirt', 'Trouser'];

        // Function to set the current page number
    const setCurrentPageNo = (pageNo) => {
        setCurrentPage(pageNo);
    };

    useEffect(() => {
        setCurrentPage(1); // Reset currentPage to 1 when filters change
    }, [priceChanged, category, rating]);

    useEffect(() => {
        if (error) {
            return toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
        if (category) {
            // If category is selected, fetch products without applying keyword
            dispatch(getProducts(null, priceChanged, category, rating, currentPage, 3));
        } else {
            // Fetch products with keyword if available
            dispatch(getProducts(keyword, priceChanged, category, rating, currentPage, 3));
        }
    }, [error, dispatch, currentPage, keyword, priceChanged, category, rating]);

    

    const applyPriceFilter = () => {
        setPriceChanged([minPrice, maxPrice]);
    };

    const handleCategorySelect = (cat) => {
        
        setCategory(cat);
        setSelectedCategory(cat); // Set selected category state
        
    };

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={'Buy Best Products'} />
                    <h1 id="products_heading">Search Products</h1>
                    <section id="products" className="container mt-5">
                        <div className="row">
                            <div className="col-6 col-md-3 mb-3 mt-3">
                                {/* Price Filter */}
                                <div className="px-5">
                                    <h3 className="mb-3">Price Range</h3>
                                    <div className="d-flex">
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={minPrice}
                                            min="1"
                                            max="1000"
                                            onChange={(e) => setMinPrice(Number(e.target.value))}
                                        />
                                        <span className="mx-2">to</span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={maxPrice}
                                            min="1"
                                            max="1000"
                                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                                        />
                                    </div>

                                    {/* Note section */}
                                    <p className="text-primary p-2 mt-3" style={{ backgroundColor: '#eaf1f8' }}>
                                        Note: Please select a product category before applying price filter.
                                    </p>
                                    {/* Submit button */}
                                    <div className="mb-3 d-flex justify-content-center">
                                        <button className="btn bg-warning  mt-3 fw-bold text-black" onClick={applyPriceFilter}>Apply</button>
                                    </div>
                                </div>
                                <hr className="my-5" />
                                {/* Category Filter */}
                                <div className="mt-5">
                                    <h3 className="mb-3">Categories</h3>
                                    <ul className="pl-0">
                                        {categories.map(cat =>
                                            <li
                                                key={cat}
                                                className={`category-item ${selectedCategory === cat ? 'selected' : ''}`}
                                                onClick={() => handleCategorySelect(cat)}
                                            >
                                                {cat}
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                <hr className="my-5" />
                            </div>
                            <div className="col-6 col-md-9">
                                <div className="row">
                                    {products && products.map(product => (
                                        <Product col={4} key={product._id} product={product} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Pagination component */}
                    {productsCount > 0 && productsCount > resPerPage ?
                        <div className="d-flex justify-content-center mt-1 mb-4">
                            <Pagination
                                activePage={currentPage}
                                onChange={setCurrentPageNo}
                                totalItemsCount={productsCount}
                                itemsCountPerPage={resPerPage}
                                nextPageText={'Next'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass={'page-item'}
                                linkClass={'page-link'}
                            />
                        </div> : null}
                </Fragment>
            }
        </Fragment>
    );
};

export default ProductSearch;

