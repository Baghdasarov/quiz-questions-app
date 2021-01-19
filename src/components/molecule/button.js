import React from "react";

const Button = props => {
    return <button type="button" className={`btn ${ props.styleName }`} onClick={props.onClick}>{ props.text }</button>
}

export default Button