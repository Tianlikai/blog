import React from 'react'
import {Link} from 'react-router-dom'
import classnames from 'classnames'
import MenuItem from './MenuItem'
import './styles/SideMenu.scss'

export default class SideMenu extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            showMenu: false
        }
    }
    showMenu() {
        this.setState({showMenu: true})
    }
    hideMenu() {
        this.setState({showMenu: false})
    }
    render() {
        return (
            <div className='side-menu' onClick={this.showMenu.bind(this)}>
                <svg class='icon' aria-hidden='true'>
                    <use xlinkHref='#icon-official-burger' />
                </svg>
                {this.state.showMenu && <div className='side-menu-blur' onClick={(e) => { e.stopPropagation(); this.hideMenu() }} />}
                <div className={classnames({
                    'side-menu-content': true,
                    'side-menu-hide': !this.state.showMenu,
                    'side-menu-show': this.state.showMenu
                })}>
                    <div className='side-menu-close' onClick={(e) => {
                        e.stopPropagation()
                        this.hideMenu()
                    }}>
                        <svg class='icon' aria-hidden='true'>
                            <use xlinkHref='#icon-official-close-o' />
                        </svg>
                    </div>
                    <div className='side-menu-items'>
                        <MenuItem title='--' link='/' callback={this.hideMenu.bind(this)} />
                    </div>
                    <Link to='/trial' className='side-menu-apply' onClick={(e) => { e.stopPropagation(); this.hideMenu() }}>申请试用</Link>
                </div>
            </div>
        )
    }
}
