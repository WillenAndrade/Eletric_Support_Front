"use client"
import {useState, useEffect} from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { CiFolderOn } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import './ProjectsScreen.css'
import CircuitsForm from './CircuitsForm'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { IoMdExit } from "react-icons/io";

const ProjectsScreen = () => {
    const [localProjectNumber, setLocalProjectNumber] = useState(localStorage.getItem('localprojectnumber'))
    const [localProjectName, setLocalProjectName] = useState(localStorage.getItem('localprojectname'))
    const [projectNumber, setProjectNumber] = useState(localProjectNumber !== null ? localProjectNumber : "")
    const [projectName, setProjectName] = useState(localProjectName !== null ? localProjectName : "")
    const [projects, setProjects] = useState([])
    const [createProject, setCreateProject] = useState(false)
    const [updateProject, setUpdateProject] = useState(false)
    const [updateName, setUpdateName] = useState(false)
    const [localUpdateId, setLocalUpdateId] =  useState()
    const [updateId, setUpdateId] = useState(localUpdateId !== null ? localUpdateId : "")
    const baseUrl = 'http://localhost:3000'
    const token = localStorage.getItem('accessToken');
    const userNameOrEmail = localStorage.getItem("userNameOrEmail")
    const [userNameLower, setUserNameLower] = useState("")
    const [userName, setUserName] = useState("")
 
    useEffect(() => {
                             getProjectNames()
    },[])

    useEffect(() => {
                          getUserName(userNameOrEmail)
                        ''
                        
    },[])

    async function getUserName(userNameOrEmail) {
        if (!userNameOrEmail) {
            console.log('Por favor, forneça um nome de usuário ou e-mail.');
            return;
        }
    
        try {
            if (!token) {
                console.log('Nenhum token encontrado. Por favor, faça login.');
                return;
            }
    
            const response = await axios.get(`${baseUrl}/users/${userNameOrEmail}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            const data = response.data;
    
            if (data && data.message) {
                const { name } = data.message; 
                console.log(`Nome do usuário: ${name}`);
                let userNameLower = name.toLowerCase(); 
                setUserNameLower(userNameLower); 
                
                let capitalizedValue = userNameLower.charAt(0).toUpperCase() + userNameLower.slice(1);
                
                setUserName(capitalizedValue);

            } else {
                console.log('Resposta inesperada do servidor:', data);
            }
        } catch (error) {
            console.error('Erro ao obter o nome do usuário:', error);
    
            if (error.response) {
                console.log('Erro do servidor:', error.response.data);
    
                if (error.response.status === 401) {
                    console.log('Token expirado ou inválido. Por favor, faça login novamente.');
                } else if (error.response.status === 404) {
                    console.log('Usuário não encontrado.');
                }
            } else {
                console.log('Erro de rede ou outro erro:', error.message);
            }
        }
    }

        async function getProjectNames() {

            try {
             
                if (!token) {
                    console.log('Nenhum token encontrado. Por favor, faça login.');
                    return;
                }
        
                const response = await axios.get(`${baseUrl}/projects`, {
                    headers: {
                        'Authorization': `Bearer ${token}`  
                    }
                });
        
                const data = response.data;
        
                if (data && data.message) {
                    setProjects(data.message);  
                } else {
                    console.log('Resposta inesperada do servidor:', data);
                }
            } catch (error) {
                console.error('Erro ao obter projetos:', error);
 
                if (error.response) {
  
                    console.log('Erro do servidor:', error.response.data);
                  
                    if (error.response.status === 401) {
                        console.log('Token expirado ou inválido. Por favor, faça login novamente.');
                    }
                } else {
                    console.log('Erro de rede ou outro erro:', error.message);
                }
            }
        }

    const handleCreateName = async (e) => {

        setCreateProject(false)
        let linkNumber = setLinkNumber()

           const token = localStorage.getItem('accessToken');
                
                if (!token) {
                    console.log('Nenhum token encontrado. Por favor, faça login.');
                    return;
                }

        try {
            const response = await axios.post(`${baseUrl}/projects`,
            JSON.stringify({projectName, linkNumber}),
            {
                headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
            }
        ) 
        

    } catch (error) {
        if(!error.response) {
            console.log("Erro ao acessar o servidor")
        } else if (error.response.status == 401) {
            console.log("Dados inválidos...")
        }
    }
}


async function deleteProjectAndCircuits(project) {
    const token = localStorage.getItem('accessToken');
                
    if (!token) {
        console.log('Nenhum token encontrado. Por favor, faça login.');
        return;
    }

    try {
        const deleteCircuitsResponse = await axios.delete(`${baseUrl}/circuits${project.linkNumber}/circuits${project.linkNumber}`, {
            headers: {
                'Authorization': `Bearer ${token}`,  
                'Content-Type': 'application/json'   
            }
        });

        console.log('Circuitos excluídos com sucesso:', deleteCircuitsResponse.data);

        const deleteProjectResponse = await axios.delete(`${baseUrl}/projects/${project.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,  
                'Content-Type': 'application/json'   
            }
        });

        const { status, message } = deleteProjectResponse.data;
        if (status) {
            console.log(message);  
            await getProjectNames(); 
        } else {
            console.log('Erro ao excluir o projeto:', message);
        }
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.log('Access Denied: Token inválido ou não fornecido.');
        } else {
            console.log('Erro ao excluir o projeto e/ou os circuitos:', error);
        }
    }
}

async function onUpdateProject(e) {   
    try {
        const response = await axios.put(`${baseUrl}/projects/${updateId}`,
        JSON.stringify({projectName}),
            {
                headers: {'Content-Type' : 'application/json'}
            }
        )

        await getProjectNames()

    }catch(error) {
        console.log(error)
    }
   
}

const setLinkNumber = () => {
    let linkNumber

        if(projects.length == 0){
            linkNumber = "one"
        } 
        
            else if(projects.length == 1) {
                if(projects[0].linkNumber === "two" || projects[0].linkNumber === "three") {
                    linkNumber = "one"
                }
               else if(projects[0].linkNumber === "one" || projects[0].linkNumber === "three") {
                    linkNumber = "two"
                }
                else {
                    linkNumber = "three"
                }
            } 
        
                else if(projects.length == 2) {
                    const projectsWithNumber = [];
                    projectsWithNumber.push(projects[0].linkNumber)
                    projectsWithNumber.push(projects[1].linkNumber)
                    const hasNumberOne = projectsWithNumber.some((number) => number === "one");
                    const hasNumberTwo = projectsWithNumber.some((number) => number === "two");
                    const hasNumberThree = projectsWithNumber.some((number) => number === "three");

                    if(!hasNumberOne) {
                        linkNumber = "one"
                    } else if(!hasNumberTwo) {
                        linkNumber = "two"
                    } else if (!hasNumberThree) {
                        linkNumber = "three"
                    }

                } else {
                window.alert("Nenhuma opção")
                }
              return linkNumber
}

    const handleProjectData = (resp) => {
        setProjectNumber(resp.linkNumber)
        setProjectName(resp.projectName)
    }

    const renderCreateName = () => {
        setCreateProject(true)
    }

    const renderUpdateName = (resp) => {
        setUpdateId(resp.id)
        setUpdateName(true)
        setUpdateProject(true)
        setCreateProject(true)
    }
    const renderProjects = () => {
        setUpdateProject(false)
        setUpdateName(false)
        setCreateProject(false)
    }
    const handleLogout = () => {
        localStorage.removeItem("localIsLogged"); 
        localStorage.removeItem("accessToken");  
        localStorage.removeItem("refreshToken"); 
        localStorage.removeItem("localIsLogged");
        window.location.href = "/login"; 
    };

   

    return (
     <>
        { projectNumber  === "" ? 
        <div className="general-container"> 
            <div className="project-image"></div>
            
            <div className="project-container">
                 
                <div onClick={()=> handleLogout()}><Link to="/" className="btn-home"><IoMdExit size={40} /></Link></div>
                <p>Bem vindo <span id='span-user'>{userName}</span><span id='span-user'>!</span></p>
                <div className="my-projects" onClick={()=> renderProjects()}><CiFolderOn className="folder-on"/><p>PROJETOS</p></div>
                <div>
                        {projects.map((resp, index) => (
                            <div
                            key={resp.id} 
                            className={!updateProject ? "projects-list" : "projects-list active"}
                            >
                            <div>
                                <p key={resp.id} 
                                className="name-paragraph"
                                index={index}
                                onClick={() => handleProjectData(resp)}
                                >
                                {resp.projectName}
                                </p>
                            </div>
                            <div className="project-buttons">
                                                <div className="btn-del-projects" type='button' onClick={evt => deleteProjectAndCircuits(resp)}>x</div>
                            </div>
                            </div>
                        ))}
                </div>
                <div>
                    <form>
                    <div className={createProject && !updateName? "name-form" : "name-form active" }> 
                    <input className="project-name-input" name="projectName" maxLength={20} value={projectName} onChange={(e) => setProjectName(e.target.value)} type="name"></input>  
                    <button className="btn-name"  type="submit" onClick={(e) => handleCreateName(e)}>Criar</button>
                    </div>   
                    </form>
            </div>
            <div>
                    <form>
                    <div className={updateName ? "name-form" : "name-form active" }> 
                    <input className="project-name-input" name="projectName" maxLength={20} value={projectName} onChange={(e) => setProjectName(e.target.value)} type="name"></input>  
                    <button className="btn-name"  type="submit" onClick={(e) => onUpdateProject(e)}>Atualizar</button>
                    </div>   
                    </form>
            </div>
                       
                        {!createProject && projects.length < 3 ? <div className="new-project" onClick={(e) => renderCreateName(e)}><div className="circle-plus"><h2 className="EletricSupport">ES</h2></div></div> : <p></p>}
            </div>
        </div> :

         <CircuitsForm projectNumber={projectNumber} projectName={projectName} />}
    </>
    )
}

export default ProjectsScreen
