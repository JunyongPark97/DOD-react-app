import React,{useState} from 'react'

function SignIn(props) {
    const {isOpen, close} = props;
    const [id, updateWrittenId] = useState('');
    const [pw, updateWrittenPW] = useState('');

    function onChangeIdInput(e) {
        updateWrittenId(e.target.value);
        console.log(id);
    }
    function onChangePWInput(e){
        updateWrittenPW(e.target.value);
        console.log(pw);
    }
    // function loginClickHandler() {
    //     fetch("")
    // }
    return (
        <div>
            
        </div>
    )
}

export default SignIn
