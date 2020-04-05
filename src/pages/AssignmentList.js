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
            isLoading: false
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
                    <h2>Assignment list</h2>
                    <List style={{ 'padding': '10px' }}
                        grid={{
                            gutter: 10,
                            xs: 1,
                            sm: 1,
                            md: 2,
                            lg: 3,
                            xl: 3,
                            xxl: 3,
                        }}
                        dataSource={this.state.assignmentlist}
                        renderItem={item => (
                            <List.Item>
                                <Card className='assignment' onClick={() => this.handleClick(item.id)}>
                                    <div className="date-wrapper">
                                        <h4>Start On : {item.setOn}</h4>
                                        <h4>Complete On : {item.deadline}</h4>
                                    </div></Card>
                            </List.Item>
                        )}
                    />,
                    {this.state.status ? (
                        <AssignmentDetail assignmentDetail={this.state.assignmentDetail}
                            status={this.state.status}
                            hideModal={this.handleModal}
                        />
                    ) : null}
                </div >
            );
        } else {
            return null;
        }
    }
}

export default AssignList;