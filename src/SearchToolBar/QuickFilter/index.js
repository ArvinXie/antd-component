import React, { Component, Fragment } from 'react';
import { Radio } from 'antd';

import styles from './index.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class QuickFilter extends Component {

    constructor(props) {
        super(props);
        const { items = [] } = this.props;
        var state = {};
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            state[item.field] = item.defaultValue;
        }
        this.state = state;
        this.getValue = () => this.state;
    }


    onChange(field, value) {
        this.setState({ [field]: value }, () => {
            this.props.onChange(this.state);
        })
    }

    render() {
        const { items = [] } = this.props;
        if (items.length == 0) {
            return <Fragment></Fragment>
        }

        return <div className='quick-filter-wrap'>
            {
                items.map(({ options = [], field, label, showAll, defaultValue }, i) => <dl key={i}>
                    <dt className='title'>{label}：</dt>
                    <dd>
                        <RadioGroup onChange={e => this.onChange(field, e.target.value)} defaultValue={defaultValue} >
                            {showAll && <RadioButton key={`sub_all`} value=''>全部</RadioButton>}
                            {
                                options.map((option, j) => {
                                    var value = option;
                                    var text = option;
                                    if (typeof (option) == 'object') {
                                        value = option.value;
                                        text = option.text;
                                    }
                                    return <RadioButton key={`sub_${j}`} value={`${value}`}>{text}</RadioButton>;
                                })
                            }
                        </RadioGroup>
                    </dd>
                </dl>)
            }
        </div>

    }
}

