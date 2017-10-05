// @flow

import React from "react";
import { array, shape } from "prop-types";
import ReactTable from "react-table";

import "react-table/react-table.css";

import Details from "../containers/Details";

const helpTipDivStyle = {
  fontSize: "0.9rem",
  paddingBottom: "10px",
  paddingLeft: "10px",
  paddingTop: "0"
};

function CatalogTable(props: {
  posts: array,
  columns: array,
  tableOptions: shape
}) {
  return (
    <div>
      <div className="table-wrap">
        <ReactTable
          className="-striped -highlight"
          data={props.posts}
          columns={props.columns}
          {...props.tableOptions}
          SubComponent={row => <Details row={row} {...props} />}
        />
      </div>
      <div className="text-primary pull-right" style={helpTipDivStyle}>
        <br />
        Tips:<br />&middot;&nbsp;Click on <span>&#x2295;</span> to expand row
        and view full details.<br />
        &middot;&nbsp;Click on column titles to sort<br />
        &middot;&nbsp;Filter results by typing values into text fields
        beneath
        column titles.
      </div>
    </div>
  );
}

export default CatalogTable;
