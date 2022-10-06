import React from 'react'


export default function Alert(props) {

    const capitalize = (word) => {                                // to CAPITIALIZE First digit
        if (word === "danger") {
            word = "error";
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    return (
        props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show position-absolute start-50`} role="alert">          {/* cppy alert from bootsrtap   "props.alert &&"  is use give condission 'if' some thing happend in alert execute this Alert 'else' dont execute anything  | props.alert.type is given to display color of alert type   */}
            <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}

        </div>

    )
}
