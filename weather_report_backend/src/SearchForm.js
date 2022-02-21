import React, { Component } from "react";
import SubmitButton from "./FormButton";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";



function SearchForm() {

    const formik = useFormik({
        initialValues: {
            search: "",
        },
        validationSchema: Yup.object({
            search: Yup.string().matches(/^[a-zA-Z\s]*$/, "Must be only letter or whitespaces").max(30, "Must be 30 characters or less").required("")
        }),
        onSubmit: (values) => {
            if (formik.errors.search) formik.values.search = "";

            else logUserInfo(values.search);
        }
    });

    //TO DO need to fix the bug where you can not get to search results on pressing enter. Maybe not as it works when it is used as a container.
    return (
        <div>
            <div>
                <form className="d-flex" onSubmit={formik.handleSubmit}>
                    <input className="form-control me-2" type="search" placeholder="Search location" aria-label="Search location" id="search" name="search" value={formik.values.search}
                        onChange={formik.handleChange}>
                    </input>

                    <SubmitButton text={formik.values.search}></SubmitButton>
                </form>
                {formik.errors.search ? <p style={{ color: "red" }}>
                    {formik.errors.search}</p>
                    : null}
            </div>
        </div>
    );



}
async function logUserInfo(keyword) {
    let userIP = "uses proxy"; // temp parameter.
    await logUserKeyword(keyword, userIP);
}

async function logUserKeyword(kw, ip) {
    return fetch('/api/search', {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ keyword: kw, userip: ip })
    })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                } else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}
// TO DO need a way to identify a user who used keyword.
async function getIP() {
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data);
    return res.data.IPv4;
}

export default SearchForm;