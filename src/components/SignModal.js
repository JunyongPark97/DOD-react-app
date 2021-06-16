import React,{useState} from 'react'
import SignIn from './SignIn';
import './SignModal.css'
import CheckSignedUp from './CheckSignedUp'
import SignUp from './SignUp';
import PWAssign from './PWAssign';

function SignModal(props) {
    const {justLogin, isModalOpen, closeModalFunction, loginFunction, createProject} = props;
    const [signInOpen, setSignInOpen] = useState(false);
    const [signUpOpen, setSignUpOpen] = useState(false);
    const [checkSignedUpOpen, setCheckSignedUpOpen] = useState(true);
    const [pwAssignOpen, setPWAssignOpen] = useState(false);

    function handleClickSignIn(){
        setCheckSignedUpOpen(false);
        setSignUpOpen(false);
        setSignInOpen(true);
        setPWAssignOpen(false);
    }
    function handleClickSignUp(){
        setCheckSignedUpOpen(false);
        setSignUpOpen(true);
        setSignInOpen(false);
        setPWAssignOpen(false);
    }
    function keepModalOpen(event){
        event.stopPropagation();
    }
    function closeModal(){
        closeModalFunction();
        setSignInOpen(false);
        setSignUpOpen(false);
        setCheckSignedUpOpen(true);
    }
    function openPWAssign(){
        setCheckSignedUpOpen(false);
        setSignUpOpen(false);
        setSignInOpen(false);
        setPWAssignOpen(true);
    }
    
    return (
        <>
            {
            isModalOpen? (
                <div className='modal' onClick={closeModal}>
                    <div className='modal-container' onClick={keepModalOpen}>
                        <CheckSignedUp isCheckSignedOpen={checkSignedUpOpen} handleClickSignIn={handleClickSignIn} handleClickSignUp={handleClickSignUp}/>
                        <SignIn isOpen={signInOpen} closeModal={closeModalFunction} loginFunction={justLogin?loginFunction:createProject}/>
                        <SignUp isOpen={signUpOpen} openPWAssign={openPWAssign}/>
                        <PWAssign isOpen={pwAssignOpen} closeModal={closeModalFunction} loginFunction={justLogin?loginFunction:createProject}/>
                    </div>
                </div>
                ) : (
                    <></>
                )
            }
        </>
    )
}

export default SignModal

