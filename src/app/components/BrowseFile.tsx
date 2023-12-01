"use client";

import { useState, useEffect } from "react";


const BrowseFile = () =>  {

    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(!show); 
    };
    
    return (
        <>
            <button type="button" className={`d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm`} onClick={handleShow}>
                Select File
            </button>

            <div className={`modal fade ${show ? "show" : ""}`}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Select File</h5>
                            <button type="button" className="close" onClick={handleShow}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            asd
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">Select</button>
                        </div>
                    </div>
                </div>
            </div>

            <div 
                className={`${show ? "modal-backdrop" : "d-none"}`}
                style={{ 
                    opacity: '0.5', 
                }} 
            >
            </div>

        </>

    );
}

export default BrowseFile;