import React, { useEffect, useRef } from "react";

const TopBar = ({
    main,
    name,
    goBack,
    isNewCollection,
    newColMakingUpdater,
    currentCollection,
    addToCollections,
    editCollection,
    currentCollectionUpdater,
}) => {
    isNewCollection = isNewCollection === undefined ? false : isNewCollection;
    const inputRef = useRef(null);
    useEffect(() => {
        if (isNewCollection) inputRef.current.focus();
    }, [isNewCollection]);
    const Options = (
        <div className="options">
            <button
                className="openFull"
                onClick={() => {
                    /* eslint-disable */
                    chrome.tabs.create({
                        url:
                            "chrome-extension://" +
                            chrome.app.getDetails().id +
                            "/index.html",
                    });
                    /* eslint-enable */
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#FFFFFF"
                >
                    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                </svg>
            </button>
            <button className="close" onClick={() => window.close()}>
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
        </div>
    );

    return (
        <>
            {main ? (
                <div id="topbar">
                    <h2>Collections</h2>
                    {Options}
                </div>
            ) : (
                <div id="topbar">
                    <button className="goback" onClick={goBack}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 0 24 24"
                            width="24px"
                            fill="#FFFFFF"
                        >
                            <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
                        </svg>
                    </button>
                    <h2>
                        <input
                            type="text"
                            ref={inputRef}
                            defaultValue={name || "New Collection"}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") e.target.blur();
                            }}
                            onBlur={(e) => {
                                if (isNewCollection) {
                                    if (e.target.value === "")
                                        newColMakingUpdater(false);
                                }
                                if (e.target.value === "")
                                    return (e.target.value = name);
                                if (!isNewCollection)
                                    return editCollection({
                                        type: "rename",
                                        index: currentCollection,
                                        name: e.target.value,
                                    });
                                if (isNewCollection) {
                                    addToCollections({
                                        name: e.target.value,
                                        content: [],
                                    });
                                    newColMakingUpdater(false);
                                    currentCollectionUpdater(0);
                                }
                            }}
                        />
                    </h2>
                    {Options}
                </div>
            )}
        </>
    );
};

export default TopBar;
