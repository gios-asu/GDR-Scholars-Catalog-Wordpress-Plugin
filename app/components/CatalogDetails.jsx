// @flow

import React, { Component } from "react";
import { func, number, shape, string } from "prop-types";

class CatalogDetails extends Component {
  static propTypes = {
    id: number.isRequired,
    hostId: number.isRequired,
    title: string.isRequired,
    country: string.isRequired,
    discipline: string.isRequired,
    duration: string.isRequired,
    numPositions: string.isRequired,
    projectSummary: shape({ __html: string }),
    projectDescription: shape({ __html: string }),
    workEnvironment: shape({ __html: string }),
    expectedOutcomes: shape({ __html: string }),
    benefits: shape({ __html: string }),
    handleOpenModal: func.isRequired
  };

  static defaultProps = {
    projectSummary: { __html: "" },
    projectDescription: { __html: "" },
    workEnvironment: { __html: "" },
    expectedOutcomes: { __html: "" },
    benefits: { __html: "" }
  };

  handleOpenModal = (opportunityId: number, hostId: number) => {
    this.props.handleOpenModal(opportunityId, hostId);
  };

  render() {
    return (
      <div className="container">
        <div>
          <h2>{this.props.title}</h2>
          <p>
            <b>Country:</b>&nbsp;{this.props.country}
          </p>
          <p>
            <b>Discipline:</b>&nbsp;{this.props.discipline}
          </p>
          <p>
            <b>Duration:</b>&nbsp;{this.props.duration}
          </p>
          <p>
            <b>Positions:</b>&nbsp;{this.props.numPositions}
          </p>
          <div>
            <b>Summary:</b>&nbsp;<span
              // eslint-disable-next-line
              dangerouslySetInnerHTML={this.props.projectSummary}
            />
          </div>
          <div>
            <b>Full Description:</b>&nbsp;<span
              // eslint-disable-next-line
              dangerouslySetInnerHTML={this.props.projectDescription}
            />
          </div>
          <div>
            <b>Work Environment:</b>&nbsp;<span
              // eslint-disable-next-line
              dangerouslySetInnerHTML={this.props.workEnvironment}
            />
          </div>
          <div>
            <b>Expected Outcomes:</b>&nbsp;<span
              // eslint-disable-next-line
              dangerouslySetInnerHTML={this.props.expectedOutcomes}
            />
          </div>
          <div>
            <b>Benefits:</b>&nbsp;<span
              // eslint-disable-next-line
              dangerouslySetInnerHTML={this.props.benefits}
            />
          </div>

          <div>
            <button
              className="btn btn-primary"
              onClick={() =>
                this.handleOpenModal(this.props.id, this.props.hostId)}
            >
              Submit Application
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CatalogDetails;
