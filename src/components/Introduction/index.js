import React from 'react'
import history from '../../util/history'
import './styles.scss'

export default class Introduction extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        G.api.getPosts({urlParams: {page: 1}}).then((result) => {
            this.setState({
                data: result.data.postList
            })
        })
    }
    redirectToDetail = (id) => {
        history.push(`/detail/${id}`)
    }
    renderTeamCard = (card, i) => {
        const {id, title, name, md, moment, pv, like} = card
        let content = card.content.length > 20 ? card.content.substring(0, 20) + '...' : card.content
        const reg = /<[^>]+>/gim
        content = content.replace(reg, '')
        return <div key={id} className='article-card'>
            <a onClick={this.redirectToDetail.bind(null, id, md)} className='article-logo-container' href='javascript:void(0)'>
                <img className='article-logo' src={require('./images/me.png')} alt='loading' />
            </a>
            <div className='article-title'>
                <a onClick={this.redirectToDetail.bind(null, id, md)}>{title}</a>
            </div>
            <div className='article-content'>
                {content}
            </div>
            <div className='article-footer'>
                <span className='footer-like'><i />赞 - {like}</span>
                <span className='footer-viewed'><i />看过 - {pv}</span>
                <span className='footer-author'>{name}</span>
                <span className='footer-time'>{moment}</span>
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
                {data && data.map(this.renderTeamCard)}
                {data && data.length > 0 && <div className='pager'>more</div>}
            </div>
        )
    }
}
