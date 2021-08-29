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
    const [data, dataUpdater] = useState([]); /* eslint-disable */
    useEffect(() => {
        if (isDev) {
            dataUpdater(DAT);
        } else {
            chrome.storage.sync.get("collections", ({ collections }) => {
                console.log("d", collections);
                if (collections === undefined) {
                    dataUpdater([]);
                    chrome.storage.sync.set({ collections: [] }, () => {
                        console.log("yeee", data);
                    });
                } else dataUpdater(collections);
                console.log("data1", data);
            });
        }
        document.getElementById("app").oncontextmenu = (e) => {
            e.preventDefault();
        };
    }, []);
    /* eslint-enable */
    const [currentCollection, currentCollectionUpdater] = useState(null);
    const [newColMaking, newColMakingUpdater] = useState(false);

    const initNewCollection1 = () => {
        newColMakingUpdater(true);
    };
    const addToCollections = ({ name, content }) => {
        // let occ = 0;
        // let name1 = name;
        // console.log(name1);
        // while (data.map((e) => e.name).includes(name1)) {
        //     occ++;
        //     name1 = name + "_" + occ;
        //     console.log(name1);
        //     if (occ > 100) break;
        // }
        // if (occ > 100) return;
        const newData = {
            name: name,
            cover: "",
            content,
        };
        const updatedData = [newData, ...data];
        console.log("new");
        dataUpdater(updatedData);
    };
    useEffect(() => {
        console.log(data);
        if (!isDev) {
            /* eslint-disable */
            console.log(data);
            chrome.storage.sync.set({ collections: data });
            chrome.storage.sync.get("collections", ({ collections }) => {
                console.log(data, collections);
            });
            /* eslint-enable */
        }
    }, [data]);
    const addLinkToCollection = ({ colIndex, link, title, cover }) => {
        let newContentItem = {
            type: "link",
            title: title || "title",
            cover: cover || "",
            href: link,
        };
        console.log("newContentItem", newContentItem);
        data[colIndex].content.unshift(newContentItem);
        dataUpdater([...data]);
    };
    const removeCollections = (indexes) => {
        // data.splice(index, 1);
        if (data.length < Math.max(...indexes)) return;
        let newData = [...data].filter((e, i) => {
            console.log(indexes.includes(i), indexes, i);
            return !indexes.includes(i);
        });
        console.log(newData);
        dataUpdater(newData);
    };
    const removeLinkFromCollection = (colIndex, indexes) => {
        if (data.length < colIndex) return;
        if (data[colIndex].content.length < Math.max(...indexes)) return;
        console.log(colIndex, indexes);
        let newData = [...data];
        newData[colIndex].content = newData[colIndex].content.filter((e, i) => {
            console.log(indexes.includes(i), indexes, i);
            return !indexes.includes(i);
        });
        console.log(newData);
        dataUpdater(newData);
    };
    const initNewCollection2 = () => {
        let content = [];
        //eslint-disable-next-line
        chrome.tabs.query({ currentWindow: true }).then((tabs) => {
            console.log(tabs);
            tabs.forEach((e) => {
                content.push({
                    type: "link",
                    href: e.url,
                    title: e.title,
                    cover: e.favIconUrl,
                });
            });
            data.unshift({
                name: new Date().toUTCString(),
                cover: "",
                content,
            });
            dataUpdater([...data]);
        });
    };
    const editCollection = (e) => {
        if (e.type === "rename") {
            // let index;
            // let occ = 0;
            // data.forEach((i, j) => {
            //     if (i.name === e.oldName) {
            //         index = j;
            //         occ++;
            //     }
            // });
            // if (occ > 1) return;
            data[e.index].name = e.name;
            dataUpdater(data);
        }
    };
    return (
        <>
            {newColMaking === true ? (
                <CollectionView
                    isNew={true}
                    newColMakingUpdater={newColMakingUpdater}
                    collection={null}
                    currentCollection={currentCollection}
                    newCollection1={initNewCollection1}
                    newCollection2={initNewCollection2}
                    editCollection={editCollection}
                    currentCollectionUpdater={currentCollectionUpdater}
                    addToCollections={addToCollections}
                    addLinkToCollection={addLinkToCollection}
                    removeLinkFromCollection={removeLinkFromCollection}
                />
            ) : currentCollection === null ? (
                <Collections
                    collectionData={data}
                    newCollection1={initNewCollection1}
                    newCollection2={initNewCollection2}
                    currentCollectionUpdater={currentCollectionUpdater}
                    removeCollections={removeCollections}
                />
            ) : (
                <CollectionView
                    isNew={false}
                    newColMakingUpdater={newColMakingUpdater}
                    collection={data[currentCollection]}
                    currentCollection={currentCollection}
                    newCollection1={initNewCollection1}
                    newCollection2={initNewCollection2}
                    editCollection={editCollection}
                    currentCollectionUpdater={currentCollectionUpdater}
                    addLinkToCollection={addLinkToCollection}
                    removeLinkFromCollection={removeLinkFromCollection}
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
