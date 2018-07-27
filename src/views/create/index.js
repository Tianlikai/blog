import React from 'react'
import marked from 'marked'
import Upload from './upload'
import iconImg from './svg-img.svg'
import iconImgActive from './svg-imgActive.svg'
import './style.scss'

export default class Create extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            uploadIsShow: true,
            title: '',
            content: '',
            mdContent: '',
            mdType: 'md', // 编辑模式 富文本: f markdown：md
            avator: '' // 文章封面
        }
    }
    handleTitleChange = (e) => {
        e.stopPropagation()
        this.setState({
            title: e.target.value
        })
    }
    handleContentChange = (e) => {
        e.stopPropagation()
        this.setState({
            content: marked(e.target.value),
            mdContent: e.target.value
        })
    }
    handleShowUpload = () => {
        // this.setState({
        //     uploadIsShow: !this.state.uploadIsShow
        // })
    }
    handlePublish = () => {
        const uid = G.uid
        const name = G.userName
        if (!uid || !name) {
            alert('开发中\n请前往登陆')
            return false
        }
        const {title, content, mdContent, mdType, avator} = this.state
        if (!title) {
            alert('开发中\n请输入标题')
            return false
        }
        if (!content) {
            alert('开发中\n请输入内容')
            return false
        }
        const data = {
            pv: 0,
            title,
            content,
            mdContent,
            mdType,
            avator
        }
        G.api.createPosts({data}).then((result) => {
            console.log(result)
        })
    }
    render() {
        const {uploadIsShow, avator} = this.state
        const src = avator ? iconImgActive : iconImg
        return (
            <div className='create'>
                <div className='create-header'>
                    <input
                        className='inp-title'
                        type='text'
                        placeholder='输入文章标题...'
                        onChange={this.handleTitleChange}
                    />
                    <div className='header-right'>
                        <div className='header-save'>
                            文章将会自动保存至
                            <span>草稿</span>
                        </div>
                        <div
                            className='header-add-logo'
                            onClick={this.handleShowUpload}
                        >
                            <img src={src} />
                            {
                                uploadIsShow && <Upload />
                            }
                        </div>
                        <div className='header-switch'>
                            ...
                        </div>
                        <div
                            className='header-push-trigger'
                            onClick={this.handlePublish}>
                            发布
                        </div>
                        <div className='header-logo' />
                    </div>
                </div>
                <div className='create-content'>
                    <div className='write'>
                        <textarea onChange={this.handleContentChange.bind(this)} />
                    </div>
                    <div className='view'>
                        <div
                            className='markdown-rendered-content'
                            dangerouslySetInnerHTML={{__html: this.state.content}}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

