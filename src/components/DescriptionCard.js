import React,{useState, useRef} from 'react'
import Parser from 'html-react-parser'
import './DescriptionCard.css'
import $ from 'jquery'
// window.$ = window.jQuery = jQuery;

function DescriptionCard(props) {
    const {item} = props;
    const [click, setClick] = useState(false);
    const toggleDiv = useRef(null)
    function handleClick(){
        setClick(!click);
    }
    function toggle(){
        $(toggleDiv.current).slideToggle();
        setClick(!click);
    }
    return (
        <div className='description-container'>
            <div className='description-title' onClick={toggle}>
                <img className='description-icon' src={item.icon}/>
                <div className='description-name'>
                    {Parser(item.title)}
                </div>
                <img className='description-arrow' src={!click? process.env.PUBLIC_URL + '/arrow-down.png' : process.env.PUBLIC_URL + '/arrow-up.png'}
                    onClick={handleClick}
                />
            </div>
            <div className={!click? 'contour': 'contour hide'}/>
            <div ref={toggleDiv} className={'description-content'}>
            {/* !click? 'description-content hide' :  */}
                {Parser(item.text)}
            </div>
        </div>
    )
}

export default DescriptionCard
