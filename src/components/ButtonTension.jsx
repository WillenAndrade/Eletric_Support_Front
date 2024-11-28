/* eslint-disable react/prop-types */ 
import './ButtonTension.css'

const ButtonTension = ({handleTension, mono}) => {
    return (
        <div onClick={() => handleTension()} className={mono ? 'btnVolts': 'btnVolts active'}>
            <div  className={mono ? "btnVoltsCircle": 'btnVoltsCircle active'}></div>
            <span className={mono ? "volts": 'volts active'}>{mono ? "110": "220"}</span>
        </div>
    )
}
export default ButtonTension
