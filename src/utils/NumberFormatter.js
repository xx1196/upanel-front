import React from "react";
import PropTypes from "prop-types";
import NumberFormat from 'react-number-format';

const NumberFormatter = ({prefix, price}) => {
    return (
        <NumberFormat decimalSeparator="," decimalScale={2} value={price} displayType={'text'} thousandSeparator="."
                      prefix={prefix}/>
    );
}

NumberFormatter.propTypes = {
    prefix: PropTypes.string,
    price: PropTypes.string.isRequired,
}

NumberFormatter.defaultProps = {
    prefix: '$'
}
export default NumberFormatter;
