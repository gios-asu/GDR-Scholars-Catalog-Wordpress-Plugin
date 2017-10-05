// @flow
import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Dropzone from "react-dropzone";

import dropzoneImage from '../images/dropzone.png';

const DropzoneClickable = styled((Dropzone: any))`
  cursor: pointer;
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 3px;
  -webkit-border-radius: 3px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  min-height: 240px;
  padding: 1em;
  position: relative;
`;
const DropzoneMessages = styled.div`
  cursor: pointer;
  background-image: url(${dropzoneImage});
  background-size: 422px 93px;
  opacity: 1;
  filter: none;
  transition: opacity 0.3s ease-in-out;
  background-repeat: no-repeat;
  background-position: 0 0;
  position: absolute;
  width: 422px;
  height: 93px;
  margin-left: -214px;
  margin-top: -61.5px;
  top: 50%;
  left: 50%;
`;

export default class FileDropzone extends Component {
  state = {
    files: [],
    uploadPath: ""
  };

  onDrop = (files: Array) => {
    this.setState({
      files
    });

    const data = new FormData();
    data.append("fileUpload", files[0]);

    const apiEndpoint = `${gdr_catalog_object.gdr_api_url}/uploads/submit`;
    axios.post(apiEndpoint, data).then(
      response => {
        // eslint-disable-next-line
        console.log(response.data.data.file);
        // eslint-disable-next-line
        console.log(response.data.data.filePath);
        this.setState({
          uploadPath: response.data.data.filePath
        });

        // this is going to call setFieldValue and manually update values.fileUpload
        // this.handleFileChange(response.data.data.filePath);
        // // eslint-disable-next-line
        // console.log(this.props);
        this.onChange(response.data.data.filePath);
      },
      err => {
        // eslint-disable-next-line
        console.log(err);
        // ToasterInstance.show({
        //   message,
        //   iconName: "danger",
        //   intent: "danger"
        // });
      }
    );
  };

  onChange = (value: string) => {
    this.props.onChange(value);
    //
  };

  props: {
    onChange: any
  };

  render() {
    return (
      <section>
        <div id="dropzone">
          <DropzoneClickable
            accept=".txt, .doc, .docx, .pdf"
            onDrop={this.onDrop}
            multiple={false}
            className="dropzone dz-clickable"
          >
            <DropzoneMessages className="dz-default dz-message" />
          </DropzoneClickable>
          <aside>
            <ul>
              {this.state.files.map(f =>
                <span key={f.name}>Uploaded: {f.name} - {f.size} bytes</span>
              )}
            </ul>
          </aside>
        </div>
      </section>
    );
  }
}
