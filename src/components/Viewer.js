import React, { Component } from 'react'
import { withNamespaces } from 'react-i18next'
import { 
    randomIIIFimages, 
    getRandomInt
    } from '../store/actions'
import '../assets/css/index.scss'

const imageIndex = getRandomInt(0, randomIIIFimages.length - 1)
const mediaURL = randomIIIFimages[imageIndex]

console.log(imageIndex, mediaURL)

class Viewer extends Component {

    // constructor(props) {
    //     super(props);
    //     //this.handleMouseMove = this.debounce(this.handleMouseMove,1000);
    // }

    state = {
        backgroundImage: `url(${mediaURL})`,
        backgroundPosition: '0% 0%',
        backgroundSize: 'cover',
        backgroundRepeat: `no-repeat`,
        clicked: false
      }


    debounce = (func, delay) => {
        let inDebounce
        return function() {
            const context = this
            const args = arguments
            clearTimeout(inDebounce)
            inDebounce = setTimeout(() => func.apply(context, args), delay)
        }
    }

    handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect()
        const x = (e.pageX - left) / width * 100
        const y = (e.pageY - top) / height * 100
        if(!this.state.clicked) {
            this.setState({
                backgroundPosition: `${x}% ${y}%`,
                backgroundSize: 'auto'
            })
        }
        
    }

    handleMouseLeave = (e) => {
        if(!this.state.clicked) {
            this.setState({ 
                backgroundSize: 'cover',
                backgroundPosition: '0% 0%'
            })
        }
    }

    handleClick = () => {
        this.setState(prevState => {
            return {
                clicked: !prevState.clicked
            }
        }, () => {
            if(this.state.clicked) {
                console.log('click')
            }
        })
    }

    render() {
        return (
            <div 
                className="viewer"
                onMouseMove={this.handleMouseMove}
                onMouseLeave={this.handleMouseLeave}
                onClick={() => this.handleClick(this.state.clicked)}
                style={this.state}>
                {this.props.t("viewer.title")}
            </div>
        )
    }
}

export default withNamespaces()(Viewer)
