import {useState, useEffect} from 'react'
import './Table.css'

const TableBreaker = ({resp}) => {

    const {id, tension, amper} = resp
    const [monoBreaker, setMonoBreaker] = useState(null)
    const [doubleBreaker, setDoubleBreaker] = useState(null)

    useEffect(() => {
        calcCircuitBreaker()
    },[])

    const calcCircuitBreaker = () => {
        if(tension == 110) {
            circuitMono(amper * 0.76)
        } else {
            circuitDouble(amper * 0.76)
        }
    }
        
    const circuitMono = (A) => {
        if(A > 0 && A <= 5) {
            setMonoBreaker(5)
        } else if (A > 5 && A <= 10) {
            setMonoBreaker(10)
        } else if (A > 10 && A <= 20) {
            setMonoBreaker(20)
        } else if (A > 20 && A <= 25) {
            setMonoBreaker(25)
        } else if(A > 25 && A <= 30){
            setMonoBreaker(30)
        } else if(A > 30 && A <= 35){
            setMonoBreaker(35)
        } else if(A > 35 && A <= 40){
            setMonoBreaker(40)
        } else if(A > 40 && A <= 45){
            setMonoBreaker(45)
        } else if(A > 45 && A <= 50){
            setMonoBreaker(50)
        } else if(A > 50 && A <= 55){
            setMonoBreaker(55)
        } else if(A > 55 && A <= 60){
            setMonoBreaker(60)
        } else if(A > 60 && A <= 65){
            setMonoBreaker(65)
        } else if(A > 65 && A <= 70){
            setMonoBreaker(70)
        } else if(A > 70 && A <= 75){
            setMonoBreaker(75)
        } else if(A > 75 && A <= 80){
            setMonoBreaker(80)
        } else if(A > 80 && A <= 85){
            setMonoBreaker(85)
        } else if(A > 85 && A <= 90){
            setMonoBreaker(90)
        } else if(A > 90 && A <= 95){
            setMonoBreaker(95)
        } else if(A > 95 && A <= 100){
            setMonoBreaker(100)
        } else if(A > 100 && A <= 105) {
            setMonoBreaker(105)
        } else if(A > 105 && A <= 110) {
            setMonoBreaker(110)
        } else if(A > 110 && A <= 115) {
            setMonoBreaker(115)
        } else if(A > 120 && A <= 125){
            setMonoBreaker(125)
        } else if(A > 125 && A <= 130){
            setMonoBreaker(130)
        } else if(A > 130 && A <= 135){
            setMonoBreaker(135)
        } else if(A > 135 && A <= 140){
            setMonoBreaker(140)
        } else if(A > 140 && A <= 145){
            setMonoBreaker(145)
        } else if(A > 145 && A <= 150){
            setMonoBreaker(150)
        } else if(A > 150 && A <= 155){
            setMonoBreaker(155)
        } else if(A > 155 && A <= 160){
            setMonoBreaker(160)
        } else if(A > 160 && A <= 165){
            setMonoBreaker(165)
        } else if(A > 165 && A <= 170){
            setMonoBreaker(170)
        } else if(A > 170 && A <= 175){
            setMonoBreaker(175)
        } else if(A > 175 && A <= 180){
            setMonoBreaker(180)
        } else if(A > 180 && A <= 185){
            setMonoBreaker(185)
        } else if(A > 185 && A <= 190){
            setMonoBreaker(190)
        } else if(A > 190 && A <= 195){
            setMonoBreaker(195)
        } else if(A > 190 && A <= 200){
            setMonoBreaker(200)
        } else if(A > 195 && A <= 205){
            setMonoBreaker(205)
        }
        else {
            console.log("Os disjuntores 110 não suportam essa amperagem")
        } 
    }

    const circuitDouble = (A) => {
    if(A > 0 && A <= 10) {
        setDoubleBreaker(10)
    } else if(A > 10 && A <= 15) {
        setDoubleBreaker(15)
    } else if (A > 15 && A <= 20) {
        setDoubleBreaker(20)
    } else if (A > 20 && A <= 25) {
        setDoubleBreaker(25)
    } else if (A > 25 && A <= 30) {
        setDoubleBreaker(30)
    } else if (A > 30 && A <= 35) {
        setDoubleBreaker(35)
    } else if (A > 35 && A <= 40) {
        setDoubleBreaker(40)
    } else if (A > 40 && A <= 45) {
        setDoubleBreaker(45)
    } else if (A > 45 && A <= 50) {
        setDoubleBreaker(50)
    } else if (A > 50 && A <= 55) {
        setDoubleBreaker(55)
    } else if (A > 55 && A <= 60) {
        setDoubleBreaker(60)
    } else if (A > 60 && A <= 65) {
        setDoubleBreaker(65)
    } else if (A > 65 && A <= 70) {
        setDoubleBreaker(70)
    } else if (A > 70 && A <= 75) {
        setDoubleBreaker(75)
    } else if (A > 75 && A <= 80) {
        setDoubleBreaker(80)
    } else if (A > 80 && A <= 85) {
        setDoubleBreaker(85)
    } else if (A > 85 && A <= 90) {
        setDoubleBreaker(90)
    } else if (A > 90 && A <= 95) {
        setDoubleBreaker(95)
    } else if (A > 95 && A <= 100) {
        setDoubleBreaker(100)
    } else if (A > 100 && A <= 105) {
        setDoubleBreaker(105)
    } else if (A > 105 && A <= 110) {
        setDoubleBreaker(110)
    } else if (A > 110 && A <= 115) {
        setDoubleBreaker(115)
    } else if (A > 115 && A <= 120) {
        setDoubleBreaker(120)
    } else if (A > 120 && A <= 125) {
        setDoubleBreaker(125)
    } else if (A > 125 && A <= 130) {
        setDoubleBreaker(130)
    } else if (A > 130 && A <= 135) {
        setDoubleBreaker(135)
    } else if (A > 135 && A <= 140) {
        setDoubleBreaker(140)
    } else if (A > 140 && A <= 145) {
        setDoubleBreaker(145)
    } else if (A > 145 && A <= 150) {
        setDoubleBreaker(150)
    } else if (A > 150 && A <= 155) {
        setDoubleBreaker(155)
    } else if (A > 155 && A <= 160) {
        setDoubleBreaker(160)
    } else if (A > 160 && A <= 165) {
        setDoubleBreaker(165)
    } else if (A > 165 && A <= 170) {
        setDoubleBreaker(170)
    } else if (A > 170 && A <= 175) {
        setDoubleBreaker(175)
    } else if (A > 175 && A <= 180) {
        setDoubleBreaker(180)
    } else if (A > 180 && A <= 185) {
        setDoubleBreaker(185)
    } else if (A > 185 && A <= 190) {
        setDoubleBreaker(190)
    } else if (A > 195 && A <= 200) {
        setDoubleBreaker(200)
    } else {
        console.log("Os disjuntores 220 não suportam essa amperagem")
    }
}
    return(
        <>
            <td>{tension == 110 ? monoBreaker : doubleBreaker} A</td>
        </>
    )
}

export default TableBreaker
