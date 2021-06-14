import React from 'react'
import './Button.css'
import {Link} from 'react-router-dom'
const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium', 'btn--large', 'btn--xlarge', 'btn--matchparent'];
export const Button = ({children, type, onClick, buttonStyle, buttonSize, id}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <div className='btn-mobile'>
            <button id = {id} className = {`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type = {type}>
                {children}
            </button>
        </div>
    )
}