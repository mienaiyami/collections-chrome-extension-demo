import React, { useEffect, useRef, useState } from "react";
import CheckBox from "./CheckBox";
const CollectionContentItem = ({
    title,
    href,
    cover,
    removeLinkFromCollection,
    currentCollection,
    linkContextMenu,
    addToSelected,
    removeFromSelected,
    indexNumber,
}) => {
    const checkboxRef = useRef(null);
    const [checkboxState, checkboxStateUpdater] = useState(false);
    useEffect(() => {
        checkboxRef.current.addEventListener("change", (e) => {
            let state = e.target.checked;
            console.log("ddddddd");
            checkboxStateUpdater(state);
        });
    }, []);
    useEffect(() => {
        if (checkboxState === true) addToSelected(indexNumber);
        if (checkboxState === false) removeFromSelected(indexNumber);
    }, [checkboxState]);
    return (
        <div
            className="collectionContentItem collectionItem"
            tabIndex="0"
            data-checked={checkboxState}
            onClick={() => {
                /* eslint-disable */
                chrome.tabs.update({ url: href });
                /* eslint-enable */
            }}
            onMouseDown={(e) => {
                e.preventDefault();
                if (e.button === 1)
                    /* eslint-disable */
                    chrome.tabs.create({ url: href, active: false });
                /* eslint-enable */
            }}
            onContextMenu={(e) => {
                linkContextMenu(e, indexNumber);
            }}
            draggable
        >
            <div className="cover">
                <img src={cover || ""} alt="Img" />
            </div>
            <div className="info">
                <span className="name">{title || "ddddd"}</span>
                <span className="link">{href || ""}</span>
            </div>
            <div className="options">
                {/* <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeLinkFromCollection(currentCollection, indexNumber);
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

export default CollectionContentItem;
