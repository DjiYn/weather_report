import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import SearchResultsHook from "./SearchResultsHook";
import LocationHook from "./LocationHook";

const Main = props => {
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<Homepage />}>
                </Route>
                <Route path="/search" element={<SearchResultsHook />}></Route>
                <Route path="/:locationId" element={<LocationHook />}></Route>
                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </div >
    )
};

export default Main;