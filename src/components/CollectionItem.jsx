import React from "react";

const CollectionItem = ({
    cover,
    name,
    total,
    openCollection,
    indexNumber,
}) => {
    return (
        <div
            className="collectionItem"
            tabIndex="0"
            onClick={() => openCollection(indexNumber)}
        >
            <div className="cover">
                <img src={cover || ""} alt="Img" />
            </div>
            <div className="info">
                <span className="name">{name || "ddddd"}</span>
                <span className="total">
                    {total
                        ? total > 1
                            ? total + " Items"
                            : total + " item"
                        : "0 Item"}
                </span>
            </div>
            <div className="options">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    ...
                </button>
            </div>
        </div>
    );
};

export default CollectionItem;
