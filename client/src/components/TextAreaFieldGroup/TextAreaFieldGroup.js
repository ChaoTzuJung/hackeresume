import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextAreaFieldGroup = ({
    placeholder,
    name,
    value,
    onChange,
    info,
    error,
}) => (
    <div className="form-group">
        <textarea
            // 重要: is-invalid 是  bootstrap 的 invalid 方法 可以接 state
            className={classnames('form-control form-control-lg', { 'is-invalid': error })}
            placeholder={placeholder}
            name={name}
            required
            value={value}
            onChange={onChange}
        />
        {info && <small className="form-text text-muted">{info}</small>}
        {error && <div className="invalid-feedback">{error}</div>}
    </div>
)

TextAreaFieldGroup.propTypes = {
    placeholder:  PropTypes.string,
    name:  PropTypes.string.isRequired,
    value:  PropTypes.string.isRequired,
    onChange:  PropTypes.func.isRequired,
    info:  PropTypes.string,
    error:  PropTypes.string,
}

export default TextAreaFieldGroup;

