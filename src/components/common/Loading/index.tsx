import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function Loading() {
    return (
        <>
            <div className=" h-100 index-3 opacity-50 position-fixed start-0 top-0 w-100">
                <Spinner
                    className="bg-black position-relative start-50 top-50"
                    animation="grow"
                />
            </div>
        </>
    );
}

export default Loading;
