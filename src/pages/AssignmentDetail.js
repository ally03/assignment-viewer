import React from "react";
import { Modal, Button } from "antd";

class AssignmentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.status,
      complete: false,
      completeId: ""
    };
    this.handleComplete = this.handleComplete.bind(this);
  }
  handleComplete() {
    this.setState({
      complete: true,
      completeId: this.props.assignmentDetail.id
    });
  }
  assignComplete() {
    if (this.state.complete === true) {
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
          visible={this.state.visible}
          footer={[
            <Button key="submit" type="primary" onClick={this.handleComplete}>
              {this.assignComplete()}
            </Button>,
            <Button key="Close" onClick={this.props.hideModal}>
              Close
            </Button>
          ]}
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

export default AssignmentDetail;
