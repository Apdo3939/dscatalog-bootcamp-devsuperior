import React from 'react';

type Props = {
    text?: string;
}

const Alert = ({text}:Props) => (
    <div className= 'alert alert-primary'>
        <h1>Hello {text}!</h1>
    </div>
);

export default Alert;