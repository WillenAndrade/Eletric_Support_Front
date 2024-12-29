import {useState, useEffect} from 'react'
import {FaLessThan} from 'react-icons/fa'
import {FaGreaterThan} from 'react-icons/fa'
import ButtonTension from './ButtonTension'
import axios from 'axios'
import Table from './Table'
import './CircuitsForm.css'
import { TbTableShortcut } from "react-icons/tb";
import { IoMdExit } from "react-icons/io";

const CircuitsForm = ({projectNumber, projectName}) => {
    const [mono, setMono] = useState(true)
    const [name, setName] = useState('')
    const [cabe, setCabe] = useState('1,5')
    const [tension, setTension] = useState(110)
    const [patternInfo, setPatternInfo] = useState('')
    const [potence, setPotence] = useState(100)
    const [totalPotence, setTotalPotence] = useState(0)
    const [amount, setAmount] = useState(1)
    const [amper, setAmper] = useState(0)
    const [threePhase, setThreePhase] = useState(false)
    const [addDevices, setAddDevices] = useState(false)
    const [addPotence, setAddPotence] = useState(0)
    const [addAmount, setAddAmount] = useState(1)
    const [renderTable, setRenderTable] = useState(false)
    const [localProjectNumber , setLocalProjectNumber] = useState("")
    const [localProjectName , setLocalProjectName] = useState("")
    const baseUrl = 'http://localhost:3000'
    const [circuitsTableCount, setCircuitsTableCount] = useState([])
    const [count, setCount] = useState(1)
    const [limitPotence, setLimitPotence] = useState(false)
    
    useEffect(()=> {
        handleLimitPotence()
    })

    useEffect(()=>{
        handlePatternInfo()
    }, [patternInfo])

    useEffect(()=> {
        calcAmperPotence()
    }, [tension])

    useEffect(() => {
        localStorage.setItem('localprojectnumber', projectNumber)
        setLocalProjectNumber(localStorage.getItem('localprojectnumber'))
    },)
    useEffect(() => {
        localStorage.setItem('localprojectname', projectName)
        setLocalProjectNumber(localStorage.getItem('localprojectname'))
    },)
   
    useEffect(() => {
        getCircuitsTableCounter()
    }, [])
   useEffect(() => {
        getCurrentCounter()
    }, [circuitsTableCount])


        async function getCircuitsTableCounter() {
            try {
                const token = localStorage.getItem('accessToken');  // Assuming the token is stored in localStorage
                if (!token) {
                    console.log('Token not found');
                    return;  // Optionally handle missing token here
                }
        
                const response = await axios.get(`${baseUrl}/circuits${projectNumber}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`  // Send the token as a Bearer token
                    }
                });
        
                const data = response.data;
                setCircuitsTableCount(data.message);  // Assuming you want to set the count from the response
        
            } catch (error) {
                console.log('Erro ao fazer o fetch dos dados', error);
                if (error.response && error.response.status === 403) {
                    console.log('Access Denied: Invalid or expired token');
                }
            }
        }

    const getCurrentCounter = () => {
        if(circuitsTableCount.length > 0) {
            const higherCount = circuitsTableCount.reduce((prev, current) => (prev.count > current.count) ? prev : current) 
            setCount(higherCount.count + 1)
        } else {
            console.log("O circuitsTableCount está vazio.");
        }
    } 

    const handleSubmit = async (e) => {
        const token = localStorage.getItem('accessToken');  // Assuming the token is stored in localStorage
                if (!token) {
                    console.log('Token not found');
                    return;  // Optionally handle missing token here
                }                

        try {
            const response = await axios.post(`${baseUrl}/circuits${projectNumber}`,
            JSON.stringify({count, name, cabe, tension, patternInfo, potence, amount, totalPotence, amper,}),
            {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        ) 
        
        console.log(response.data)

    } catch (error) {
        if(!error.response) {
            console.log("Erro ao acessar o servidor")
        } else if (error.response.status == 401) {
            console.log("Dados inválidos...")
        }
    }
    setLocalProjectNumber(projectNumber)
}
    
    const handleClickMore = () => {
        if(count <= 29) {
        setCount((prevCount) => prevCount + 1)
        }
       }
    const handleClickMinus = () => {
        if(count >= 2) {
        setCount((prevCount) => prevCount - 1)
        }
       }

    const handleReload = () => {
        localStorage.removeItem('localprojectnumber')
        localStorage.removeItem('localprojectname')
        window.location.reload(true)
    }   
                                                                                        
    const handleTension = () => {
        calcAmperPotence()
        if(mono) {
            setTension(220)
            setMono(!mono)
        } else {
            setMono(!mono)
            setTension(110)
        } 
        calcAmperPotence()
     }
/*
     const calcAmperPotence = () => {
        let demandFactor = {
            status: true,
            value: 0.76
        }
        if (demandFactor.status) {
            let addAmper = addPotence * addAmount / tension
            let preAmper = potence * amount / tension
            let posAmper = preAmper + addAmper
            setAmper(posAmper.toFixed(2))
            let total = (potence * amount) / demandFactor.value
            setTotalPotence(total.toFixed(2))
        } else {
            let addAmper = addPotence * addAmount / tension
            let preAmper = potence * amount / tension
            let posAmper = preAmper + addAmper
            setAmper(posAmper.toFixed(2))
            let total = potence * amount
            setTotalPotence(total.toFixed(2))
        }
       
     }*/

        const calcAmperPotence = () => {
                let addAmper = addPotence * addAmount / tension
                let preAmper = potence * amount / tension
                let posAmper = preAmper + addAmper
                setAmper(posAmper.toFixed(2))
                let total = potence * amount
                setTotalPotence(total.toFixed(2))
            }
        
     const handlePatternInfo = (e) => {
        calcAmperPotence()
        if(patternInfo === "motorbi220") {
            setTension(220)
            setThreePhase(true)
            calcAmperPotence()
        } else if (patternInfo === "motortri220") {
            setTension(380.6)
            setThreePhase(true)
            calcAmperPotence()
        } else if (patternInfo === "motortri380") {
            setTension(657.4)
            setThreePhase(true)
            calcAmperPotence()
        } else {
            setTension(110)
            setThreePhase(false)
            setMono(true)
            calcAmperPotence()
        }
     }

     const handleType = (patternInfo) => {
        setPatternInfo(patternInfo)
        if (patternInfo === "iluminacao") {
            setCabe("1,5")
            setPotence("60")
        } else if (patternInfo === "tug") {
            setCabe("2,5")
            setPotence("100")
        } else if (patternInfo === "tue") {
            setCabe("6,0")
            setPotence("600")
        } else if (patternInfo === "chuveiro") {
            setCabe("6,0")
            setPotence("6000")
        } else if (patternInfo === "ar") {
            setCabe("6,0")
            setPotence("3000")
        } else if (patternInfo === "motorbi220") {
            setCabe("4,0")
            setPotence("2000")
        } else {
            setCabe("6,0")
            setPotence("500")
        }
     }

     const handleLimitPotence = () => {
        if(cabe == "1,5" && amper > 15.5) {
            console.log("Potencia para fio 1.5 extrapolada")
            setLimitPotence(true)
        } else if(cabe == "2,5" && amper > 21) {
            console.log("Potencia para fio 2.5 extrapolada")
            setLimitPotence(true)
        } else if(cabe == "4,0" && amper > 28) {
            console.log("Potencia para fio 4.0 extrapolada")
            setLimitPotence(true)
        } else if(cabe == "6,0" && amper > 36) {
            console.log("Potencia para fio 6.0 extrapolada")
            setLimitPotence(true)
        } else if(cabe == "10" && amper > 50) {
            console.log("Potencia para fio 10mm extrapolada")
            setLimitPotence(true)
        } else {
           
            setLimitPotence(false)
        }
    }

    return( 
        <>
       {renderTable ? <Table projectNumber={projectNumber} projectName={projectName}/> : <form>
          <div className="container">
            <div className="box">
            <div className="exit" onClick={(e) => handleReload(e)}><p>X</p></div>
            {projectName ? <h1 className="project-title">{projectName}</h1> : <h1 className="project-title">Circuitos</h1>}
            <div className="circuitInfo">
                <div className="circuitNumber">
                    <span>Circuito</span>
                    <div className="numberDisplay">
                        <div className="left" onClick={handleClickMinus}><p><FaLessThan /></p></div>
                        <div className="middle"><p className="middle">{count}</p></div>
                        <div className="right" onClick={handleClickMore}><p><FaGreaterThan /></p></div>
                    </div>
                </div>
                <div className="circuitName">
                    <span>Nome</span>
                    <input onChange={(e) => setName(e.target.value)} value={name} name="name" type="text" className="nameInfo"/>
                </div>
            </div>
            <div className="circuitDetails">
                <div className="circuitType">
                    <span>Tipo</span>
                    <select className="typeInfo" value={patternInfo} name="patternInfo" onChange={(e) => handleType(e.target.value)}>
                        <option  value="iluminacao">Iluminação</option>
                        <option  value="tug">TUG</option>
                        <option  value="tue">TUE</option>
                        <option  value="chuveiro">Chuveiro</option>
                        <option  value="ar">Ar</option>
                        <option  value="motorbi220">Motor Bi 220</option>
                        <option  value="motortri220">Motor Tri 220</option>
                        <option  value="motortri380">Motor Tri 380</option>
                        <option  value="outro">Outro</option>
                    </select>
                </div>
                {!threePhase ? 
                <div className="circuitTension"  >
                    <span>Tensão</span>
                    <ButtonTension handleTension={handleTension} mono={mono} tension={tension}/>
                </div> : 
                <div className="threePhase"><h2></h2></div>}
                <div className="circuitCabe">
                    <span>Fio</span>
                    <select  className="cabeInfo" value={cabe} name="cabe" onChange={(e) => setCabe(e.target.value)}>
                        <option value="1,5">1.5mm</option>
                        <option value="2,5">2.5mm</option>
                        <option value="4,0">4.0mm</option>
                        <option value="6,0">6.0mm</option>
                        <option value="10">10mm</option>
                    </select>
                </div>
            </div>
            
       { addDevices ?
        <div className="formAddDevices">
            <h2 className="addDevicesTitle">Dispositivos Adicionais</h2>
            <div className="circuitAddPotence">
            <div className="potence">
                <span>Potência (W)</span>
                <input type="number" min = "0" onChange={(e)=> setAddPotence(e.target.value)} onKeyUp={calcAmperPotence} value={addPotence}  className="potenceInfo"/>
            </div>
            <div className="amount">
                <span>Quantidade</span>
                <input type="number" min = "0" onChange={(e) => setAddAmount(e.target.value)} onKeyUp={calcAmperPotence}  value={addAmount}  className="amountInfo"/>
            </div>
            </div>
        </div>  :
        <div className="circuitPotence">
                <div className="potence">
                    <span>Potência (w)</span>
                    <input type="number" min = "0" onChange={(e)=> setPotence(e.target.value)} onKeyUp={calcAmperPotence} value={potence} name="potence" className="potenceInfo"/>
                </div>
                <div className="amount">
                    <span>Quantidade</span>
                    <input type="number" min = "0" onChange={(e) => setAmount(e.target.value)} onKeyUp={calcAmperPotence}  value={amount}  name="amount" className="amountInfo"/>
                </div>
        </div> }
            <div className="addDevices">
                <a className={!addDevices ? "btn-addDevices" : "btn-addDevices active"} onClick={(e) => setAddDevices(!addDevices)}>^</a>
                <p>Adicionar dispositivos</p>
            </div>
            <div className="amper">
                <p className={!limitPotence ? "amperInfo" : "amperInfo active"}>{amper} A</p>
            </div>
            <div className="btn-bottom">
                <div className="btnTable" onClick={() => setRenderTable(true)}><TbTableShortcut size={26}/></div>
                <button className="btnSubmit" type='submit' onClick={(e)=>handleSubmit(e)}><FaGreaterThan className='FaGreaterThan' size={26}/></button>
            </div>    
           </div>
          </div> 
       </form>}
    </>         
    )                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
}

export default CircuitsForm
