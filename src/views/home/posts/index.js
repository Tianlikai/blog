import React from 'react'
import PropTypes from 'prop-types'
import history from '../../../util/history'
import PostsCard from './postsCard'
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
                    data && data.map(card => <PostsCard
                        key={card.id}
                        id={card.id}
                        title={card.title}
                        name={card.name}
                        md={card.md}
                        mdType={card.mdType}
                        like={card.like}
                        comments={card.comments}
                        avator={card.avator}
                        redirectToDetail={this.redirectToDetail}
                    />)
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

Posts.propTypes = {
    isShow: PropTypes.bool // 是否展示banner
}
