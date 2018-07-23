import React from 'react'
import './styles/container.scss'

export default class Container extends React.PureComponent {
    render() {
        return (
            <div className='container'>
                {this.props.children}
            </div>
        )
    }
}
