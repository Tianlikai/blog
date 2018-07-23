import React from 'react'
import history from '../../util/history'
import './styles.scss'

export default class Introduction extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            data: [1, 2, 3, 4, 5, 6]
        }
    }
    redirectToDetail = (id) => {
        history.push(`/detail/${id}`)
    }
    renderTeamCard = (card, i) => {
        // let {key, title, context, name} = card
        return <div key={i} className='article-card'>
            <a onClick={this.redirectToDetail.bind(null, i)} className='article-logo-container' href='javascript:void(0)'>
                <img className='article-logo' src={require('./images/me.png')} alt='loading' />
            </a>
            <div className='article-title'>
                <a onClick={this.redirectToDetail.bind(null, i)}>Protobuf 作者不建议在 Deno 中使用 Protobuf.</a>
            </div>
            <div className='article-content'>两年前刚接触移动端开发，刚开始比较疑惑，每次遇到问题都是到社区里提问或者吸取前辈的经验分享，感谢热衷于分享的开发者为前端社区带来欣欣向上的生命力.</div>
            <div className='article-footer'>
                <span className='footer-like'><i />8 - 赞</span>
                <span className='footer-viewed'><i />20 - 看过</span>
                <span className='footer-author'>jason</span>
                <span className='footer-time'>2018-06-28</span>
            </div>
        </div>
    }
    render() {
        const {data} = this.state
        let {isShow} = this.props
        let classIntro = 'article'
        if (!isShow) classIntro += ' ' + 'none'
        return (
            <div className={classIntro}>
                {/* <div className='introduct-header'></div> */}
                <div className='article—list-title'>---</div>
                {data.map(this.renderTeamCard)}
                <div className='pager'>more</div>
            </div>
        )
    }
}
