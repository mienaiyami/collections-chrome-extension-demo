import React from "react";

const CollectionContentItem = ({ title, href, cover }) => {
    return (
        <a className="collectionContentItem" href={href} tabIndex="0">
            <div className="cover">
                <img src={cover || ""} alt="Img" />
            </div>
            <div className="info">
                <span className="name">{title || "ddddd"}</span>
                <span className="link">{href || ""}</span>
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
        </a>
    );
};

export default CollectionContentItem;
