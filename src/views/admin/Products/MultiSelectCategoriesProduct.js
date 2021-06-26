import React, {useEffect, useState} from "react";
import MultiSelect from "react-multi-select-component";
import PropTypes from "prop-types";

const MultiSelectCategoriesProduct = ({all_categories, categories_product, set_categories}) => {

    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        if (all_categories.length) {
            let cats = all_categories.map(({id, name}) => {
                return {
                    label: name,
                    value: id
                }
            });
            setCategories(cats);
        }

    }, [all_categories]);

    useEffect(() => {
        if (categories_product.length) {
            let cats = categories_product.map(({id, name}) => {
                return {
                    label: name,
                    value: id
                }
            });
            setSelected(cats);
        }

    }, [categories_product]);

    const handleChange = (data) => {
        setSelected(data);
        set_categories(data);
    }
    return (<MultiSelect
        options={categories}
        value={selected}
        onChange={handleChange}
        labelledBy="Select"
    />);
}

MultiSelectCategoriesProduct.propTypes = {
    all_categories: PropTypes.array.isRequired,
    categories_product: PropTypes.array.isRequired,
    set_categories: PropTypes.func.isRequired,
};

export default MultiSelectCategoriesProduct;
