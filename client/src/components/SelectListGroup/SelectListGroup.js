import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SelectListGroup = ({
    name,
    value,
    onChange,
    info,
    error,
    options,
}) => {
    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value} >
            {option.label}
        </option>
    ))
    return (
        <div className="form-group">
            <select
                // 重要: is-invalid 是  bootstrap 的 invalid 方法 可以接 state
                className={classnames('form-control form-control-lg', { 'is-invalid': error })}
                name={name}
                value={value}
                onChange={onChange}
            >
                {selectOptions}
            </select>
            {info && <small className="form-text text-muted">{info}</small>}
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}

SelectListGroup.propTypes = {
    name:  PropTypes.string.isRequired,
    value:  PropTypes.string.isRequired,
    onChange:  PropTypes.func.isRequired,
    info:  PropTypes.string,
    error:  PropTypes.string,
    options: PropTypes.array.isRequired,
}

export default SelectListGroup;

