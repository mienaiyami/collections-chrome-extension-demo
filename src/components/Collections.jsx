import React, { useRef, useEffect, useState } from "react";
import CollectionItem from "./CollectionItem";
import TopBar from "./TopBar";

const Collections = ({
    collectionData,
    removeCollections,
    currentCollectionUpdater,
    newCollection1,
    newCollection2,
    promptConfirm,
}) => {
    const openCollection = (index) => {
        currentCollectionUpdater(index);
    };
    const mainContRef = useRef(null);
    const collectionRef = useRef(null);
    const contextMenu = useRef(null);
    const [contextMenuState, contextMenuStateUpdater] = useState("closed");
    const [contextMenuSelectedIndex, contextMenuSelectedIndexUpdater] =
        useState(null);
    const collectionContextMenu = (e, index) => {
        if (contextMenu.current !== null) {
            let x =
                e.clientX >
                mainContRef.current.offsetWidth -
                    contextMenu.current.offsetWidth
                    ? mainContRef.current.offsetWidth -
                      contextMenu.current.offsetWidth -
                      30
                    : e.clientX;
            let y =
                e.clientY >
                document.body.offsetHeight - contextMenu.current.offsetHeight
                    ? document.body.offsetHeight -
                      contextMenu.current.offsetHeight -
                      30
                    : e.clientY;
            console.log(x, y);
            contextMenuSelectedIndexUpdater(index);
            contextMenu.current.style.left = x + "px";
            contextMenu.current.style.top = y + "px";
        }
        contextMenuStateUpdater("opened");
    };
    const [selectedCollection, selectedCollectionUpdater] = useState([]);
    const addToSelected = (index) => {
        if (selectedCollection.includes(index)) return;
        selectedCollectionUpdater([...selectedCollection, index]);
    };
    const removeFromSelected = (index) => {
        if (selectedCollection.includes(index)) {
            selectedCollectionUpdater([
                ...selectedCollection.filter((e) => e !== index),
            ]);
        }
    };
    useEffect(() => {
        console.log("aaaa", selectedCollection);
        if (selectedCollection.length > 0) {
        }
    }, [selectedCollection]);
    useEffect(() => {
        document.addEventListener("mousedown", (e) => {
            if (
                contextMenu !== null &&
                e.target !== contextMenu.current &&
                !e.path.includes(contextMenu.current)
            ) {
                contextMenuStateUpdater("closed");
            }
        });
    }, []);
    const deSelectAll = () => {
        selectedCollectionUpdater([]);
        [...collectionRef.current?.children].forEach((e) => {
            e.lastElementChild.firstElementChild.firstElementChild.checked = false;
            e.lastElementChild.firstElementChild.firstElementChild.dispatchEvent(
                new Event("change")
            );
        });
    };
    return (
        <>
            <TopBar
                main={true}
                name="Collections"
                currentCollectionUpdater={currentCollectionUpdater}
            />
            <div id="main" ref={mainContRef}>
                <div
                    className="contextMenu"
                    ref={contextMenu}
                    data-state={contextMenuState}
                    onContextMenu={(e) => {
                        e.preventDefault();
                    }}
                    onClick={() => {
                        contextMenuStateUpdater("closed");
                    }}
                >
                    <li
                        role="button"
                        onClick={() => {
                            removeCollections([contextMenuSelectedIndex]);
                        }}
                    >
                        Remove Collection
                    </li>
                    <li
                        role="button"
                        onClick={() => {
                            /* eslint-disable */
                            let links = collectionData[
                                contextMenuSelectedIndex
                            ].content.map((e) => e.href);
                            if (contextMenuSelectedIndex !== null)
                                chrome.tabs.create({
                                    url: links,
                                }); /* eslint-enable */
                        }}
                    >
                        Open All
                    </li>
                    <li
                        role="button"
                        onClick={() => {
                            /* eslint-disable */
                            let links = collectionData[
                                contextMenuSelectedIndex
                            ].content.map((e) => e.href);
                            if (contextMenuSelectedIndex !== null)
                                chrome.windows.create({
                                    url: links,
                                    state: "maximized",
                                }); /* eslint-enable */
                        }}
                    >
                        Open All in new window
                    </li>
                    <li
                        role="button"
                        onClick={() => {
                            /* eslint-disable */
                            let links = collectionData[
                                contextMenuSelectedIndex
                            ].content.map((e) => e.href);
                            if (contextMenuSelectedIndex !== null)
                                chrome.windows.create({
                                    url: links,
                                    state: "maximized",
                                    incognito: true,
                                }); /* eslint-enable */
                        }}
                    >
                        Open All in incognito window
                    </li>
                </div>
                <div
                    className="deleteSelected"
                    style={
                        selectedCollection.length === 0
                            ? { display: "none" }
                            : { display: "flex" }
                    }
                >
                    <span className="selectedInfo">
                        {selectedCollection.length} selected
                    </span>
                    <span className="options">
                        <button
                            onClick={() => {
                                removeCollections(selectedCollection);
                                selectedCollectionUpdater([]);
                                deSelectAll();
                                return;
                                promptConfirm(
                                    "Are you sure you want to delete " +
                                        selectedCollection.length +
                                        " collections",
                                    () => removeCollections(selectedCollection)
                                );
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill="#FFFFFF"
                            >
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        </button>
                        <button onClick={deSelectAll}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill="#FFFFFF"
                            >
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                            </svg>
                        </button>
                    </span>
                </div>
                <div
                    className="createNew"
                    style={
                        selectedCollection.length === 0
                            ? { display: "flex" }
                            : { display: "none" }
                    }
                >
                    <button className="newEmpty" onClick={newCollection1}>
                        Create New Collection
                    </button>
                    <button className="newFromAll" onClick={newCollection2}>
                        Create New Collection from All Opened tabs
                    </button>
                </div>
                <div
                    id="collections"
                    ref={collectionRef}
                    className="collection-view"
                >
                    {collectionData === null ? (
                        <p>No Collection</p>
                    ) : collectionData.length === 0 ? (
                        <p>No Collection</p>
                    ) : (
                        collectionData.map((e, i) => (
                            <CollectionItem
                                key={e.name + i}
                                name={e.name}
                                cover={e.cover}
                                total={e.content.length}
                                indexNumber={i}
                                openCollection={openCollection}
                                removeCollections={removeCollections}
                                collectionContextMenu={collectionContextMenu}
                                addToSelected={addToSelected}
                                removeFromSelected={removeFromSelected}
                            />
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Collections;
