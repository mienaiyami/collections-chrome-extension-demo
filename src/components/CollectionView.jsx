import React from "react";
import CollectionContentItem from "./CollectionContentItem";
import TopBar from "./TopBar";

const CollectionView = ({
    collection,
    currentCollectionUpdater,
    isNew,
    newColMakingUpdater,
    newCollection1,
    newCollection2,
    addToCollections,
}) => {
    const goBack = () => {
        currentCollectionUpdater(null);
        if (isNew) newColMakingUpdater(false);
    };
    let content;
    console.log(isNew);
    if (isNew) {
        content = (
            <>
                <TopBar
                    main={false}
                    name={null}
                    goBack={goBack}
                    isNewCollection={true}
                    addToCollections={addToCollections}
                    newColMakingUpdater={newColMakingUpdater}
                />
                <div id="main">
                    <div className="createNew">
                        <button className="addCurrentLink">
                            Add Current Link
                        </button>
                        <button className="customLink">New Link</button>
                    </div>
                    <div id="collectionView">
                        <p>No Item</p>
                    </div>
                </div>
            </>
        );
    } else {
        content = (
            <>
                <TopBar main={false} name={collection.name} goBack={goBack} />
                <div id="main">
                    <div className="createNew">
                        <button className="addCurrentLink">
                            Add Current Link
                        </button>
                        <button className="customLink">New Link</button>
                    </div>
                    <div id="collectionView">
                        {collection.content.length === 0 ? (
                            <p>No Item</p>
                        ) : (
                            collection.content.map((e) => (
                                <CollectionContentItem
                                    cover={e.cover}
                                    title={e.title}
                                    href={e.href}
                                    key={e.href}
                                />
                            ))
                        )}
                    </div>
                </div>
            </>
        );
    }
    return content;
};

export default CollectionView;
