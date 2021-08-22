import React, { useRef, useState } from "react";
import CollectionItem from "./CollectionItem";
import TopBar from "./TopBar";

const Collections = ({
    collectionData,
    currentCollectionUpdater,
    newCollection1,
    newCollection2,
}) => {
    const openCollection = (index) => {
        // console.log(DATA.filter((data) => data.name === name));
        currentCollectionUpdater(index);
    };
    const collectionRef = useRef(null);
    return (
        <>
            <TopBar
                main={true}
                name="Collections"
                currentCollectionUpdater={currentCollectionUpdater}
            />
            <div id="main">
                <div className="createNew">
                    <button className="newEmpty" onClick={newCollection1}>
                        Create New Collection
                    </button>
                    <button className="newFromAll" onClick={newCollection2}>
                        Create New Collection from All Opened tabs
                    </button>
                </div>
                <div id="collections" ref={collectionRef}>
                    {collectionData.map((e, i) => (
                        <CollectionItem
                            key={e.name}
                            name={e.name}
                            cover={e.cover}
                            total={e.content.length}
                            indexNumber={i}
                            openCollection={openCollection}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Collections;
