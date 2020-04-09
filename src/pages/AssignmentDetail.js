import React from "react";
import { Modal, Button, Alert } from "antd";

class AssignmentDetail extends React.Component {
  assignDetails() {
    if (this.props.assignmentDetailError !== undefined) {
      return (
        <div className="errorBox">
          <Alert
            message={this.props.assignmentDetailError.errorCode}
            description={this.props.assignmentDetailError.errorMsg}
            type="error"
            showIcon
          />
        </div>
      );
    } else {
      const removePtag = this.props.assignmentDetail.details.replace(
        /<[^>]+>/g,
        ""
      );
      return (
        <div>
          <p>Assignment Detail: {removePtag}</p>
          <div>
            <p>Start On : {this.props.assignmentDetail.setOn}</p>
            <p>Complete On : {this.props.assignmentDetail.deadline}</p>
          </div>
          <div>
            <h4>Given By</h4>
            <p>
              First Name : {this.props.assignmentDetail.setBy.title}{" "}
              {this.props.assignmentDetail.setBy.firstName}
            </p>
            <p>Last Name : {this.props.assignmentDetail.setBy.lastName}</p>
            <p>Last Name : {this.props.assignmentDetail.setBy.email}</p>
            <p>
              School Name: {this.props.assignmentDetail.groups[0].school.name}
            </p>
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        <Modal
          title={
            this.props.assignmentDetail && this.props.assignmentDetail.title
          }
          closable={false}
          visible={this.props.status}
          footer={[
            <Button
              key="submit"
              type={this.props.isComplete ? "primary" : "danger"}
              onClick={() =>
                this.props.completeAction(this.props.assignmentDetail.id)
              }
            >
              {this.props.isComplete ? "Complete" : "Incomplete"}
            </Button>,
            <Button key="Close" onClick={this.props.hideModal}>
              Close
            </Button>
          ]}
        >
          {this.assignDetails()}
        </Modal>
      </div>
    );
  }
}

export default AssignmentDetail;
