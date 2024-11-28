import {useState, useEffect} from 'react'
import './Table.css'
import Materials from './Materials';
import axios from 'axios'
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { TbTableShortcut } from "react-icons/tb";
import { IoMdExit } from "react-icons/io";


        const options = {
            filename: "Tabela.pdf", 
            method: 'save',
            resolution: Resolution.MEDIUM,
            page: {
            margin: Margin.SMALL,
            format: 'a4',
            orientation: 'landscape',
            },
            canvas: {
            mimeType: 'image/png',
            qualityRatio: 1
            },
            overrides: {
            pdf: {
                compress: true
            },
            canvas: {
                useCORS: true
            }
            },
        };

const getTargetElement = () => document.getElementById('content-id');

const Table = ({monoBreaker, doubleBreaker, projectNumber, projectName}) => {
    const [circuitsTable, setCircuitsTable] = useState([])
    const [generalPotence, setGeneralPotence] = useState()
    const [generalCurrent, setGeneralCurrent] = useState()
    const [generalBreaker, setGeneralBreaker] = useState()
    const [pdfHidden, setPdfHidden] = useState(true)
    const [advice, setAdvice] = useState('');
    const [reloadMaterials, setReloadMaterials] = useState(false)
    const baseUrl = 'http://localhost:3000'
    

    useEffect(() => {
                         getCircuits()
    },[])

    useEffect(() => {
                         getCircuits()
    },[projectNumber])

    useEffect(() => {
        const allPotence = calcTotalPotence().toFixed(0)
        setGeneralPotence(allPotence)
        const allCurrent = calcTotalCurrent().toFixed(1)
        setGeneralCurrent(allCurrent)
        calcGeneralBreaker()
    })

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * advicesList.length);
        setAdvice(advicesList[randomIndex]);
      }, []);

        async function getCircuits() {
            
            try {
               const token = localStorage.getItem('authToken');
                
                // Handle missing token
                if (!token) {
                    console.log('Token not found');
                    return;  // Optionally handle missing token here
                }
        
                // Send GET request with the Bearer token in the Authorization header
                const response = await axios.get(`${baseUrl}/circuits${projectNumber}`, {  
                    headers: {
                        'Authorization': `Bearer ${token}`  // Send the token as a Bearer token
                    }
                });
        
                // Assuming response.data.message is an array of circuits
                const data = response.data.message;
        
                if (Array.isArray(data)) {
                    // Sort the array based on count property
                    data.sort((a, b) => a.count - b.count);
                    
                    // Set the sorted data to the state
                    setCircuitsTable(data);   
                } else {
                    console.error('Expected an array, but received:', data);
                }
        
            } catch (error) {
                // Handle errors
                console.log('Error fetching circuits:', error);
        
                // Optionally handle specific HTTP errors based on status code
                if (error.response) {
                    // Handle 403 (Unauthorized) or other status codes
                    if (error.response.status === 403) {
                        console.log('Access Denied: Invalid or expired token');
                    } else {
                        console.log('Error status:', error.response.status);
                    }
                } else {
                    console.log('Network or other error:', error.message);
                }
            }
        }

        async function onDeleteCircuit(circuit) {
            try {
                const token = localStorage.getItem('authToken');
                
                // Handle missing token
                if (!token) {
                    console.log('Token not found');
                    return;  // Optionally handle missing token here
                }

                const response = await axios.delete(`${baseUrl}/circuit${projectNumber}/${circuit.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`  // Send the token as a Bearer token
                        }}
                );
                const { status, message } = response.data; 
            
                await getCircuits(); 
                setReloadMaterials(!reloadMaterials)
                
            
            } catch (error) {
                console.error('Error deleting circuit:', error);
                alert('An error occurred. Please try again.'); 
            }
         }

    //
    //// Table Breaker ////
     const TableBreaker = ({resp}) => {
        const {id, tension, amper} = resp
        const [monoBreaker, setMonoBreaker] = useState(null)
        const [doubleBreaker, setDoubleBreaker] = useState(null)
    
        useEffect(() => {
            calcCircuitBreaker()
        },[])
    
        const calcCircuitBreaker = () => {
            if(tension == 110) {
                circuitMono(amper)
            } else {
                circuitDouble(amper)
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
             <td className="final-td" onMouseEnter={(e) => setPdfHidden(false)} onMouseLeave={(e) => setPdfHidden(true)}>{tension == 110 ? monoBreaker : doubleBreaker} A {!pdfHidden && <button type='button' className='btn-del-circuits' onClick={evt => onDeleteCircuit(resp)}>X</button>}</td>
            </>
        ) }
    //// Final TableBreaker ////
    //

    const reloadToProjects = () => {
        localStorage.removeItem('localprojectnumber')
        window.location.reload(true)
    }
    const reloadToForm = () => {
        window.location.reload(true)
    }
      
    const calcTotalPotence = () => {
        const allPotence = circuitsTable.reduce((acc, circuit) => {
            return acc + circuit.totalPotence
        },0)
        return allPotence
    }
    
    const calcTotalCurrent = () => {
        const allCurrent = circuitsTable.reduce((acc, circuit) => {
            return acc + circuit.amper
        },0)
        return allCurrent
    }

    const calcGeneralBreaker = () => {
        const A = circuitsTable.reduce((acc, circuit) => {
            return acc + circuit.amper
        },0)
        
        if(A > 0 && A <= 5) {
            setGeneralBreaker(10)
        } else if (A > 5 && A <= 10) {
            setGeneralBreaker(10)
        } else if (A > 10 && A <= 20) {
            setGeneralBreaker(20)
        } else if (A > 20 && A <= 25) {
            setGeneralBreaker(25)
        } else if(A > 25 && A <= 30){
            setGeneralBreaker(30)
        } else if(A > 30 && A <= 35){
            setGeneralBreaker(35)
        } else if(A > 35 && A <= 40){
            setGeneralBreaker(40)
        } else if(A > 40 && A <= 45){
            setGeneralBreaker(45)
        } else if(A > 45 && A <= 50){
            setGeneralBreaker(50)
        } else if(A > 50 && A <= 55){
            setGeneralBreaker(55)
        } else if(A > 55 && A <= 60){
            setGeneralBreaker(60)
        } else if(A > 60 && A <= 65){
            setGeneralBreaker(65)
        } else if(A > 65 && A <= 70){
            setGeneralBreaker(70)
        } else if(A > 70 && A <= 75){
            setGeneralBreaker(75)
        } else if(A > 75 && A <= 80){
            setGeneralBreaker(80)
        } else if(A > 80 && A <= 85){
            setGeneralBreaker(85)
        } else if(A > 85 && A <= 90){
            setGeneralBreaker(90)
        } else if(A > 90 && A <= 95){
            setGeneralBreaker(95)
        } else if(A > 95 && A <= 100) {
            setGeneralBreaker(100)
        } else if(A > 100 && A <= 105) {
            setGeneralBreaker(105)
        } else if(A > 105 && A <= 110) {
            setGeneralBreaker(110)
        } else if(A > 110 && A <= 115) {
            setGeneralBreaker(115)
        } else if(A > 115 && A <= 120){
            setGeneralBreaker(120)
        } else if(A > 120 && A <= 125){
            setGeneralBreaker(125)
        } else if(A > 125 && A <= 130){
            setGeneralBreaker(130)
        } else if(A > 130 && A <= 135){
            setGeneralBreaker(135)
        } else if(A > 135 && A <= 140){
            setGeneralBreaker(140)
        } else if(A > 140 && A <= 145){
            setGeneralBreaker(145)
        } else if(A > 145 && A <= 150){
            setGeneralBreaker(150)
        } else if(A > 150 && A <= 155){
            setGeneralBreaker(155)
        } else if(A > 155 && A <= 160){
            setGeneralBreaker(160)
        } else if(A > 160 && A <= 165){
            setGeneralBreaker(165)
        } else if(A > 165 && A <= 170){
            setGeneralBreaker(170)
        } else if(A > 170 && A <= 175){
            setGeneralBreaker(175)
        } else if(A > 175 && A <= 180){
            setGeneralBreaker(180)
        } else if(A > 180 && A <= 185){
            setGeneralBreaker(185)
        } else if(A > 185 && A <= 190){
            setGeneralBreaker(190)
        } else if(A > 190 && A <= 195){
            setGeneralBreaker(195)
        } else if(A > 195 && A <= 200){
            setGeneralBreaker(200)
        } else {
            setGeneralBreaker(0)
        }
            return generalBreaker
    }

              const advicesList = [
                    "A NBR 5410 é uma norma desenvolvida pela Associação Brasileira de Normas Técnicas (ABNT), determina as regras envolvendo as instalações elétricas residenciais.",
              ]
    return(
        <div className="page">
             <div id="content-id">
           {projectName ? <h1 className="project-name">{projectName}</h1> : <h1>Tabela de circuitos</h1>}
            {circuitsTable.length > 0 ? <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>CIRCUITO</th>
                            <th>NOME</th>
                            <th>CABO</th>
                            <th>TENSÃO</th>
                            <th>QTD</th>
                            <th>POTÊNCIA</th>
                            <th>CORRENTE</th>
                            <th>DISJUNTOR</th>
                        </tr>
                    </thead>
                    <tbody>
                            {  circuitsTable.map( (resp,index) => {

                                const {id, count, name, cabe, tension, amount, totalPotence, amper} = resp

                                return (
                                    <tr className='table-item' key={index}>
                                            <td>{count}</td>
                                            <td>{name}</td>
                                            {cabe == "" ? <td>1.5 MM</td> : <td>{cabe} MM</td>}
                                            <td>{tension} V</td>
                                            <td>{amount}</td>
                                            <td>{totalPotence} W</td>
                                            <td>{amper} A</td>
                                            <TableBreaker resp={resp} />
                                    </tr>
                                )
                            })     
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>TOTAL</th>
                            <th>-----</th>
                            <th>-----</th>
                            <th>-----</th>
                            <th>-----</th>
                            <th className="general-data-potence">{generalPotence} W</th>
                            <th className="general-data">{generalCurrent} A</th>
                            <div className="breaker"><div className="breaker-icon"></div><th className="general-data-breaker">{generalBreaker}A</th></div>
                        </tr>
                    </tfoot>
                </table>
            </div> : 
            <p className="tableMessage">Não há circuitos nesta tabela...</p>}
            {circuitsTable.length > 0 && <p className="note">Aplicar fator de demanda para sua localidade..</p>}
            {circuitsTable.length > 0 && <Materials  projectNumber={projectNumber} reloadMaterials={reloadMaterials} />}
                
           </div>

           <div className='advicePhrase'>
            {circuitsTable.length > 0 && <p className='advicePhrase-paragraph'>" {advice} "</p>}
           </div>


            <div className="tableButtons">
                <div className="btnBack" onClick={()=> reloadToForm()}><FaArrowLeft size={26} /></div>
                {circuitsTable.length > 0 && <div className="tableContainer" onClick={()=> generatePDF(getTargetElement, options)}>
                    <div className="tableContainerTop"><IoDocumentTextOutline fontSize={50}/></div>
                    <p>PDF</p>
                </div>}
                <div className="linkToHome" onClick={()=> reloadToProjects()} ><IoMdExit size={26}/></div>
                
           </div>
        </div>
    )
}

export default Table
