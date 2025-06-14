/*import { useState, useEffect } from 'react'
import axios from 'axios'
import './Materials.css'

const Materials = ({ projectNumber }) => {  
    const baseUrl = 'http://localhost:3000'
    const [materials, setMaterials] = useState([])
    
    const [newLightBulbs, setNewLightBulbs] = useState(0)
    const [newOutlets, setNewOutlets] = useState(0)
    const [newSpecialOutlets, setNewSpecialOutlets] = useState(0)
    const [newShowers, setNewShowers] = useState(0)
    const [newAir, setNewAir] = useState(0)
    const [newMotorBi220, setNewMotorBi220] = useState(0)
    const [newMotorTri220, setNewMotorTri220] = useState(0)
    const [newMotorTri380, setNewMotorTri380] = useState(0)
    const [allMotors, setAllMotors] = useState(0)

    useEffect(() => {
        getMaterials()
    }, [])

    async function getMaterials() {
        try {
            const token = localStorage.getItem('accessToken');
                
            if (!token) {
                console.log('Token not found');
                return;  
            }

            const response = await axios.get(`${baseUrl}/circuits${projectNumber}`, {  
                headers: {
                    'Authorization': `Bearer ${token}`  
                }
            });

            const data = response.data.message 

            data.sort(function(a, b) {
                return a.count - b.count;
            });
                            
            setMaterials(data)   
        } catch (error) {
            console.log('error: ', error);
        }
    }

    useEffect(() => {
        getAmountMaterials()
    }, [materials]) 

    const getAmountMaterials = () => {
        let lightBulbs = 0
        let outlets = 0
        let specialOutlets = 0
        let showers = 0
        let air = 0
        let motorBi220 = 0
        let motorTri220 = 0
        let motorTri380 = 0

        materials.forEach((circuit) => {
            if (circuit.patternInfo === "" || circuit.patternInfo === "iluminacao") {
                lightBulbs += circuit.amount
            } else if (circuit.patternInfo === "tug") {
                outlets += circuit.amount
            } else if (circuit.patternInfo === "tue") {
                specialOutlets += circuit.amount
            } else if (circuit.patternInfo === "chuveiro") {
                showers += circuit.amount
            } else if (circuit.patternInfo === "ar") {
                air += circuit.amount
            } else if (circuit.patternInfo === "motorbi220") {
                motorBi220 += circuit.amount
            } else if (circuit.patternInfo === "motortri220") {
                motorTri220 += circuit.amount
            } else if (circuit.patternInfo === "motortri380") {
                motorTri380 += circuit.amount
            }
        })

        setNewLightBulbs(lightBulbs)
        setNewOutlets(outlets)
        setNewSpecialOutlets(specialOutlets)
        setNewShowers(showers)
        setNewAir(air)
        setNewMotorBi220(motorBi220)
        setNewMotorTri220(motorTri220)
        setNewMotorTri380(motorTri380)
        setAllMotors(motorBi220 + motorTri220 + motorTri380)
    }

    // Example unit prices (in USD or your currency)
    const unitPrices = {
        iluminacao: 5.00,
        tug: 3.00,
        tue: 10.00,
        chuveiro: 50.00,
        ar: 100.00,
        motorbi220: 150.00,
        motortri220: 200.00,
        motortri380: 250.00
    }

    return (
        <div className="materials-container">
            <div className="materials-list">
                {newLightBulbs > 0 && (
                    <div className="product-items">
                        <div className="product-icon"><div className="light-icon"></div></div>
                        <h2>
                            <div className='product-type'>
                                <p id='materials-zoom'>{newLightBulbs}</p>
                                {newLightBulbs > 1 ? <h2>Lâmpadas</h2> : <h2>Lâmpada</h2>}
                                
                                <p>{(newLightBulbs * unitPrices.iluminacao).toFixed(2)}</p>
                            </div>
                        </h2>
                    </div>
                )}
                {newOutlets > 0 && (
                    <div className="product-items">
                        <div className="product-icon"><div className="outlet-icon"></div></div>
                        <h2>
                            <div className='product-type'>
                                <p id='materials-zoom'>{newOutlets}</p>
                                {newOutlets > 1 ? <h2>Tomadas</h2> : <h2>Tomada</h2>}
                                
                                <p>{(newOutlets * unitPrices.tug).toFixed(2)}</p>
                            </div>
                        </h2>
                    </div>
                )}
                {newSpecialOutlets > 0 && (
                    <div className="product-items">
                        <div className="product-icon"><div className="outlet-icon"></div></div>
                        <h2>
                            <div className='product-type'>
                                <p id='materials-zoom'>{newSpecialOutlets}</p>
                                {newSpecialOutlets > 1 ? <h2>Tomadas Especiais</h2> : <h2>Tomada Especial</h2>}
                               
                                <p>{(newSpecialOutlets * unitPrices.tue).toFixed(2)}</p>
                            </div>
                        </h2>
                    </div>
                )}
                {newShowers > 0 && (
                    <div className="product-items">
                        <div className="product-icon"><div className="shower-icon"></div></div>
                        <h2>
                            <div className='product-type'>
                                <p id='materials-zoom'>{newShowers}</p>
                                {newShowers > 1 ? <h2>Chuveiros</h2> : <h2>Chuveiro</h2>}
                                
                                <p>{(newShowers * unitPrices.chuveiro).toFixed(2)}</p>
                            </div>
                        </h2>
                    </div>
                )}
                {newAir > 0 && (
                    <div className="product-items">
                        <div className="product-icon"><div className="air-icon"></div></div>
                        <h2>
                            <div className='product-type'>
                                <p id='materials-zoom'>{newAir}</p>
                                {newAir > 1 ? <h2>Ares</h2> : <h2>Ar</h2>}
                                
                                <p>{(newAir * unitPrices.ar).toFixed(2)}</p>
                            </div>
                        </h2>
                    </div>
                )}
                {allMotors > 0 && (
                    <div className="product-items">
                        <div className="product-icon"><div className="motor-icon"></div></div>
                        <h2>
                            <div className='product-type'>
                                <p id='materials-zoom'>{allMotors}</p>
                                {allMotors > 1 ? <h2>Motores</h2> : <h2>Motor</h2>}
                                
                                <p>{((newMotorBi220 * unitPrices.motorbi220) + (newMotorTri220 * unitPrices.motortri220) + (newMotorTri380 * unitPrices.motortri380)).toFixed(2)}</p>
                            </div>
                        </h2>
                    </div>
                )}
            </div>
        </div>
    )
}

export default <Materials></Materials>*/

import { useState, useEffect } from 'react'
import axios from 'axios'
import './Materials.css'

const Materials = ({ projectNumber }) => {  
    const baseUrl = 'http://localhost:3000'
    const [materials, setMaterials] = useState([])
    
    const [newLightBulbs, setNewLightBulbs] = useState(0)
    const [newOutlets, setNewOutlets] = useState(0)
    const [newSpecialOutlets, setNewSpecialOutlets] = useState(0)
    const [newShowers, setNewShowers] = useState(0)
    const [newAir, setNewAir] = useState(0)
    const [newMotorBi220, setNewMotorBi220] = useState(0)
    const [newMotorTri220, setNewMotorTri220] = useState(0)
    const [newMotorTri380, setNewMotorTri380] = useState(0)
    const [allMotors, setAllMotors] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        getMaterials()
    }, [])

    async function getMaterials() {
        try {
            const token = localStorage.getItem('accessToken');
                
            if (!token) {
                console.log('Token not found');
                return;  
            }

            const response = await axios.get(`${baseUrl}/circuits${projectNumber}`, {  
                headers: {
                    'Authorization': `Bearer ${token}`  
                }
            });

            const data = response.data.message 

            data.sort(function(a, b) {
                return a.count - b.count;
            });
                            
            setMaterials(data)   
        } catch (error) {
            console.log('error: ', error);
        }
    }

    useEffect(() => {
        getAmountMaterials()
    }, [materials]) 

    const getAmountMaterials = () => {
        let lightBulbs = 0
        let outlets = 0
        let specialOutlets = 0
        let showers = 0
        let air = 0
        let motorBi220 = 0
        let motorTri220 = 0
        let motorTri380 = 0

        materials.forEach((circuit) => {
            if (circuit.patternInfo === "" || circuit.patternInfo === "iluminacao") {
                lightBulbs += circuit.amount
            } else if (circuit.patternInfo === "tug") {
                outlets += circuit.amount
            } else if (circuit.patternInfo === "tue") {
                specialOutlets += circuit.amount
            } else if (circuit.patternInfo === "chuveiro") {
                showers += circuit.amount
            } else if (circuit.patternInfo === "ar") {
                air += circuit.amount
            } else if (circuit.patternInfo === "motorbi220") {
                motorBi220 += circuit.amount
            } else if (circuit.patternInfo === "motortri220") {
                motorTri220 += circuit.amount
            } else if (circuit.patternInfo === "motortri380") {
                motorTri380 += circuit.amount
            }
        })

        setNewLightBulbs(lightBulbs)
        setNewOutlets(outlets)
        setNewSpecialOutlets(specialOutlets)
        setNewShowers(showers)
        setNewAir(air)
        setNewMotorBi220(motorBi220)
        setNewMotorTri220(motorTri220)
        setNewMotorTri380(motorTri380)
        setAllMotors(motorBi220 + motorTri220 + motorTri380)
    }

    // Example unit prices (in USD or your currency)
    const unitPrices = {
        iluminacao: 5.00,
        tug: 3.00,
        tue: 10.00,
        chuveiro: 100.00,
        ar: 2000.00,
        motorbi220: 500.00,
        motortri220: 700.00,
        motortri380: 1050.00
    }

    useEffect(() => {
        const total = (
            newLightBulbs * unitPrices.iluminacao +
            newOutlets * unitPrices.tug +
            newSpecialOutlets * unitPrices.tue +
            newShowers * unitPrices.chuveiro +
            newAir * unitPrices.ar +
            newMotorBi220 * unitPrices.motorbi220 +
            newMotorTri220 * unitPrices.motortri220 +
            newMotorTri380 * unitPrices.motortri380
        ).toFixed(2);
        setTotalPrice(total);
    }, [newLightBulbs, newOutlets, newSpecialOutlets, newShowers, newAir, newMotorBi220, newMotorTri220, newMotorTri380]);

    return (
        <div className="materials-container">
            <div className="materials-list">
                {newLightBulbs > 0 && (
                    <div className="product-items">
                        <div className="product-icon"><div className="light-icon"></div></div>
                        <h2>
                            <div className='product-type'>
                                <p id='materials-zoom'>{newLightBulbs}</p>
                                {newLightBulbs > 1 ? <h2>Lâmpadas</h2> : <h2>Lâmpada</h2>}
                                <p className="money">R${(newLightBulbs * unitPrices.iluminacao).toFixed(2)}</p>
                            </div>
                        </h2>
                    </div>
                )}
                {newOutlets > 0 && (
                    <div className="product-items">
                        <div className="product-icon"><div className="outlet-icon"></div></div>
                        <h2>
                            <div className='product-type'>
                                <p id='materials-zoom'>{newOutlets}</p>
                                {newOutlets > 1 ? <h2>Tomadas</h2> : <h2>Tomada</h2>}
                                <p className="money">R${(newOutlets * unitPrices.tug).toFixed(2)}</p>
                            </div>
                        </h2>
                    </div>
                )}
                {newSpecialOutlets > 0 && (
                    <div className="product-items">
                        <div className="product-icon"><div className="outlet-icon"></div></div>
                        <h2>
                            <div className='product-type'>
                                <p id='materials-zoom'>{newSpecialOutlets}</p>
                                {newSpecialOutlets > 1 ? <h2>Tomadas Especiais</h2> : <h2>Tomada Especial</h2>}
                                <p className="money">R${(newSpecialOutlets * unitPrices.tue).toFixed(2)}</p>
                            </div>
                        </h2>
                    </div>
                )}
                {newShowers > 0 && (
                    <div className="product-items">
                        <div className="product-icon"><div className="shower-icon"></div></div>
                        <h2>
                            <div className='product-type'>
                                <p id='materials-zoom'>{newShowers}</p>
                                {newShowers > 1 ? <h2>Chuveiros</h2> : <h2>Chuveiro</h2>}
                                <p className="money">R${(newShowers * unitPrices.chuveiro).toFixed(2)}</p>
                            </div>
                        </h2>
                    </div>
                )}
                {newAir > 0 && (
                    <div className="product-items">
                        <div className="product-icon"><div className="air-icon"></div></div>
                        <h2>
                            <div className='product-type'>
                                <p id='materials-zoom'>{newAir}</p>
                                {newAir > 1 ? <h2>Ares</h2> : <h2>Ar</h2>}
                                <p className="money">R${(newAir * unitPrices.ar).toFixed(2)}</p>
                            </div>
                        </h2>
                    </div>
                )}
                {allMotors > 0 && (
                    <div className="product-items">
                        <div className="product-icon"><div className="motor-icon"></div></div>
                        <h2>
                            <div className='product-type'>
                                <p id='materials-zoom'>{allMotors}</p>
                                {allMotors > 1 ? <h2>Motores</h2> : <h2>Motor</h2>}
                                <p className="money">R${((newMotorBi220 * unitPrices.motorbi220) + (newMotorTri220 * unitPrices.motortri220) + (newMotorTri380 * unitPrices.motortri380)).toFixed(2)}</p>
                            </div>
                        </h2>
                    </div>
                )}
            </div>
            <div className="total-price">
                <h2>Gasto médio: <span className='currency-sign'>R$</span>{totalPrice}</h2>
            </div>
        </div>
    )
}

export default Materials
