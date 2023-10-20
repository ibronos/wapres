"use client"

import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import AddDataAdminButton from "@/app/components/AddDataAdminButton";

const Index = () =>  {

    const columns = [
        {
            name: 'Title',
            selector: (row: { title: any; }) => row.title,
            sortable: true,
        },
        {
            name: 'Action',
        },
    ];
    
    const data = [
        {
            id: 1,
            title: 'Lorem',
            year: '1988',
        },
        {
            id: 2,
            title: 'Ipsum',
            year: '1984',
        },
    ]


    return (
        <>
            <div className="container-fluid main-content">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Post Categories</h1>
                    <AddDataAdminButton />
                </div>
                <DataTable
                    columns={columns}
                    data={data}
                />
            </div>
        </>
    );
}

export default Index;