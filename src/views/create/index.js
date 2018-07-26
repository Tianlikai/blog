import React from 'react'
import marked from 'marked'
import './style.scss'

export default class create extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            renderedContent: ''
        }
    }
    handleContentChange = (event) => {
        this.setState({
            renderedContent: marked(event.target.value)
        })
    }
    handlePublish = () => {
        const data = {
            uid: '',
            name: '',
            title: '',
            pv: 0,
            content: this.state.renderedContent,
            md: 'md',
            avator: ''
        }
        console.log(data)
        localStorage.setItem('md', this.state.renderedContent)
    }
    render() {
        return (
            <div className='create'>
                <div className='create-header'>
                    <input className='inp-title' type='text' placeholder='输入文章标题...' />
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
                            dangerouslySetInnerHTML={{__html: this.state.renderedContent}} />
                    </div>
                </div>
            </div>
        )
    }
}
