import React from "react";
import useDropdown from "./useDropdown";
import NestedPropInput from "./NestedPropInput";
import { Form, Row, Col } from "antd";
import styled from "styled-components";
import "./RegisterEventForm.css";

const layout = { labelCol: { span: 24 }, wrapperCol: { span: 32 } };
const Content = styled.div`
  width: 100%;
  max-width: 800px;
  border-left: 1px solid #001529;
  border-right: 1px solid #001529;
  padding: 20px;
  margin: 0 auto;
  text-align: center;
  align: middle;
  padding: 20px;
`;

const PropInputs = ({
  idx,
  propState,
  nestedPropState,
  handleEventPropChange,
  handleNestedPropChange,
  handleTypeSelectChange,
  handleNestedTypeSelectChange,
  removeProperty,
  removeNestedProperty,
  errorProp,
  errorNestedProp,
}) => {
  const propId = `prop-${idx}`;
  const valId = `val-${idx}`;
  const delId = `del-${idx}`;
  const typeList1 = ["string", "number", "array", "boolean"];
  const typeList2 = ["string", "number", "object", "array", "boolean"];
  const [firstType, FirstTypeOfProp] = useDropdown(
    "        ",
    "",
    typeList1,
    handleTypeSelectChange,
    0
  );
  const [type, TypeOfProp] = useDropdown(
    "        ",
    "",
    typeList2,
    handleTypeSelectChange,
    idx
  );

  return (
    <>
      <Content>
        <div key={`prop-${idx}`}>
          <Form {...layout} layout="horizontal" className="form-group">
            <Row
              type="flex"
              align="middle"
              justify="center"
              className="px-3 bg-white mh-page textCenter"
            >
              <Col span={6}>
                <Form.Item label={`Property #${idx + 1}`}></Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Type of Prop"></Form.Item>
              </Col>
              <Col span={6}>
                {type !== "object" ? (
                  <Form.Item label={`Value #${idx + 1}`}></Form.Item>
                ) : null}
              </Col>
              <Col span={6}>
                <span>{/* No Text Here */}</span>
              </Col>
            </Row>

            <Row
              type="flex"
              align="top"
              justify="center"
              className="px-3 bg-white mh-page textCenter"
              style={{ margin: 0, padding: 0 }}
            >
              <Col span={6}>
                <Form.Item>
                  <input
                    type="text"
                    name={propId}
                    data-idx={idx}
                    id={propId}
                    className="property"
                    value={propState[idx].property}
                    onChange={handleEventPropChange}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                {idx === 0 ? (
                  <FirstTypeOfProp
                    handleTypeSelectChange={handleTypeSelectChange}
                  />
                ) : (
                  <TypeOfProp handleTypeSelectChange={handleTypeSelectChange} />
                )}
              </Col>
              <Col span={6}>
                {type !== "object" ? (
                  <Form.Item>
                    <input
                      name={valId}
                      data-idx={idx}
                      id={valId}
                      className="valOfProp"
                      value={propState[idx].valOfProp}
                      onChange={handleEventPropChange}
                      type="text"
                    />
                  </Form.Item>
                ) : null}
              </Col>
              <Col span={6}>
                {idx >= 1 && (
                  <Form.Item>
                    <input
                      type="button"
                      name={delId}
                      data-idx={idx}
                      id={delId}
                      className="deleteButton"
                      value="Delete"
                      style={{ backgroundColor: "#faad14" }}
                      onClick={removeProperty}
                    />
                  </Form.Item>
                )}
              </Col>
              {errorProp[idx].errMessage && (
                <p style={{ color: "red", fontWeight: "bold" }}>
                  {errorProp[idx].errMessage}
                </p>
              )}
              {type === "object"
                ? nestedPropState
                    .filter((arr) => arr.propNum === idx)
                    .map((val) => (
                      <Form.Item key={`Nestedprop-${val.index}`}>
                        <NestedPropInput
                          idx={idx}
                          nestedidx={val.index}
                          nestedPropState={nestedPropState}
                          errorProp={errorProp}
                          handleTypeSelectChange={handleTypeSelectChange}
                          removeNestedProperty={removeNestedProperty}
                          handleNestedPropChange={handleNestedPropChange}
                          handleNestedTypeSelectChange={
                            handleNestedTypeSelectChange
                          }
                          errorNestedProp={errorNestedProp}
                        />
                      </Form.Item>
                    ))
                : null}
            </Row>
          </Form>
        </div>
      </Content>
    </>
  );
};

export default PropInputs;
