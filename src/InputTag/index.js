import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { arryUtil } from '@/utils'
import './index.less';

export default class EditableTagGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = { tags: props.value || [], inputValue: '', editIndex: -1, }
    }

    triggerChange(e) {
        const { onChange = () => { } } = this.props;
        onChange(e);
    }

    updateTag(index, tag) {
        let { tags, inputValue } = this.state;
        const tagsNew = [...tags.slice(0, index), inputValue, ...tags.slice(index + 1)]
        this.setState({ tags: tagsNew, editIndex: -1, inputValue: '', });
        this.triggerChange(tagsNew);
    }
    addTag() {
        let { tags, inputValue } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        this.setState({ tags, editIndex: -1, inputValue: '', });
        this.triggerChange(tags);
    }
    removeTag(index) {
        const tags = arryUtil.delete(this.state.tags, index);
        this.setState({ tags });
        this.triggerChange(tags);
    };

    showInput(editIndex, inputValue) {
        this.setState({ editIndex, inputValue }, () => this.input.focus());
    }

    renderTag(tag, index) {
        const { editIndex, inputValue } = this.state;
        if (editIndex === index) {
            return <div className='edit-tag'>
                <Input ref={e => this.input = e}
                    key={tag}
                    size='small'
                    className='tag-input'
                    value={inputValue}
                    onChange={e => this.setState({ inputValue: e.target.value })}
                    onBlur={e => this.updateTag(index, inputValue)}
                    onPressEnter={e => this.updateTag(index, inputValue)} />
            </div>
        }
        const isLongTag = tag.length > 20;
        const tagElem = <Tag className='edit-tag' key={tag} closable onClose={e => this.removeTag(index)}                        >
            <span onDoubleClick={e => this.showInput(index, tag)} >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
        </Tag>
        return isLongTag ? <Tooltip title={tag} key={tag}> {tagElem}  </Tooltip> : tagElem;
    }


    render() {
        const { addButtnText = '添加标签' } = this.props;
        const { tags, inputValue, editIndex } = this.state;
        const tagCount = tags.length;
 
        return <div className='input-tag'>
            {tags.map((tag, index) => this.renderTag(tag, index))}

            {tagCount == editIndex && (
                <div className='edit-tag'>
                    <Input ref={e => this.input = e}
                        type='text'
                        size='small'
                        className='tag-input'
                        value={inputValue}
                        onChange={e => this.setState({ inputValue: e.target.value })}
                        onBlur={e => this.addTag()}
                        onPressEnter={e => this.addTag()} />
                </div>
            )}
            {tagCount != editIndex && <Tag className='site-tag-plus' onClick={e => this.showInput(tagCount)}><PlusOutlined />{addButtnText}</Tag>}
        </div>

    }
}