import React from 'react';

const Button = (props: { title: string; link: string; }) => {

    return (
        <div className={'button-container'}>
            <a href={props.link} className={'button b-koios'}>{props.title}</a>
        </div>
        )
}

export default Button;