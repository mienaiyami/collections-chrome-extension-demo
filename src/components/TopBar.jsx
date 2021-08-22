import React, { useEffect, useRef } from "react";

const TopBar = ({
    main,
    name,
    goBack,
    isNewCollection,
    newColMakingUpdater,
    addToCollections,
}) => {
    isNewCollection = isNewCollection == undefined ? false : isNewCollection;
    const inputRef = useRef(null);
    useEffect(() => {
        if (isNewCollection) inputRef.current.focus();
    }, [isNewCollection]);
    return (
        <>
            {main ? (
                <div id="topbar">
                    <h2>Collections</h2>
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
                            {"[ ]"}
                        </button>
                        <button
                            className="close"
                            onClick={() => window.close()}
                        >
                            X
                        </button>
                    </div>
                </div>
            ) : (
                <div id="topbar">
                    <button className="goback" onClick={goBack}>
                        &lt;
                    </button>
                    {isNewCollection ? (
                        <input
                            type="text"
                            ref={inputRef}
                            onBlur={(e) => {
                                if (e.target.value === "")
                                    return newColMakingUpdater(false);
                                addToCollections({
                                    name: e.target.value,
                                    content: [],
                                });
                            }}
                        />
                    ) : (
                        <h2>{name}</h2>
                    )}
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
                            {"[ ]"}
                        </button>
                        <button
                            className="close"
                            onClick={() => window.close()}
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default TopBar;
