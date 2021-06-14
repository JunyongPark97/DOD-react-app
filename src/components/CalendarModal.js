import React from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './CalendarModal.css'

function CalendarModal(props) {
    const {closeModal, isModalOpen, value, onChange} = props;
    function keepModalOpen(e){
        e.stopPropagation();
    }
    function onChangeDate(value){
        onChange(value);
        closeModal();
    }
    return (
        <>
            {
                isModalOpen? 
                <div className={'modal'} onClick={closeModal}>
                    <div className='modal-container' onClick={keepModalOpen}>
                        <p className='calendarModal-text'>시작일을 설정해주세요!</p>
                        <Calendar
                            onChange={onChangeDate}
                            value={value}
                        />
                    </div>
                </div>
                :
                <>
                </>
            }  
        </>
    )
}

export default CalendarModal
