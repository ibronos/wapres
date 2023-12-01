"use client"

import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect, SyntheticEvent } from "react";
import slugify from 'react-slugify';
import Image from 'next/image';
import SelectFile from "@/app/components/BrowseFile";
import BrowseFile from "@/app/components/BrowseFile";

const AddData = () =>  {

    const router = useRouter();
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [image, setImage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File>();
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
               slug: slug,
               image: image
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
                        <div className="form-group mb-3">
                            <label>Image</label>
                            <div>
                                {
                                    image ? 
                                    (
                                        <div 
                                            className="card"
                                            style={{ maxWidth: '10%'}} 
                                            >
                                            <div className="card-body p-1">
                                                <Image 
                                                    src={image} alt="" 
                                                    width={0}
                                                    height={0}
                                                    sizes="100vw"
                                                    style={{ 
                                                        width: '100%', 
                                                        height: 'auto',
                                                    }} 
                                                />
                                            </div>

                                            <div className="card-footer p-2">
                                                <button className="btn btn-sm btn-danger btn-icon-split ml-2" onClick={() => setImage("")}>
                                                    <span className="icon text-white-50">
                                                        <i className="fas fa-trash" />
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    
                                    ) 
                                    : 
                                    (
                                        <>
                                            <BrowseFile />
                                            <span className="px-2">or</span>
                                            <label className={`custom-file-upload d-sm-inline-block btn btn-sm btn-danger shadow-sm`} >
                                                <input
                                                    type="file"
                                                    name="file"
                                                    onChange={(e) => {
                                                        if (e.target.files) {
                                                            const file = e.target.files[0];
                                                            setImage(URL.createObjectURL(file));
                                                            setSelectedFile(file);
                                                        }
                                                    }} 
                                                /> 
                                                <i className="fas fa-upload fa-sm text-white-50 pr-1" /> 
                                                Upload
                                            </label>
                                           
                                        </>
                            
                                    )
                                }
                            </div>

                        </div>
                      
                    </form>
                </div>
                <div className="card-footer">
                    <a className="btn btn-secondary" onClick={() => router.back()}>Back</a>
                    <button type="submit" className="btn btn-primary ml-2">Submit</button>
                </div>
            </div>
            


        </div>
    );
}

export default AddData;