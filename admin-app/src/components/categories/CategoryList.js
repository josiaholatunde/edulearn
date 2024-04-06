import React, { Fragment, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getCategories } from '../../redux/actions/categoryActions';
import { getLeaderBoardUsers } from '../../redux/actions/leaderboardActions';
import CategoryDataTable from './CategoryDataTable';

const mapCategories = (categories, currentPage, pageSize) => {
    const pageStart = currentPage * pageSize;
    return categories?.map((category, index) => ({
        key: index,
        position: pageStart + (index + 1),
        name: category.name
    }));
};

const CategoryList = ({ categories, loading, total }) => {
    const [name, setName] = useState('');
    const [page, setCurrentPage] = useState(1);
    const [size, setSize] = useState(10);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories({ page, size, name }));
    }, [page]);

    const filterCategories = () => {
        dispatch(getCategories({ page: 1, size, name }));
    };

    return (
        <Fragment>
            <div className='row my-3'>
                <div className='col-lg-5 d-flex'>
                    <h3 className='mb-0' style={{ fontSize: '24px'}}>Categories</h3>
                </div>
                <div className='col-lg-7 d-flex justify-content-end align-items-center'>
                    <button className="btn btn-cool" type="button" onClick={() => setShowAddCategoryModal(true)} >
                        <i class="bi bi-plus-lg mr-1"></i>
                        Create Category
                    </button>
                </div>
            </div>
            <CategoryDataTable
                categories={categories} 
                currentPage={page}
                setCurrentPage={(pageNumber) => setCurrentPage(pageNumber)}
                loading={loading}
                totalItems={total}
            />
        </Fragment>
    );
};

const mapStateToProps = ({ categories: { categories, total, currentPage, pageSize }, loading }) => ({
    categories: mapCategories(categories, currentPage, pageSize),
    total,
    loading
});

export default connect(mapStateToProps, { getLeaderBoardUsers })(CategoryList);
