import React, { Component } from 'react';
import { Modal } from 'antd';

export default class GlobalModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
        this.show = (data) => { this.data = data; this.setState({ visible: true }) };
        this.hide = () => this.setState({ visible: false });

    }
    onCancel() {
        const { onCancel = e => { }, } = this.props || {};
        this.setState({ visible: false })
        onCancel();
    }
    render() {
        const modalProps = { width: 800, footer: '', title: '', maskClosable: false, bodyStyle: { padding: 0 }, ...this.props };
        return <Modal visible={this.state.visible} {...modalProps} onCancel={e => this.onCancel()}  >
            {this.state.visible && this.props.children}
        </Modal>
    }
}