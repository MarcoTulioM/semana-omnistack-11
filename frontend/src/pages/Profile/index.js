import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";
import './styles.css';

export default function Profile () {

    const history = useHistory();

    const [incidents, setIncidents ] = useState([]);
    
    const ongName = localStorage.getItem("ongName");
    const ongId = localStorage.getItem("ongId");

    useEffect( () => {
        api.get("profile", {
            headers: {
                authorization: ongId
            }
        }).then( response => {
            setIncidents(response.data);
        })
    },

    [ ongId ]
    
    );

    async function handleIcindentDelete (id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    authorization: ongId
                }
            });

            setIncidents( incidents.filter( incid => incid.id !== id ))

        }catch (err) {
            alert("Erro, ...");
        }
    }

    function handleLogout () {
        localStorage.clear();
        history.push("/");
    }

    return (
        <div className='profile-container'>    
            <header>
                <img src={ logoImg } alt="Be The Hero"/>
                <span> Bem vinda, { ongName } </span>

                <Link className='button' to='incidents/new'> Cadastrar novo caso </Link>
                <button type='buttun' onClick={handleLogout}>
                    <FiPower size={18} color='#e02041'/>
                </button>
            </header>

            <h1> Casos cadastrados </h1>

            <ul>
                { console.log(incidents) }
                { incidents.map( incid => ( 
                    <li key={ incid.id }>
                        <strong>CASO:</strong>
                        <p>{ incid.title }</p>
                    
                        <strong>DESCRIÇÃO:</strong>
                        <p>{ incid.description }</p>
                    
                        <strong>VALOR:</strong>
                        <p>{ Intl.NumberFormat( "pt-BR", { style: "currency", currency: "BRL"}).format(incid.value) }</p>
                
                        <button type="button" onClick={ () => handleIcindentDelete(incid.id) }>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li> 
                ))}
            </ul>
        </div>
    );
}
