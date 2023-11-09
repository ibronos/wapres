"use client"

import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect, SyntheticEvent } from "react";
import slugify from 'react-slugify';

const AddData = () =>  {

    const router = useRouter();
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleName = (nameParam:string) => {
        setName(nameParam);
        // let slugVar = slugify(nameParam);
        setSlug( slugify(nameParam) );
    } 

    const handleSubmit = async (e: SyntheticEvent) => {    
        e.preventDefault();
        try {

            await axios.post("/api/postcat", {
               name: name,
               slug: slug
            })
            .then(() => {
                setShowAlert(true);
                setAlertMessage('updated successfully');
                router.refresh();
            })
            .catch((error) => {
                throw new Error(error)
            })
            .finally(() => {
            });

        } catch (error:any) {
            console.error(error.response.data);
        }
    };

    return (
        <div className="container-fluid main-content">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Create Category</h1>
            </div>

            <div className={`alert alert-primary alert-dismissible fade ${showAlert ? "show" : "d-none"}`} role="alert">
                {alertMessage}
                <button type="button" className="close" onClick={() =>setShowAlert(false)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div className="card h-100">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => handleName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Slug</label>
                            <input
                                type="text"
                                className="form-control"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                required
                            />
                        </div>
                        <a className="btn btn-secondary" onClick={() => router.back()}>Back</a>
                        <button type="submit" className="btn btn-primary ml-2">Submit</button>
                    </form>
                </div>
            </div>
            


        </div>
    );
}

export default AddData;