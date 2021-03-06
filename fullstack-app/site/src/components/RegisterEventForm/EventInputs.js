import React, { useState } from "react";
import { Breadcrumb, Form, Input, Row } from "antd";
import { useAutocomplete } from "../AutoComplete/useAutocomplete";
import "./RegisterEventForm.css";
import { Link } from "react-router-dom";

import httpRequest from "../../clientsideAPI/httpRequest";

import styled from "styled-components";
// import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Logo from "../Logo/IRXlogo.js";

const layout = { labelCol: { span: 24 }, wrapperCol: { span: 32 } };
const BreadcrumbWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  margin: 0 auto;
  margin-bottom: 0;
`;

const Content = styled.div`
  width: 100%;
  max-width: 800px;
  border-left: 1px solid #001529;
  border-right: 1px solid #001529;
  border-top: 1px solid #001529;
  padding: 20px;
  margin: 0 auto;
  text-align: center;
`;

const EventInputs = ({
  eventTypeState,
  handleEventTypeChange,
  handleAutoComplete,
  errors,
  searchTerm,
  sourceName,
  display,
  setDisplay,
  userSession,
}) => {
  const corpus = sourceName;
  const [completions] = useAutocomplete(searchTerm, corpus);

  return (
    <div>
      <BreadcrumbWrapper>
        <Row
          type="flex"
          align="middle"
          justify="left"
          className="px-3 bg-white mh-page"
          style={{ paddingTop: 10 }}
        >
          <Breadcrumb>
            <h4>
              <Breadcrumb.Item>
                <Link to="/">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/registerEvents" style={{ color: "#183045" }}>
                  Register New Event
                </Link>
              </Breadcrumb.Item>
            </h4>
          </Breadcrumb>
        </Row>
      </BreadcrumbWrapper>

      <Row
        type="flex"
        align="middle"
        justify="center"
        className="px-3 bg-white mh-page"
      >
        <Content className="noBorders">
          <Form
            {...layout}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 32 }}
            layout="horizontal"
            className="registerEventForm1 form-group"
          >
            <div
              className="text-center mb-8"
              style={{
                backgroundColor: "#183045",
                paddingTop: 8,
                paddingBottom: 5,
              }}
            >
              <a className="brand mr-0">
                <Logo
                  size={32}
                  strokeWidth={1}
                  style={{ backgroundColor: "#183045" }}
                />
              </a>
            </div>
            <div className="text-center mb-8">
              <h3 className="mb-0 mt-3 textCenter" style={{ paddingTop: 10 }}>
                Villian Event Generator
              </h3>
              <h5>Welcome User: {userSession.userEmail}</h5>
              <small className="text-muted">
                <span>
                  Use the form below to create new event type.
                  <br />
                  Hit Add Property to add additional property(ies).
                  <br />
                  Hit Add Object Property to add more Object Property.
                  <br />
                  Hit Save Object to save the Object and go to the next Event
                  Property.
                  <br />
                  Hit Reset to Reset the Event Definition.
                  <br />
                  Hit submit to submit new field type.
                </span>
              </small>
            </div>

            <Form.Item label="Enter the Event Type">
              <Input
                type="text"
                name="eventType"
                id="eventType"
                value={eventTypeState.eventType}
                onChange={handleEventTypeChange}
              />
              {errors.eventType && <p>{errors.eventType}</p>}
            </Form.Item>
            <Form.Item label="Enter Source Name">
              {" "}
              {/* sourceName */}
              <Input
                type="text"
                name="sourceName"
                id="sourceName"
                value={eventTypeState.sourceName}
                onChange={handleEventTypeChange}
              />
              {display &&
                completions.map((item, idx) => {
                  return (
                    <p key={idx} onClick={() => handleAutoComplete(item)}>
                      {item}
                    </p>
                  );
                })}
              {errors.sourceName && <p>{errors.sourceName}</p>}
            </Form.Item>
            <Form.Item label="Enter Version Number">
              {" "}
              {/* versionName */}
              <Input
                type="number"
                name="versionName"
                id="versionName"
                value={eventTypeState.versionName}
                onChange={handleEventTypeChange}
                onFocus={(e) => setDisplay(false)}
              />
              {errors.versionName && <p>{errors.versionName}</p>}
            </Form.Item>
          </Form>
          <Row
            type="flex"
            align="middle"
            justify="center"
            className="px-3 bg-white mh-page textCenter"
            style={{ marginBottom: "-20px" }}
          >
            <h3>Event Definition</h3>
          </Row>
        </Content>
      </Row>
    </div>
  );
};
// };
export default EventInputs;
