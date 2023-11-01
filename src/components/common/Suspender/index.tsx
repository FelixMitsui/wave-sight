import React, { Suspense } from "react";

export default function Suspender({ children }) {

    return (
        <Suspense fallback={
            <div className="d-flex rounded p-2 position-fixed top-50 start-40 bg-light-gray index-5">
                <div className="mx-1 my-0 spinner-grow" role="status"></div>
                <h3 className="mx-1 my-0 font-title">Loading...</h3>
            </div>}>
            {children}
        </Suspense>
    )
}