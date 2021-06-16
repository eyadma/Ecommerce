import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";

const Profile = ({ match }) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        usernd:"",
        city:"",
        street:"",
        error: false,
        success: false
    });

    const { token } = isAuthenticated();
    const { name, email, password, usernd, city, street, error, success } = values;

    const init = userId => {
        // console.log(userId);
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name, email: data.email, city: data.city, street: data.street });
            }
        });
    };

    useEffect(() => {
        init(match.params.userId);
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, { name, email, password,usernd,city, street }).then(
            data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    updateUser(data, () => {
                        setValues({
                            ...values,
                            name: data.name,
                            email: data.email,
                            usernd: data.usernd,
                            city: data.city,
                            street: data.street,
                            success: true
                        });
                    });
                }
            }
        );
    };

    const redirectUser = success => {
        if (success) {
            return <Redirect to="/cart" />;
        }
    };

    const profileUpdate = (name, email, password,usernd, city, street) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    onChange={handleChange("name")}
                    className="form-control"
                    value={name}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    type="email"
                    onChange={handleChange("email")}
                    className="form-control"
                    value={email}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    type="password"
                    onChange={handleChange("password")}
                    className="form-control"
                    value={password}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">National ID</label>
                <input
                    type="text"
                    onChange={handleChange("usernd")}
                    className="form-control"
                    value={usernd}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">City</label>
                <input
                    type="text"
                    onChange={handleChange("city")}
                    className="form-control"
                    value={city}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">street</label>
                <input
                    type="text"
                    onChange={handleChange("street")}
                    className="form-control"
                    value={street}
                />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    return (
        <Layout
            title="Profile"
            description="Update your profile"
            className="container-fluid"
        >
            <h2 className="mb-4">Profile update</h2>
            {profileUpdate(name, email, password, usernd, city, street)}
            {redirectUser(success)}
        </Layout>
    );
};

export default Profile;
