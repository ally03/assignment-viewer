import React from "react";
import "./assignmentlist.css";
import "antd/dist/antd.css";
import { Card, PageHeader } from "antd";
import { getAllAssignments, getAllAssignmentsDetails } from "api";
import AssignDetail from "./AssignmentDetail";

class AssignList extends React.Component {
  constructor() {
    super();
    this.state = {
      assignmentlist: [],
      status: false,
      assignmentDetail: undefined
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }
  async componentDidMount() {
    const assignmentlist = await getAllAssignments();
    this.setState({ assignmentlist: assignmentlist.items });
  }

  async handleClick(id) {
    const assignmentDetail = await getAllAssignmentsDetails(id);
    this.setState({
      status: true,
      assignmentDetail
    });
  }

  handleModal() {
    this.setState({
      status: false
    });
  }

  render() {
    if (this.state.assignmentlist.length > 0) {
      return (
        <div>
          <PageHeader
            className="site-page-header"
            ghost={false}
            title="Loin Heart Acedemy"
          />
          <div className="site-card-border-less-wrapper">
            <h2>Assignment list</h2>
            <div className="Card-list-wrapper">
              {this.state.assignmentlist.map(res => (
                <div className="card-border-wrapper" key={res.id}>
                  <Card
                    hoverable
                    className="assignment"
                    onClick={() => this.handleClick(res.id)}
                  >
                    <h3>
                      {res.title} id: {res.id}
                    </h3>
                    <div className="date-wrapper">
                      <h4>Start On : {res.setOn}</h4>
                      <h4>Complete On : {res.deadline}</h4>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
            {this.state.status ? (
              <AssignDetail
                assignmentDetail={this.state.assignmentDetail}
                status={this.state.status}
                hideModal={this.handleModal}
              />
            ) : null}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default AssignList;
