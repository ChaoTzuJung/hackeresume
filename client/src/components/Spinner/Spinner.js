import React from 'react';
import spinner from './spinner.gif';

export default () => (
    <div>
        <img
            style={{ display: 'block', width: '200px', margin: 'auto' }}
            src={spinner}
            alt="loading..."
        />
    </div>
);
