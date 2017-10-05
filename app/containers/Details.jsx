// @flow

import React, { Component } from "react";
import Modal from "react-modal";
import marked from "marked";

import CatalogDetails from "../components/CatalogDetails";
import ApplicationForm from "../components/ApplicationForm";
import FormButtonClose from "../components/FormButtonClose";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class Details extends Component {
  state = {
    modalIsOpen: false,
    modalOpportunityId: 0,
    modalHostId: 0
  };

  getMarkup = (content: string) => {
    const markup = marked(content, { sanitize: true });
    return { __html: markup };
  };

  props: {
    row: {
      original: {
        id: number,
        hostId: number,
        title: string,
        country: string,
        discipline: string,
        duration: string,
        numPositions: string,
        projectSummary: string,
        projectDescription: string,
        workEnvironment: string,
        expectedOutcomes: string,
        benefits: string
      }
    }
  };

  handleOpenModal = (opportunityId: number, hostId: number) => {
    this.setState({ modalIsOpen: true });
    this.setState({ modalOpportunityId: opportunityId });
    this.setState({ modalHostId: hostId });
  };

  handleAfterOpenModal = () => {
    // references are now sync'd and can be accessed.
  };

  handleCloseModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <div className="gray-back">
        <CatalogDetails
          id={this.props.row.original.id}
          hostId={this.props.row.original.hostId}
          title={this.props.row.original.title}
          country={this.props.row.original.country}
          discipline={this.props.row.original.discipline}
          duration={this.props.row.original.duration}
          numPositions={this.props.row.original.numPositions}
          projectSummary={this.getMarkup(
            this.props.row.original.projectSummary
          )}
          projectDescription={this.getMarkup(
            this.props.row.original.projectDescription
          )}
          workEnvironment={this.getMarkup(
            this.props.row.original.workEnvironment
          )}
          expectedOutcomes={this.getMarkup(
            this.props.row.original.expectedOutcomes
          )}
          benefits={this.getMarkup(this.props.row.original.benefits)}
          handleOpenModal={this.handleOpenModal}
          {...this.props}
        />
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.handleAfterOpenModal}
          onRequestClose={this.handleCloseModal}
          style={customStyles}
          contentLabel="Submit Application"
        >
          <FormButtonClose handleCloseModal={this.handleCloseModal} />
          <ApplicationForm
            opportunityId={this.state.modalOpportunityId}
            hostId={this.state.modalHostId}
            handleCloseModal={this.handleCloseModal}
            {...this.props}
          />
        </Modal>
      </div>
    );
  }
}

export default Details;
