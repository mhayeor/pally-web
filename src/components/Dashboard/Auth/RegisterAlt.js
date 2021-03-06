import React from "react";
import "./Auth.css";
import axios from "axios";
import "./Login.css";
import {Link} from "react-router-dom";
import UserActions from '../../js/actions/userActions';
import logo from '../assets/images/logo.png'

export default class RegisterAlt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: ''
        };
    }

    componentDidMount() {
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };
    handleSubmit = event => {
        event.preventDefault();
        this.setState({loading: true, error: ''});

        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone_number: this.state.phone_number,
            referral_code: this.state.referral_code,
            email: this.state.email,
            password: this.state.password,
            c_password: this.state.c_password,
        };
        console.log('hello')
        if (user.password === user.c_password) {
            axios.post(`https://pallymate-api.herokuapp.com/api/register`, user)
                .then(res => {
                    res.status === 200 ? this.setState({registered: true}) :
                        console.log(res);
                })
                .catch(error => {
                    this.setState({error: error.message, loading: false});
                })
        } else {
            this.setState({error: 'Password must match with confirm password.'})
        }
    }

    render() {
        const {loading} = this.state;
        return (
            <div>
                <div className="row">
                    <div className="col-lg-5 bg-primary p-0" style={{marginBottom: -60}}>
                        <div className={"container"}>
              <span className="logo-lg">
                                        <img src={logo} className={"mt-2"} alt="" height="25"/>
                                    </span>
                        </div>
                        <div style={{position: 'absolute', top: 'calc(50% - 60px)', right: 0}}>
                            <Link to={"/dashboard/login"}
                                  className={"btn btn-primary btn-lg btn-block rounded-0 text-white float-right"}>Sign
                                In
                            </Link>
                            <button type="submit"
                                    className={"btn btn-white btn-lg btn-block mt-0 rounded-0 text-primary float-right"}>Sign
                                Up
                            </button>
                        </div>
                        <div className={"mb-2"} style={{position: 'absolute', bottom: 0}}>
                            <div className={"container"}>
                                <span className={"text-white mr-1"}>Follow</span>
                                <i className={"fab fa-twitter fa-lg mx-1 text-white"}></i>
                                <i className={"fab fa-instagram fa-lg mx-1 text-white"}></i>
                                <i className={"fab fa-facebook fa-lg mx-1 text-white"}></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 bg-white" style={{marginBottom: -60, minHeight: 100 + 'vh'}}>
                        <div className="account-pages mt-5 mb-5">

                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-8">
                                        <div className="card border-0">

                                            {!this.state.registered ?
                                                <div className="card-body p-4">

                                                    <div className="text-center w-75 m-auto">
                                                        <h2 className={"text-primary"}>Create an account</h2>
                                                        <p className="text-muted mb-4 mt-3">Don't have an account?
                                                            Create for free</p>
                                                    </div>

                                                    {this.state.error !== '' ?
                                                        <div class="alert alert-danger" role="alert">
                                                            {this.state.error}
                                                        </div> : null}

                                                    <form onSubmit={this.handleSubmit}>

                                                        <div className="form-group mb-3">
                                                            <label htmlFor="fullname">First Name</label>
                                                            <input className="form-control" type="text"
                                                                   onChange={this.handleChange} name="first_name"
                                                                   placeholder="Enter your first name" required/>
                                                        </div>

                                                        <div className="form-group mb-3">
                                                            <label htmlFor="fullname">Last Name</label>
                                                            <input className="form-control" type="text"
                                                                   onChange={this.handleChange} name="last_name"
                                                                   placeholder="Enter your last name" required/>
                                                        </div>

                                                        <div className="form-group mb-3">
                                                            <label htmlFor="emailaddress">Email address</label>
                                                            <input className="form-control" type="email"
                                                                   onChange={this.handleChange} name="email" required
                                                                   placeholder="Enter your email"/>
                                                        </div>
                                                        <div className="form-group mb-3">
                                                            <label>Phone Number</label>
                                                            <input className="form-control" type="number"
                                                                   onChange={this.handleChange} name="phone_number"
                                                                   required placeholder="Enter your phone number"/>
                                                        </div>

                                                        <div className="form-group mb-3">
                                                            <label htmlFor="password">Password</label>
                                                            <input className="form-control" type="password" required
                                                                   onChange={this.handleChange} name="password"
                                                                   placeholder="Enter your password"/>
                                                        </div>
                                                        <div className="form-group mb-3">
                                                            <label htmlFor="password">Retype Password</label>
                                                            <input className="form-control" type="password" required
                                                                   name="c_password" onChange={this.handleChange}
                                                                   placeholder="Enter your password again"/>
                                                        </div>
                                                        <div className="form-group mb-3">
                                                            <label>Referral Code</label>
                                                            <input className="form-control" type="text"
                                                                   onChange={this.handleChange} name="referral_code"
                                                                   placeholder="Enter your referral code"/>
                                                        </div>


                                                        <div className="form-group mb-0 text-center">
                                                            <button className="btn btn-primary btn-block" type="submit"
                                                                    disabled={loading}>
                                                                {loading && (
                                                                    <i className="log fa fa-refresh fa-spin"></i>
                                                                )}Create Account
                                                            </button>
                                                        </div>

                                                    </form>
                                                </div>
                                                : <div className="card-body p-4">

                                                    <div className="text-center w-75 m-auto">
                                                        <h2 className={"text-primary"}>Yaay!</h2>
                                                        <p className="text-muted mb-4 mt-3">You've created an account,
                                                            one more thing! Click the link in the email we sent to you
                                                            to verify your account.</p>
                                                    </div>

                                                </div>}
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-12 text-center">
                                                <p className="text-muted">Already have account? <Link
                                                    to="/dashboard/login" className="text-dark ml-1"><b>Log
                                                    In</b></Link></p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
