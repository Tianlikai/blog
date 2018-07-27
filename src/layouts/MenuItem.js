import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import classnames from 'classnames'
import './styles/MenuItem.scss'

export default class MenuItem extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            showSubMenu: false
        }
    }
    toggleSubMenu() {
        this.setState({
            showSubMenu: !this.state.showSubMenu
        })
    }
    render() {
        const {
            subMenus,
            showSubMenu,
            title,
            link,
            callback
        } = this.props
        return (
            <div
                className='menu-item'
                onClick={subMenus && this.toggleSubMenu}>
                {
                    !subMenus && <Link
                        className='title'
                        to={link}
                        onClick={(e) => {
                            e.stopPropagation()
                            callback && callback()
                        }}>
                        {title}
                    </Link>
                }
                {
                    subMenus && <div className='title'>
                        {title}
                    </div>
                }
                {
                    subMenus && <span className={classnames({
                        'arrow': true,
                        'arrow-downup': showSubMenu,
                        'arrow-updown': !showSubMenu
                    })}>
                        <svg class='icon' aria-hidden='true'>
                            <use xlinkHref='#icon-official-arrow' />
                        </svg>
                    </span>
                }
                {
                    showSubMenu && subMenus && subMenus.map((subMenu) => (
                        <Link
                            onClick={(e) => {
                                e.stopPropagation()
                                callback && callback()
                            }}
                            className='sub-menu'
                            key={subMenu.title}
                            to={subMenu.link}>
                            {subMenu.title}
                        </Link>
                    ))
                }
            </div>
        )
    }
}

MenuItem.PropTypes = {
    subMenus: PropTypes.array, // 子目录
    showSubMenu: PropTypes.bool, // 是否展示该目录导航
    title: PropTypes.string, // 目录名称
    link: PropTypes.string, // 点击目录 链接地址
    callback: PropTypes.func // 点击目录 回调函数
}
