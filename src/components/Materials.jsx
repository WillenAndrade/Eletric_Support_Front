import {useState, useEffect} from 'react'
import axios from 'axios'
import './Materials.css'

import { FaRegLightbulb } from "react-icons/fa6";
import { RiOutlet2Line } from "react-icons/ri";
import { BiShower } from "react-icons/bi";
import { TbAirConditioning } from "react-icons/tb";
import { GiStarGate } from "react-icons/gi";
import { FaSolarPanel } from "react-icons/fa";

const Materials = ({projectNumber}) => {  
    const baseUrl = 'http://localhost:3000'
    const [materials, setMaterials] = useState([])
    
        useEffect(() => {
            getMaterials()
        },[])

    async function getMaterials(){
        try {
            const token = localStorage.getItem('accessToken');
                
            // Handle missing token
            if (!token) {
                console.log('Token not found');
                return;  // Optionally handle missing token here
            }

            const response = await axios.get(`${baseUrl}/circuits${projectNumber}`, {  
                headers: {
                    'Authorization': `Bearer ${token}`  // Send the token as a Bearer token
                }
            });

            const data = response.data.message 

           //console.log(response.data)
            
            data.sort(function(a, b) {
                return a.count - b.count;
              });
                            
                            setMaterials(data)   
        } catch (error) {
            console.log('error: ', error);
        }
    }

    useEffect(()=> {
       getAmountMaterials()
    }) 

    useEffect(()=> {
        getAllMotors(newMotorBi220, newMotorTri220, newMotorTri380)
    })

    const [newLightBulbs, setNewLightBulbs] = useState("")
    const [newOutlets, setNewOutlets] = useState("")
    const [newSpecialOutlets, setNewSpecialOutlets] = useState("")
    const [newShowers, setNewShowers] = useState("")
    const [newAir, setNewAir] = useState("")
    const [newMotorBi220, setNewMotorBi220] = useState("")
    const [newMotorTri220, setNewMotorTri220] = useState("")
    const [newMotorTri380, setNewMotorTri380] = useState("")
    const [allMotors, setAllMotors] = useState(0)

     const getAmountMaterials = () => {

        let lightBulbs = 0
        let outlets = 0
        let specialOutlets = 0
        let showers = 0
        let air = 0
        let motorBi220 = 0
        let motorTri220 = 0
        let motorTri380 = 0

        const materialsList = materials.map((circuit)=> {

               if(circuit.patternInfo === "" || circuit.patternInfo === "iluminacao") {
                lightBulbs += circuit.amount
                setNewLightBulbs(lightBulbs)
               } else if(circuit.patternInfo === "tug") {
                outlets += circuit.amount
                setNewOutlets(outlets)
               } else if(circuit.patternInfo === "tue") {
                specialOutlets += circuit.amount
                setNewSpecialOutlets(specialOutlets)
               } else if(circuit.patternInfo === "chuveiro") {
                showers += circuit.amount
                setNewShowers(showers)
               } else if(circuit.patternInfo === "ar") {
                air += circuit.amount
                setNewAir(air)
               } else if(circuit.patternInfo === "motorbi220") {
                motorBi220 += circuit.amount
                setNewMotorBi220(motorBi220)
               } else if(circuit.patternInfo === "motortri220") {
                motorTri220 += circuit.amount
                setNewMotorTri220(motorTri220)
               } else if(circuit.patternInfo === "motortri380") {
                motorTri380 += circuit.amount
                setNewMotorTri380(motorTri380)
               }
        })
                 
     }

     const getAllMotors = (A, B, C) => {
        let result = A + B + C
        setAllMotors(result)
     }

    return(
        <div className="materials-container">
             <div className="materials-list">
                           {newLightBulbs > 0 &&  <div className="product-items">
                                    <div className="product-icon"><div className="light-icon"></div></div> 
                                    <h2>
                                        <p>{newLightBulbs == "" ? <p>0</p>: <p id='materials-zoom'>{newLightBulbs}</p>}Lâmpadas</p>
                                    </h2>
                            </div>}
                        
                            {newOutlets > 0 && <div className="product-items">
                                    <div className="product-icon"><div className="outlet-icon"></div></div>
                                    <h2>
                                        <p>{newOutlets == "" ? <p>0</p>: <p id='materials-zoom'>{newOutlets}</p>}Tomadas</p>
                                    </h2>
                            </div>}

                            {newShowers > 0 && <div className="product-items">
                                <div className="product-icon"><div className="shower-icon"></div></div>
                                <h2>
                                    <p>{newShowers == "" ? <p>0</p>: <p id='materials-zoom'>{newShowers}</p>}Chuveiros</p>
                                </h2>
                            </div>}

                            {newAir > 0 && <div className="product-items">
                                <div className="product-icon"><div className="air-icon"></div></div>
                                <h2>
                                    <p>{newAir == "" ? <p>0</p>: <p id='materials-zoom'>{newAir}</p>}Ar</p>
                                </h2>
                            </div>}

                            {allMotors > 0 && <div className="product-items">
                                <div className="product-icon"><div className="motor-icon"></div></div>
                                <h2>
                                    <p>{allMotors == "" ? <p>0</p>: <p id='materials-zoom'>{allMotors}</p>}Motores</p>
                                </h2>
                            </div>}
             </div>
        </div>
    )
}

export default Materials
    // Exemplo de painéis solares...
/*
     {allMotors > 0 && <div className="product-items">
                                <div className="product-icon"><div className="panel-icon"></div></div>
                                <h2>
                                    <p>{allMotors == "" ? <p>0</p>: <p id='materials-zoom'>{allMotors}</p>}Painéis S</p>
                                </h2>
                            </div>}  
*/
