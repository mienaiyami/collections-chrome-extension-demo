import React from "react";
import CollectionItem from "./CollectionItem";
import TopBar from "./TopBar";

const Collections = ({ collectionData, currentCollectionUpdater }) => {
    const openCollection = (index) => {
        // console.log(DATA.filter((data) => data.name === name));
        currentCollectionUpdater(index);
    };
    return (
        <>
            <TopBar main={true} name="Collections" />
            <div id="main">
                <div id="collection">
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
