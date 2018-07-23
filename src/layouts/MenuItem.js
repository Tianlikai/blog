import React from 'react'
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
        this.setState({showSubMenu: !this.state.showSubMenu})
    }
    render() {
        const submenus = this.props.submenus
        return (
            <div className='menu-item' onClick={submenus && this.toggleSubMenu}>
                {!submenus && <Link className='title' to={this.props.link} onClick={(e) => {
                    e.stopPropagation()
                    this.props.callback && this.props.callback()
                }}>{this.props.title}</Link>}
                {submenus && <div className='title'>{this.props.title}</div>}
                {this.props.submenus && <span className={classnames({
                    'arrow': true,
                    'arrow-downup': this.state.showSubMenu,
                    'arrow-updown': !this.state.showSubMenu
                })}>
                    <svg class='icon' aria-hidden='true'>
                        <use xlinkHref='#icon-official-arrow' />
                    </svg>
                </span>}
                {this.state.showSubMenu && submenus && submenus.map((submenu) => (
                    <Link onClick={(e) => {
                        e.stopPropagation()
                        this.props.callback && this.props.callback()
                    }} className='sub-menu' key={submenu.title} to={submenu.link}>{submenu.title}</Link>
                ))}
            </div>
        )
    }
}
