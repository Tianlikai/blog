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
                <svg class='icon' aria-hidden='true' >
                    <path d='M3.5 5h16a1.5 1.5 0 0 1 0 3h-16a1.5 1.5 0 0 1 0-3zm0 6h16a1.5 1.5 0 0 1 0 3h-16a1.5 1.5 0 0 1 0-3zm0 6h16a1.5 1.5 0 0 1 0 3h-16a1.5 1.5 0 0 1 0-3z' />
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
                            <path d='M13.486 12l5.208-5.207a1.048 1.048 0 0 0-.006-1.483 1.046 1.046 0 0 0-1.482-.005L12 10.514 6.793 5.305a1.048 1.048 0 0 0-1.483.005 1.046 1.046 0 0 0-.005 1.483L10.514 12l-5.208 5.207a1.048 1.048 0 0 0 .006 1.483 1.046 1.046 0 0 0 1.482.005L12 13.486l5.207 5.208a1.048 1.048 0 0 0 1.483-.006 1.046 1.046 0 0 0 .005-1.482L13.486 12z' />
                        </svg>
                    </div>
                    <div className='side-menu-items'>
                        <MenuItem title='首页' link='/' callback={this.hideMenu.bind(this)} />
                    </div>
                    <Link to='/trial' className='side-menu-apply' onClick={(e) => { e.stopPropagation(); this.hideMenu() }}>申请试用</Link>
                </div>
            </div>
        )
    }
}
