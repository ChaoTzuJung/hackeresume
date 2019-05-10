import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextFeildGroup = ({
    type,
    placeholder,
    name,
    value,
    onChange,
    disabled,
    info,
    error,
}) => (
    <div className="form-group">
        <input
            type={type}
            // 重要: is-invalid 是  bootstrap 的 invalid 方法 可以接 state
            className={classnames('form-control form-control-lg', { 'is-invalid': error })}
            placeholder={placeholder}
            name={name}
            required
            value={value}
            onChange={onChange}
            disabled={disabled}
        />
        {info && <small className="form-text text-muted">{info}</small>}
        {error && <div className="invalid-feedback">{error}</div>}
    </div>
)

TextFeildGroup.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder:  PropTypes.string,
    name:  PropTypes.string.isRequired,
    value:  PropTypes.string.isRequired,
    onChange:  PropTypes.func.isRequired,
    disabled:  PropTypes.string,
    info:  PropTypes.string,
    error:  PropTypes.string,
}

TextFeildGroup.defaultProps = {
    type: 'text',
}

export default TextFeildGroup;

