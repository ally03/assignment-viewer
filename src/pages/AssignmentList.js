import React from "react";
import { Card, Col, Row } from "antd";
import "./assignmentlist.css";
import "antd/dist/antd.css";

class AssignList extends React.Component {
  render() {
    return (
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="S1 Retrieval Practice" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AssignList;
