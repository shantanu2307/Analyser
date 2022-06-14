import React from "react";
import Table from "./Table";

function BootupTimeInsights({ data }) {
  function getPoorlyCompressedResources() {
    return data.details.items.filter(
      ({ resourceSize, transferSize }) =>
        transferSize > 0 && resourceSize / transferSize <= 10
    );
  }

  return (
    <div style={{ marginBottom: "10em" }}>
      {data && data.details && (
        <>
          <h1 style={{ textAlign: "center" }}>Network Requests</h1>
          <h4 style={{ textAlign: "center" }}> {data.title} </h4>
          <h6 style={{ textAlign: "center" }}> {data.description} </h6>
          <div className="table-container">
            <Table
              id={"bootup-time"}
              headings={data.details.headings}
              items={getPoorlyCompressedResources()}
            />
          </div>
          <p style={{ textAlign: "center" }}>
            The website makes <strong>{data.details.items.length}</strong>{" "}
            network requests during the analysis out of which above given{" "}
            <strong>{getPoorlyCompressedResources().length}</strong> resources
            are poorly compressed as their Tansfer size is greater than one
            tenth of Resource Size.
            <br /> The number of requests can be reduced by bundling the
            scripts.
          </p>
        </>
      )}
    </div>
  );
}

export default BootupTimeInsights;