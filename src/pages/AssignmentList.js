import React from "react";
import { Card, List, Alert } from "antd";
import { getAllAssignments, getAllAssignmentsDetails } from "api";
import AssignmentDetail from "./AssignmentDetail";
import "./AssignmentList.less";
import { CheckCircleOutlined, CloseCircleFilled } from "@ant-design/icons";

class AssignList extends React.Component {
  constructor() {
    super();
    this.state = {
      assignmentlist: [],
      status: false,
      assignmentDetail: undefined,
      isLoading: false,
      error: false,
      errorMessage: {},
      assignmentListError: undefined,
      assignmentDetailError: undefined,
      isComplete: {}
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }
  async componentDidMount() {
    const response = await getAllAssignments();
    if (response.status === 200) {
      const assignmentlist = await response.json();
      this.setState({
        assignmentlist: assignmentlist.items,
        assignmentListError: undefined
      });
    } else {
      this.setState({
        assignmentListError: {
          errorCode: response.status,
          errorMsg:
            "Sorry, there was an error in getting assignments at this moment"
        }
      });
    }
  }

  async handleClick(id) {
    const responseDetail = await getAllAssignmentsDetails(id);
    if (responseDetail.status === 200) {
      const assignmentDetail = await responseDetail.json();
      this.setState({
        status: true,
        assignmentDetail,
        assignmentDetailError: undefined
      });
    } else {
      this.setState({
        status: true,
        assignmentDetailError: {
          errorCode: responseDetail.status,
          errorMsg:
            "Sorry, there was an error in getting assignment details at this moment."
        }
      });
    }
  }
  handleModal() {
    this.setState({
      status: false
    });
  }
  handleComplete(id) {
    console.log("typeof", typeof this.state.isComplete[id] === "boolean");
    if (typeof this.state.isComplete[id] === "boolean") {
      this.setState({
        isComplete: {
          ...this.state.isComplete,
          [id]: !this.state.isComplete[id]
        }
      });
    } else {
      this.setState({ isComplete: { ...this.state.isComplete, [id]: true } });
    }
  }

  render() {
    if (this.state.assignmentListError) {
      return (
        <div className="errorBox">
          <Alert
            message={this.state.assignmentListError.errorCode}
            description={this.state.assignmentListError.errorMsg}
            type="error"
            showIcon
          />
        </div>
      );
    }
    if (this.state.assignmentlist.length > 0) {
      return (
        <div>
          <h2>Assignment list</h2>;
          <List
            style={{ padding: "10px" }}
            grid={{
              gutter: 10,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 3,
              xl: 3,
              xxl: 3
            }}
            dataSource={this.state.assignmentlist}
            renderItem={item => (
              <List.Item>
                <Card
                  hoverable
                  className="assignment"
                  title={item.title}
                  onClick={() => this.handleClick(item.id)}
                >
                  <div className={"date-wrapper"}>
                    <div>
                      <h4>Start On : {item.setOn}</h4>
                      <h4>Complete On : {item.deadline}</h4>
                    </div>
                    <div>
                      {this.state.isComplete[item.id] ? (
                        <div className="icon-wrapper">
                          <p>Completed</p>
                          <CheckCircleOutlined style={{ padding: "5px" }} />
                        </div>
                      ) : (
                        <div className="icon-wrapper" style={{ color: "red" }}>
                          <p>Incomplete</p>
                          <CloseCircleFilled style={{ padding: "5px" }} />
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </List.Item>
            )}
          />
          ,
          {this.state.status ? (
            <AssignmentDetail
              assignmentDetailError={this.state.assignmentDetailError}
              assignmentDetail={this.state.assignmentDetail}
              status={this.state.status}
              hideModal={this.handleModal}
              completeAction={this.handleComplete}
              isComplete={this.state.isComplete[this.state.assignmentDetail.id]}
            />
          ) : null}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default AssignList;

// this.state.isComplete[this.state.assignmentDetail.id] || false
