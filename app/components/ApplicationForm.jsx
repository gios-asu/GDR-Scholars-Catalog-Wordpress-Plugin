import React, { Component } from "react";
import axios from "axios";
import { func, number } from "prop-types";

import FileDropzone from "./FileDropzone";

class ApplicationFormComponent extends Component {
  static propTypes = {
    handleCloseModal: func.isRequired,
    hostId: number.isRequired
  };

  state = {
    applicantName: "",
    applicantEmail: "",
    applicantStatement: "",
    fileUpload: ""
  };

  handleCloseModal = () => {
    this.props.handleCloseModal();
  };

  handleFileChange = newFile => {
    this.setState({
      fileUpload: newFile
    });
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { hostId } = this.props;

    const {
      applicantName,
      applicantEmail,
      applicantStatement,
      fileUpload
    } = this.state;

    // eslint-disable-next-line
    console.log(fileUpload);

    const data = new FormData();
    data.append("hostId", hostId);
    data.append("applicantName", applicantName);
    data.append("applicantEmail", applicantEmail);
    data.append("applicantStatement", applicantStatement);
    data.append("fileUpload", fileUpload);

    const apiEndpoint = `${gdr_catalog_object.gdr_api_url}/opportunities/apply`;
    axios
      .post(apiEndpoint, data)
      .then(result => {
        // eslint-disable-next-line
        console.log(result);
        this.handleCloseModal();
      })
      .catch(error => {
        // eslint-disable-next-line
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label htmlFor="applicantName" className="col-sm-2 col-form-label">
              Your Full Name:
            </label>
            <div className="col-sm-10">
              <input
                name="applicantName"
                type="text"
                value={this.state.applicantName}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="applicantEmail" className="col-sm-2 col-form-label">
              Your Email Address:
            </label>
            <div className="col-sm-10">
              <input
                name="applicantEmail"
                type="text"
                value={this.state.applicantEmail}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="fileUpload" className="col-sm-2 col-form-label">
              Upload Your CV:
            </label>
            <div className="col-sm-10">
              <FileDropzone
                id="fileUpload"
                name="fileUpload"
                value={this.state.fileUpload}
                onChange={this.handleFileChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="applicantStatement"
              className="col-sm-2 col-form-label"
            >
              Your Application Cover Page (150 - 200 words max):
            </label>
            <div className="col-sm-10">
              <textarea
                name="applicantStatement"
                rows="4"
                value={this.state.applicantStatement}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="offset-sm-2 col-sm-10">
              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ApplicationFormComponent;
