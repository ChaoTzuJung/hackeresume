import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';

const InputGroup = ({
    placeholder,
    name,
    value,
    onChange,
    error,
    icon,
    type
}) => (
    <div className="input-group mb-3">
        {/* bootstrap 專門為input添加icon的css */}
        <div className="input-group-prepend">
            <span className="input-group-text">
                <i className={icon} />
            </span>
        </div>
        <input
            type={type}
            // 重要: is-invalid 是  bootstrap 的 invalid 方法 可以接 state
            className={classnames('form-control form-control-lg', { 'is-invalid': error })}
            placeholder={placeholder}
            name={name}
            required
            value={value}
            onChange={onChange}
        />
        {error && <div className="invalid-feedback">{error}</div>}
    </div>
)

InputGroup.propTypes = {
    placeholder:  PropTypes.string,
    name:  PropTypes.string.isRequired,
    value:  PropTypes.string.isRequired,
    onChange:  PropTypes.func.isRequired,
    error:  PropTypes.string,
    icon:  PropTypes.string,
    type:  PropTypes.string.isRequired,
}

InputGroup.defaultProps = {
    type: 'text',
}

export default InputGroup;

