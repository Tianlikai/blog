import React from 'react'
import PropTypes from 'prop-types'
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

Container.propTypes = {
    children: PropTypes.element
}
