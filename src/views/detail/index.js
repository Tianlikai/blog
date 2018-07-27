import React from 'react'
import marked from 'marked'
import NavigationBar from '../../layouts/NavigationBar'
import './style.scss'

export default class Detail extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            avator: '',
            like: '',
            mdType: '',
            pv: ''
        }
    }
    componentDidMount() {
        const urlArr = window.location.hash.split('/')
        const postId = urlArr[(urlArr.length - 1)]
        G.api.getPostsDetail({urlParams: {postId}}).then((result) => {
            const {title, content, avator, like, mdType, pv} = result
            this.setState({
                content: marked(content),
                title,
                avator,
                like,
                mdType,
                pv
            })
        })
    }
    render() {
        return (
            <div className='detail'>
                <NavigationBar path='/detail' />
                <div className='container'>
                    <div
                        className='markdown-rendered-content'
                        dangerouslySetInnerHTML={{__html: this.state.content}} />
                </div>
            </div>
        )
    }
}
