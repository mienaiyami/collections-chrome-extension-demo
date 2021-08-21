import React, { useEffect, useState } from "react";
import Collections from "./components/Collections";
import CollectionView from "./components/CollectionView";

const DATA = [
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

const App = () => {
    const [data, dataUpdater] = useState(DATA);
    const [currentCollection, currentCollectionUpdater] = useState(null);
    return (
        <>
            {currentCollection === null ? (
                <Collections
                    collectionData={data}
                    currentCollectionUpdater={currentCollectionUpdater}
                />
            ) : (
                <CollectionView
                    collection={data[currentCollection]}
                    currentCollectionUpdater={currentCollectionUpdater}
                />
            )}
        </>
    );
};

export default App;
