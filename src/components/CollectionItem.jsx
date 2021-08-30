import React, { useEffect, useRef, useState } from "react";
import CheckBox from "./CheckBox";

const CollectionItem = ({
    cover,
    name,
    total,
    openCollection,
    removeCollections,
    collectionContextMenu,
    addToSelected,
    removeFromSelected,
    indexNumber,
}) => {
    const checkboxRef = useRef(null);
    const [checkboxState, checkboxStateUpdater] = useState(false);
    useEffect(() => {
        checkboxRef.current.addEventListener("change", (e) => {
            let state = e.target.checked;
            checkboxStateUpdater(state);
        });
    }, []);
    //try making change inside checkbox
    useEffect(() => {
        if (checkboxState === true) addToSelected(indexNumber);
        if (checkboxState === false) removeFromSelected(indexNumber);
    }, [checkboxState]);
    return (
        <div
            className="collectionItem noImg"
            data-checked={checkboxState}
            tabIndex="0"
            onClick={() => openCollection(indexNumber)}
            onContextMenu={(e) => {
                e.preventDefault();
                collectionContextMenu(e, indexNumber);
            }}
        >
            <div className="cover">
                <img src={cover || ""} alt="Img" />
            </div>
            <div className="info">
                <span className="name" title={name}>
                    {name || "ddddd"}
                </span>
                <span className="total">
                    {total
                        ? total > 1
                            ? total + " Items"
                            : total + " item"
                        : "0 Item"}
                </span>
            </div>
            <div className="options">
                {/* <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeCollection(indexNumber);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#FFFFFF"
                    >
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                </button> */}
                <CheckBox ref={checkboxRef} />
            </div>
        </div>
    );
};

export default CollectionItem;
