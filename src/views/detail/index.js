import React from 'react'
import marked from 'marked'
import NavigationBar from '../../layouts/NavigationBar'
import './style.scss'

export default class Detail extends React.PureComponent {
    constructor(props) {
        super(props)
        const md = localStorage.getItem('md')
        this.state = {
            renderedContent: marked(md)
        }
    }
    render() {
        return (
            <div className='detail'>
                <NavigationBar path='/detail' />
                <div className='container'>
                    <div
                        className='markdown-rendered-content'
                        dangerouslySetInnerHTML={{__html: this.state.renderedContent}} />
                </div>
            </div>
        )
    }
}
