import React from "react";
import { Modal } from "antd";

class AssignDetail extends React.Component {
  assignComplete() {
    if (this.props.assignmentDetail.details.isComplete === true) {
      return "Completed";
    } else {
      return "InComplete";
    }
  }
  render() {
    const assignInDetail = this.props.assignmentDetail;
    const removePtag = assignInDetail.details.replace(/<[^>]+>/g, "");
    return (
      <div>
        <Modal
          title={assignInDetail.title}
          visible={this.props.status}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText={this.assignComplete()}
        >
          <p>Assignment Detail: {removePtag}</p>
          <div>
            <p>Start On : {assignInDetail.setOn}</p>
            <p>Complete On : {assignInDetail.deadline}</p>
          </div>
          <div>
            <h4>Given By</h4>
            <p>
              First Name : {assignInDetail.setBy.title}{" "}
              {assignInDetail.setBy.firstName}
            </p>
            <p>Last Name : {assignInDetail.setBy.lastName}</p>
            <p>Last Name : {assignInDetail.setBy.email}</p>
            <p>School Name: {assignInDetail.groups[0].school.name}</p>
          </div>
        </Modal>
      </div>
    );
  }
}

export default AssignDetail;
