import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GlobalModal from './Modal';
var globalModal;

import './index.less'

export default {
    show: (props) => {
        const { rootId = 'root', containerId = 'modalWrap', } = props || {};
        var container = document.getElementById(containerId);
        if (container == null) {
            container = document.createElement('div');
            container.id = containerId;
            document.getElementById(rootId).appendChild(container);
        }
        const modal = <GlobalModal ref={e => globalModal = e} {...props} >{props.content}</GlobalModal>
        ReactDOM.render(modal, container);
        globalModal.show();
    },
    hide: () => globalModal.hide(),
    Modal: GlobalModal
}

