import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import events from '../../../util/events'
import trash from './deImg.svg'
import './style.scss'

class ImgWithDel extends React.PureComponent {
    handleDelLogo = (e) => {
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
        this.props.delLog && this.props.delLog()
    }
    render() {
        const style = {position: 'relative'}
        return (
            <div
                style={style}>
                <img
                    className='inp-file-img'
                    src={this.props.value} />
                <img
                    src={trash}
                    className='inp-file-del'
                    onClick={this.handleDelLogo} />
            </div>
        )
    }
}

export default class Upload extends React.PureComponent {
    componentDidMount(nextProps) {
        if (!this.props.uploadIsShow) {
            events.addEventsToDocument(this.getDocumentEvents())
        }
    }
    componentWillUnmount() {
        if (this.props.uploadIsShow) {
            events.removeEventsFromDocument(this.getDocumentEvents())
        }
    }
    getDocumentEvents = () => ({
        click: this.handleDocumentClick,
        touchend: this.handleDocumentClick
    })
    handleDocumentClick = (event) => {
        if (this.props.uploadIsShow && !events.targetIsDescendant(event, ReactDOM.findDOMNode(this))) {
            this.props.handleShowUpload && this.props.handleShowUpload()
        }
    }
    handleClearValue = () => {
        this.props.handleAvatorChange && this.props.handleAvatorChange('')
    }
    handleUpload = () => {
        let self = this
        if (this.inp.files && this.inp.files.length > 0) {
            const file = this.inp.files[0]
            if (!/image/g.test(file.type)) {
                console.log('请上传图片')
            } else if (file.size >= 1024 * 1024 / 2) {
                console.log('请上传小于512kb的图片')
            } else {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = function(e) {
                    self.props.handleAvatorChange && self.props.handleAvatorChange(e.target.result)
                }
            }
        }
    }
    handleStopEventBubbling = (e) => {
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
    }
    render() {
        const {uploadIsShow, avator} = this.props
        const cnUpload = classnames('upload', {
            'none': !uploadIsShow
        })
        return (
            <div
                className={cnUpload}
                onClick={this.handleStopEventBubbling}>
                <div className='upload-hint'>添加封面大图</div>
                {
                    avator ? <ImgWithDel delLog={this.handleClearValue} value={avator} /> : <label htmlFor='inp-file'>
                        <div className='upload-label'>
                            点击此处添加图片
                        </div>
                    </label>
                }
                <input
                    ref={inp => { this.inp = inp }}
                    id='inp-file'
                    className='upload-inp'
                    type='file'
                    placeholder='点击此处添加图片'
                    onChange={this.handleUpload} />
            </div>
        )
    }
}

Upload.propTypes = {
    uploadIsShow: PropTypes.bool, // 是否显示上传模块
    avator: PropTypes.string, // 预览图片dataUrl
    handleShowUpload: PropTypes.func, // 回调函数 变更state: uploadIsShow
    handleAvatorChange: PropTypes.func // 回调函数 变更state: avator
}
