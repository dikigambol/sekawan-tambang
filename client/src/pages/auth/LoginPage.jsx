import React, { Component } from "react";
import MainLogin from "../../config/mainLogin";
import { SignIn } from "../../services/auth";

export default class Login extends Component {

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitForm = async (e) => {
    e.preventDefault()
    const res = await SignIn(this.state)
    if (res) {
      localStorage.setItem("jwt", JSON.stringify(res));
      localStorage.setItem("islogin", true);
      window.location.href = "/home";
    }
  }

  componentDidMount() {
    if (localStorage.getItem('islogin')) {
      window.location.href = "/home";
    }
  }

  render() {
    return (
      <>
        {
          localStorage.getItem('islogin') ?
            null
            :
            <div>
              <MainLogin />
              <div id="loginArea">
                <div className="content" id="animasi">
                  <div className="container centerVer">
                    <div className="row">
                      <div className="col-md-12 contents">
                        <div className="row justify-content-center">
                          <div className="col-md-5">
                            <div className="mb-4">
                              <h3 style={{ lineHeight: '1.2' }}>
                                Tambang <strong>Sekawan</strong>
                              </h3>
                              <p className="mb-2 captionP">
                                Silahkan masuk untuk mengakses dashboard.
                              </p>
                            </div>
                            <form onSubmit={this.submitForm}>
                              <div className="form-group first" style={{ marginTop: '30px' }}>
                                <label htmlFor="username">Username</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="username"
                                  id="user_name"
                                  style={{ fontSize: '16px' }}
                                  onChange={this.handleChange}
                                  required
                                />
                              </div>
                              <div
                                className="form-group last mb-4"
                                style={{ marginTop: "35px" }}
                              >
                                <label htmlFor="password">Password</label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="user_password"
                                  name="password"
                                  style={{ fontSize: '16px', marginBottom: '-10px' }}
                                  onChange={this.handleChange}
                                  required
                                />
                              </div>
                              {/* button login  */}
                              <button
                                style={{ marginTop: "15px" }}
                                type="submit"
                                className="btn text-white btn-block btn-primary2"
                                id="btnLogin">
                                Login
                              </button>
                              {/* end button login  */}
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        }
      </>
    );
  }
}