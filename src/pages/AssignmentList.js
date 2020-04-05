import React from "react";
import { Card, List } from "antd";
import { getAllAssignments, getAllAssignmentsDetails } from "api";
import AssignmentDetail from "./AssignmentDetail";
import "./AssignmentList.css";

class AssignList extends React.Component {
  constructor() {
    super();
    this.state = {
      assignmentlist: [],
      status: false,
      assignmentDetail: undefined,
      isLoading: false,
      error: false,
      errorMessage: {}
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }
  async componentDidMount() {
    const response = await getAllAssignments();
    if (response.status === 200) {
      const assignmentlist = await response.json();
      this.setState({ assignmentlist: assignmentlist.items });
    } else {
      this.setState({
        error: true,
        errorMessage: {
          errorText: "There was an error in getting your assignments.",
          errorCode: response.status
        }
      });
    }
  }

  async handleClick(id) {
    const responseDetail = await getAllAssignmentsDetails(id);
    console.log("responseDetail:", responseDetail);
    if (responseDetail.status === 200) {
      const assignmentDetail = await responseDetail.json();
      this.setState({
        status: true,
        assignmentDetail
      });
    } else {
      this.setState({
        error: true,
        errorMessage: {
          errorText: "An error occurred while getting the assignment details.",
          errorCode: responseDetail.status
        }
      });
    }
  }
  handleModal() {
    this.setState({
      status: false
    });
  }

  render() {
    if (this.state.error) {
      return (
        <h1>
          {this.state.errorMessage.errorCode}{" "}
          {this.state.errorMessage.errorText}
        </h1>
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
                  className="assignment"
                  title={item.title}
                  onClick={() => this.handleClick(item.id)}
                >
                  <div className="date-wrapper">
                    <h4>Start On : {item.setOn}</h4>
                    <h4>Complete On : {item.deadline}</h4>
                  </div>
                </Card>
              </List.Item>
            )}
          />
          ,
          {this.state.status ? (
            <AssignmentDetail
              assignmentDetail={this.state.assignmentDetail}
              status={this.state.status}
              hideModal={this.handleModal}
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
