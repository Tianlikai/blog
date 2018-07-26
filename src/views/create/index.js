import React from 'react'
import marked from 'marked'
import './style.scss'

export default class create extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            md: 'md', // 编辑模式 富文本: f markdown：md
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
            content: marked(e.target.value)
        })
    }
    handlePublish = () => {
        const uid = G.uid
        const name = G.userName
        if (!uid || !name) {
            alert('开发中\n请前往登陆')
            return false
        }
        const {title, content, md, avator} = this.state
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
            md,
            avator
        }
        G.api.createPosts({data}).then((result) => {
            console.log(result)
        })
    }
    render() {
        return (
            <div className='create'>
                <div className='create-header'>
                    <input onChange={this.handleTitleChange} className='inp-title' type='text' placeholder='输入文章标题...' />
                    <div className='header-right'>
                        <div className='header-save'>文章将会自动保存至<span>草稿</span></div>
                        <div className='header-add-logo'>添加封面</div>
                        <div className='header-switch'>...</div>
                        <div
                            className='header-push-trigger'
                            onClick={this.handlePublish}>发布</div>
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
                            dangerouslySetInnerHTML={{__html: this.state.content}} />
                    </div>
                </div>
            </div>
        )
    }
}
