import React from 'react'
import PropTypes from 'prop-types'
import history from '../../../util/history'
import './styles.scss'

export default class Posts extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        G.api.getPosts({urlParams: {page: 1}})
            .then((result) => {
                this.setState({
                    data: result.postList
                })
            })
    }
    redirectToDetail = (id) => {
        history.push(`/detail/${id}`)
    }
    renderTeamCard = (card, i) => {
        const {
            id,
            title,
            name,
            mdType,
            like,
            comments
        } = card
        let md = card.md.length > 130 ? card.md.substring(0, 130) + '...' : card.md
        return <div
            className='article-card'
            key={id}>
            <a
                className='article-logo-container'
                href='javascript:void(0)'
                onClick={this.redirectToDetail.bind(null, id, mdType)}>
                <img
                    className='article-logo'
                    src={require('./images/me.png')}
                    alt='loading'
                />
            </a>
            <div className='article-title'>
                <a onClick={this.redirectToDetail.bind(null, id, mdType)}>
                    {title}
                </a>
            </div>
            <div className='article-content'>
                {md}
            </div>
            <div className='article-footer'>
                <span className='footer-author'>
                    {name}
                </span>
                <span className='footer-comment'>
                    <svg className='svg-comment' viewBox='0 0 24 24'>
                        <path fillRule='evenodd' d='M10.241 19.313a.97.97 0 0 0-.77.2 7.908 7.908 0 0 1-3.772 1.482.409.409 0 0 1-.38-.637 5.825 5.825 0 0 0 1.11-2.237.605.605 0 0 0-.227-.59A7.935 7.935 0 0 1 3 11.25C3 6.7 7.03 3 12 3s9 3.7 9 8.25-4.373 9.108-10.759 8.063z' />
                    </svg>
                    {`${comments} 条评论`}
                </span>
                <span className='footer-like'>
                    <svg className='svg-like' viewBox='0 0 24 24'>
                        <path fillRule='evenodd' d='M2 8.437C2 5.505 4.294 3.094 7.207 3 9.243 3 11.092 4.19 12 6c.823-1.758 2.649-3 4.651-3C19.545 3 22 5.507 22 8.432 22 16.24 13.842 21 12 21 10.158 21 2 16.24 2 8.437z' />
                    </svg>
                    {like}
                </span>
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
                {
                    data && data.map(this.renderTeamCard)
                }
                {
                    data && data.length > 0 && <div className='pager'>
                        more
                    </div>
                }
            </div>
        )
    }
}

Posts.PropTypes = {
    isShow: PropTypes.bool // 是否展示banner
}
