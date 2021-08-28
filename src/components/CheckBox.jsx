import React from "react";

const CheckBox = React.forwardRef((props, checkboxRef) => {
    return (
        <label
            onClick={(e) => {
                e.stopPropagation();
            }}
            className="inputCheckboxCont"
        >
            <input type="checkbox" ref={checkboxRef} />
            <span className="inputCheckbox">
                <span className="check">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#FFFFFF"
                    >
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                    </svg>
                </span>
            </span>
        </label>
    );
});

export default CheckBox;
