import React, {useEffect} from "react";
// core components
import {connect, useDispatch} from "react-redux";
import FormProduct from "./form/FormProduct";
import {fetchAllCategoriesAction} from "../../../redux/CategoryDucks";

const CreateProduct = ({fetching, all_categories}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllCategoriesAction());
    }, []);

    return (
        <FormProduct dispatch={dispatch} fetching={fetching} all_categories={all_categories}/>
    );
};

function mapState(state) {
    return {
        fetching: state.products.fetching,
        all_categories: state.categories.data,
    }
}

export default connect(mapState)(CreateProduct);

