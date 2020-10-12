import React from 'react';

import './index.less';

export default class InputLable extends React.Component {
    static defaultProps = {
        prefixCls: 'ant-input'
    }
    render() {
        const props = this.props;
        const wrapperClassName = `${props.prefixCls}-group`;
        const addonClassName = `${wrapperClassName}-addon`;
        const addonBefore = props.addonBefore ? (<span className={addonClassName}>{props.addonBefore}</span>) : null;
        const addonAfter = props.addonAfter ? (<span className={addonClassName}>{props.addonAfter}</span>) : null;
        const className = (addonBefore || addonAfter) ? `${props.prefixCls}-wrapper ${wrapperClassName}` : `${props.prefixCls}-wrapper`;
        return (<span className={className}> {addonBefore} {this.props.children} {addonAfter} </span>);
    }
}
