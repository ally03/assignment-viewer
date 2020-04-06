import React from "react";
import { Modal, Button, Alert } from "antd";

class AssignmentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.status,
            complete: {}
        };
        this.handleComplete = this.handleComplete.bind(this);
    }
    handleComplete() {
        this.setState({
            complete: {
                assignComplete: true,
                completeId: this.props.assignmentDetail.id
            }
        });
    }
    assignComplete() {
           return this.state.complete.assignComplete ? "Completed" : "Incomplete"; 
    }
    assignDetails() {
        if (this.props.assignmentDetailError !== undefined) {
            return (
                <div className='errorBox'>
                    <Alert
                        message={this.props.assignmentDetailError.errorCode}
                        description={this.props.assignmentDetailError.errorMsg}
                        type="error"
                        showIcon
                    />
                </div>
            )
        } else {
            const removePtag = this.props.assignmentDetail.details.replace(/<[^>]+>/g, "");
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
                        <p>School Name: {this.props.assignmentDetail.groups[0].school.name}</p>
                    </div>
                </div>
            )
        }
    }
    render() {
        return (
            <div>
                <Modal
                    title={this.props.assignmentDetail && this.props.assignmentDetail.title}
                    visible={this.state.visible}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleComplete}>{this.assignComplete()}
                        </Button>,
                        <Button key="Close" onClick={this.props.hideModal}>Close</Button>
                    ]}
                >
                    {this.assignDetails()}
                </Modal>
            </div>
        );
    }
}

export default AssignmentDetail;
