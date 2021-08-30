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
    theme,
    themeUpdater,
}) => {
    isNewCollection = isNewCollection === undefined ? false : isNewCollection;
    const inputRef = useRef(null);
    useEffect(() => {
        if (isNewCollection) inputRef.current.focus();
    }, [isNewCollection]);

    const Options = (
        <div className="options">
            <button
                className="switchTheme"
                onClick={() => {
                    if (theme === "dark") return themeUpdater("light");
                    if (theme === "light") return themeUpdater("dark");
                }}
            >
                {theme === "dark" ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enable-background="new 0 0 24 24"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                    >
                        <path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enable-background="new 0 0 24 24"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                    >
                        <path d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26 c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z" />
                    </svg>
                )}
            </button>
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
