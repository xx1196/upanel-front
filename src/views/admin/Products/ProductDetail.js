import React, {useEffect} from "react";
import {useParams, withRouter} from "react-router-dom";
// @material-ui/core components
// core components
import {connect, useDispatch} from "react-redux";
import {fetchProductAction} from "../../../redux/ProductDucks";
import FormProduct from "./form/FormProduct";

const Category = ({fetching, product, all_categories}) => {
    let {id} = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductAction(id));
    }, [product]);

    return (
        <FormProduct id={id} mode_create={false} dispatch={dispatch} fetching={fetching} product={product}
                     all_categories={all_categories}/>
    );
};

function mapState(state) {
    return {
        product: state.products.product,
        fetching: state.products.fetching,
        all_categories: state.products.all_categories,
    }
}

export default withRouter(connect(mapState)(Category));

