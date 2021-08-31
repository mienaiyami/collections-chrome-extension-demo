import React, { useEffect, useRef, useState } from "react";
import CheckBox from "./CheckBox";

const CollectionItem = ({
    name,
    total,
    openCollection,
    removeCollections,
    collectionContextMenu,
    addToSelected,
    removeFromSelected,
    addLinkToCollection,
    onCollectionDrag,
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
            className="collectionItem"
            data-checked={checkboxState}
            tabIndex="0"
            data-index={indexNumber}
            onClick={() => {
                openCollection(indexNumber);
            }}
            onContextMenu={(e) => {
                e.preventDefault();
                collectionContextMenu(e, indexNumber);
            }}
            draggable
            onDragStart={(e) => {
                e.preventDefault();
                onCollectionDrag(e, indexNumber);
            }}
        >
            <div className="addCurrent">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        //eslint-disable-next-line
                        chrome.tabs
                            .query({
                                active: true,
                                currentWindow: true,
                            })
                            .then((tabs) => {
                                const tab = tabs[0];
                                addLinkToCollection({
                                    colIndex: indexNumber,
                                    link: tab.url,
                                    title: tab.title,
                                    cover: tab.favIconUrl,
                                });
                            });
                    }}
                >
                    +
                </button>
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
                <CheckBox ref={checkboxRef} />
            </div>
        </div>
    );
};

export default CollectionItem;
