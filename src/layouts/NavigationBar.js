import React from 'react'
import {Link} from 'react-router-dom'
import classnames from 'classnames'
import SideMenu from './SideMenu'
import './styles/NavigationBar.scss'

export default class NavigationBar extends React.PureComponent {
    render() {
        const {path} = this.props
        return (
            <div ref='navigator' className={classnames({
                'navigation-bar': true,
                'navigation-bar-show': !this.props.transparent
            })}>
                <div className='burger-btn'>
                    <SideMenu />
                </div>
                <div className='navigator-max'>
                    <div className='menu'>
                        <Link
                            to='/'
                            className={classnames({'menu-active': path === '/'})}
                            onClick={() => {
                                if (document.getElementsByClassName('home')) {
                                    document.getElementsByClassName('home').animate({
                                        scrollTop: 0
                                    }, 500)
                                }
                            }}>
                                首页
                            {/* <div className='menu-active-tag' /> */}
                        </Link>
                    </div>
                    <div className='menu'>
                        <Link
                            to='/editor/new'
                            className={classnames({'menu-active': path === '/editor/new'})}
                            onClick={() => {
                                if (document.getElementsByClassName('editor')) {
                                    document.getElementsByClassName('editor').animate({
                                        scrollTop: 0
                                    }, 500)
                                }
                            }}>
                                写文章
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
