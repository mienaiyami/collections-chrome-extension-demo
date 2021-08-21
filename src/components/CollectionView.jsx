import React from "react";
import CollectionContentItem from "./CollectionContentItem";
import TopBar from "./TopBar";

const CollectionView = ({ collection, currentCollectionUpdater }) => {
    const goBack = () => {
        currentCollectionUpdater(null);
    };
    return (
        <>
            <TopBar main={false} name={collection.name} goBack={goBack} />
            <div id="main">
                <div id="collectionView">
                    {collection.content.map((e) => (
                        <CollectionContentItem
                            cover={e.cover}
                            title={e.title}
                            href={e.href}
                            key={e.href}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default CollectionView;
