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
      data: [],
      open: false,
      detail: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.wrapper = React.createRef();
  }
  async componentDidMount() {
    const dataOnMount = await getAllAssignments();
    this.setState({ data: dataOnMount.items });
  }

  async handleClick(id) {
    const getDetail = await getAllAssignmentsDetails(id);
    this.setState({
      open: !this.state.open,
      detail: getDetail
    });
  }

  render() {
    if (this.state.data.length > 0) {
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
              {this.state.data.map(res => (
                <div className="card-border-wrapper" key={res.id}>
                  <Card
                    hoverable
                    className="assignment"
                    ref={this.wrapper}
                    onClick={() => this.handleClick(res.id)}
                  >
                    {this.state.open ? (
                      <AssignDetail assign={this.state} />
                    ) : null}
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
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default AssignList;
