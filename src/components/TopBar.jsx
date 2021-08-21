import React from "react";

const TopBar = ({ main, name, goBack }) => {
    return (
        <>
            {main ? (
                <div id="topbar">
                    <h2>Collections</h2>
                    <div className="options">
                        <button className="close">X</button>
                    </div>
                </div>
            ) : (
                <div id="topbar">
                    <button className="goback" onClick={goBack}>
                        &lt;
                    </button>
                    <h2>{name}</h2>
                    <div className="options">
                        <button className="close">X</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default TopBar;
