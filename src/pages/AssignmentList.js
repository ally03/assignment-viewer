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
        let assignmentlist = await getAllAssignments();
        debugger;
        assignmentlist = assignmentlist.items.sort((date1, date2) => (new Date(date1.setOn) - new Date(date2.setOn)));
        this.setState({ assignmentlist });
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

    getHumanReadableDateTime(time) {
        return new Date(time).toLocaleString('en-GB', {
            day: 'numeric',
            month: 'long',
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        })
    }
    render() {
        console.log(this.state.assignmentlist);
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
                                        <h4>Start On : {this.getHumanReadableDateTime(item.setOn)}</h4>
                                        <h4>Complete On : {this.getHumanReadableDateTime(item.deadline)}</h4>
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