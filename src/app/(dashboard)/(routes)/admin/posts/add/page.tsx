"use client"

import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";

const AddData = () =>  {

    return (
        <div className="container-fluid main-content">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Add Data</h1>
            </div>
        </div>
    );
}

export default AddData;