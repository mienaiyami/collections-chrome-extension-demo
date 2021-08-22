import React, { useEffect, useState } from "react";
import Collections from "./components/Collections";
import CollectionView from "./components/CollectionView";

const isDev = process.env.NODE_ENV === "development";
console.log(process.env.NODE_ENV, isDev);
const DAT = [
    {
        name: "col1",
        cover: "",
        content: [
            {
                type: "link",
                title: "dddd",
                cover: "",
                href: "https://github.com/",
            },
        ],
    },
    {
        name: "col2",
        cover: "",
        content: [],
    },
    {
        name: "col3",
        cover: "",
        content: [
            {
                type: "link",
                title: "dddd",
                cover: "",
                href: "https://github.com/",
            },
            {
                type: "link",
                title: "dddd",
                cover: "",
                href: "https://github.com/",
            },
            {
                type: "link",
                title: "dddd",
                cover: "",
                href: "https://github.com/",
            },
            {
                type: "link",
                title: "dddd",
                cover: "",
                href: "https://github.com/",
            },
        ],
    },
    {
        name: "col3",
        cover: "",
        content: [
            {
                type: "link",
                title: "dddd",
                cover: "",
                href: "https://github.com/",
            },
            {
                type: "link",
                title: "dddd",
                cover: "",
                href: "https://github.com/",
            },
            {
                type: "link",
                title: "dddd",
                cover: "",
                href: "https://github.com/",
            },
            {
                type: "link",
                title: "dddd",
                cover: "",
                href: "https://github.com/",
            },
        ],
    },
    {
        name: "col3",
        cover: "",
        content: [
            {
                type: "link",
                title: "dddd",
                cover: "",
                href: "https://github.com/",
            },
            {
                type: "link",
                title: "dddd",
                cover: "",
                href: "https://github.com/",
            },
            {
                type: "link",
                title: "dddd",
                cover: "",
                href: "https://github.com/",
            },
            {
                type: "link",
                title: "dddd",
                cover: "",
                href: "https://github.com/",
            },
        ],
    },
    {
        name: "col3",
        cover: "",
        content: [
            {
                type: "link",
                title: "dddd",
                cover: "",
                href: "https://github.com/",
            },
            {
                type: "link",
                title: "dddd",
                cover: "",
                href: "https://github.com/",
            },
            {
                type: "link",
                title: "dddd",
                cover: "",
                href: "https://github.com/",
            },
            {
                type: "link",
                title: "dddd",
                cover: "",
                href: "https://github.com/",
            },
        ],
    },
    {
        name: "col3",
        cover: "",
        content: [
            {
                type: "link",
                title: "dddd",
                cover: "",
                href: "https://github.com/",
            },
            {
                type: "link",
                title: "dddd",
                cover: "",
                href: "https://github.com/",
            },
            {
                type: "link",
                title: "dddd",
                cover: "",
                href: "https://github.com/",
            },
            {
                type: "link",
                title: "dddd",
                cover: "",
                href: "https://github.com/",
            },
        ],
    },
    {
        name: "col4",
        cover: "",
        content: [
            {
                type: "link",
                title: "dddd",
                cover: "",
                href: "https://github.com/",
            },
            {
                type: "link",
                title: "dddd",
                cover: "",
                href: "https://github.com/",
            },
            {
                type: "link",
                title: "dddd",
                cover: "",
                href: "https://github.com/",
            },
            {
                type: "link",
                title: "dddd",
                cover: "",
                href: "https://github.com/",
            },
        ],
    },
];

let DATA;
if (isDev) DATA = DAT;
/* eslint-disable */ else {
    chrome.storage.sync.get("collections", ({ collections }) => {
        DATA = collections;
        console.log("data", DATA);
    });
    if (DATA === undefined) {
        DATA = [];
        chrome.storage.sync.set({ collections: DATA });
    }
}
/* eslint-enable */
const App = () => {
    const [data, dataUpdater] = useState(DATA);
    const [currentCollection, currentCollectionUpdater] = useState(null);
    const [newColMaking, newColMakingUpdater] = useState(false);

    const initNewCollection1 = () => {
        newColMakingUpdater(true);
    };
    const addToCollections = ({ name, content }) => {
        const newData = {
            name,
            cover: "",
            content,
        };
        const updatedData = [newData, ...data];
        dataUpdater(updatedData);
        //eslint-disable-next-line
        chrome.storage.sync.get("collections", ({ collections }) => {
            console.log("ddd", collections);
        });
    };
    useEffect(() => {
        if (!isDev) {
            /* eslint-disable */
            chrome.storage.sync.set({ collections: data });
            chrome.storage.sync.get("collections", ({ collections }) => {
                console.log(data, collections);
            });
            /* eslint-enable */
        }
    }, [data]);
    const initNewCollection2 = () => {};
    return (
        <>
            {newColMaking === true ? (
                <CollectionView
                    isNew={true}
                    newColMakingUpdater={newColMakingUpdater}
                    collection={null}
                    newCollection1={null}
                    newCollection2={null}
                    currentCollectionUpdater={currentCollectionUpdater}
                    addToCollections={addToCollections}
                />
            ) : currentCollection === null ? (
                <Collections
                    collectionData={data}
                    newCollection1={initNewCollection1}
                    newCollection2={initNewCollection2}
                    currentCollectionUpdater={currentCollectionUpdater}
                />
            ) : (
                <CollectionView
                    isNew={false}
                    newColMakingUpdater={newColMakingUpdater}
                    collection={data[currentCollection]}
                    newCollection1={initNewCollection1}
                    newCollection2={initNewCollection2}
                    currentCollectionUpdater={currentCollectionUpdater}
                />
            )}
        </>
    );
};

export default App;

// "icons": {
//     "16": "",
//     "48": "",
//     "128": ""
// },
