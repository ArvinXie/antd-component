import React from 'react';
import classNames from 'classnames';

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

        const className = classNames({
            [`${props.prefixCls}-wrapper`]: true,
            [wrapperClassName]: (addonBefore || addonAfter),
        });

        return (<span className={className}> {addonBefore} {this.props.children} {addonAfter} </span>);
    }
}
