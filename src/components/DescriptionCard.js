import React,{useState, useRef} from 'react'
import './DescriptionCard.css'
import $ from 'jquery'
// window.$ = window.jQuery = jQuery;

function DescriptionCard(props) {
    const {icon, mainTitle, subTitle, content} = props;
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
                <img className='description-icon' src={icon}/>
                <div className='description-name'>
                    {mainTitle}<br/>{subTitle}
                </div>
                <img className='description-arrow' src={!click? process.env.PUBLIC_URL + '/arrow-down.png' : process.env.PUBLIC_URL + '/arrow-up.png'}
                    onClick={handleClick}
                />
            </div>   
            <div className={!click? 'contour': 'contour hide'}/>
            <div ref={toggleDiv} className={'description-content'}>
            {/* !click? 'description-content hide' :  */}
                {content}
            </div>
        </div>
    )
}

export default DescriptionCard
