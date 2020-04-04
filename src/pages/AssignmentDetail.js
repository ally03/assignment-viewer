import React from "react";
import { Modal } from "antd";

class AssignDetail extends React.Component {
  render() {
    const assignInDetail = this.props.assign.detail;
    console.log(assignInDetail, "dsdgpjf");
    return (
      <div>
        <Modal
          title={assignInDetail.title}
          visible={this.props.assign.open}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {assignInDetail.details}
          <p>{assignInDetail.id}</p>
        </Modal>
      </div>
    );
  }
}

export default AssignDetail;
