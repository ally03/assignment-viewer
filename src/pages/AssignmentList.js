import React from "react";
import { Card, List } from "antd";
import { getAllAssignments } from "api";
import "./AssignmentList.css";

class AssignList extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }
    async componentDidMount() {
        const dataOnMount = await getAllAssignments();
        this.setState({ data: dataOnMount.items });
    }

    render() {
        if (this.state.data.length > 0) {
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
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item>
                                <Card className='assignment'>
                                    <div className="date-wrapper">
                                        <h4>Start On : {item.setOn}</h4>
                                        <h4>Complete On : {item.deadline}</h4>
                                    </div></Card>
                            </List.Item>
                        )}
                    />,
                </div >
            );
        } else {
            return null;
        }
    }
}

export default AssignList;