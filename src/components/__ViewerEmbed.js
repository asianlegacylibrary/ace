import React, { Component } from 'react'
import { withNamespaces } from 'react-i18next'
// import { 
//     randomIIIFimages, 
//     getRandomInt
//     } from '../store/actions'
import '../assets/css/index.scss'
import '../assets/css/uv.scss'
import '../assets/universalviewer/src/lib/embed'
import { config } from '../assets/json/test_config.js'

console.log(config)

//const imageIndex = getRandomInt(0, randomIIIFimages.length - 1)
//const mediaURL = randomIIIFimages[imageIndex]
//https://dpul.princeton.edu/universalviewer/dist/uv-2.0.1/lib/embed.js

const embedScript = `http://universalviewer.io/uv/lib/embed.js`
//const embedScript = `https://dpul.princeton.edu/universalviewer/dist/uv-2.0.1/lib/embed.js`
//const manifestTest = `http://presentation.bdrc.io/2.1.1/v:bdr:V1KG10720_I1PD153371/manifest`
const manifestTest = `https://figgy.princeton.edu/concern/scanned_resources/6c73166e-254c-4f3d-a176-8583c63ff9da/manifest`
//data-config=${config}
//data-locale="en-GB:English (GB)"
const uv = `
        <div 
            class="uv"
            data-uri=${manifestTest}
            data-collectionindex="0" 
            data-manifestindex="0" 
            data-sequenceindex="0" 
            data-canvasindex="0" 
            data-xywh="-4379,1150,13302,5810" 
            data-rotation="0" 
            style="width:100%;height:300px;background-color: #000"
        ></div>
        <script type="text/javascript" id="embedUV" src="../assets/universalviewer/src/lib/embed.js"></script>
        `
class Viewer extends Component {

    // constructor(props) {
    //     super(props);
    //     //this.handleMouseMove = this.debounce(this.handleMouseMove,1000);
    // }

    state = {
        //backgroundImage: `url(${mediaURL})`,
        backgroundPosition: '0% 0%',
        backgroundSize: 'cover',
        backgroundRepeat: `no-repeat`,
        clicked: false
    }

    componentDidMount() {
        const s = document.createElement("script")
        s.type = 'text/javascript'
        s.src = embedScript
        s.async = true;
        document.body.appendChild(s);
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
    
    uv() {
        return {
            __html: uv
        }
    }

    render() {
        
        return (
            // <div 
            //     className="viewer"
            //     onMouseMove={this.handleMouseMove}
            //     onMouseLeave={this.handleMouseLeave}
            //     onClick={() => this.handleClick(this.state.clicked)}
            //     style={this.state}>
            //     {this.props.t("viewer.title")}
            // </div>
            <div 
                className="viewer"
                style={this.state}
                dangerouslySetInnerHTML={ this.uv() } />
        )

    }
}

export default withNamespaces()(Viewer)
