import React, { Component } from "react";
import { func } from "prop-types";

class FormButtonClose extends Component {
  static propTypes = {
    handleCloseModal: func.isRequired
  };

  handleCloseModal = () => {
    this.props.handleCloseModal();
  };

  render() {
    return (
      <div className="container">
        <div className="form-group row">
          <button
            onClick={this.handleCloseModal}
            className="close"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    );
  }
}

export default FormButtonClose;
