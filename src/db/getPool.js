import mysql from 'mysql2/promise'

import {MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_PORT} from '../../env.js'

let pool = null;

export const getPool = async ()=>{
    try {
        if(!pool){
                // CREAR POOL TEMPORAL SIN DEPENDER DE LA DDBB
            const poolTem = mysql.createPool({
                host:MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASSWORD,
                port: MYSQL_PORT || 3306,
            })
            
                // CREAMOS LA DDBB SI NO EXISTE
            await poolTem.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`)

                // CREAMOS LA CONEXION
            pool = mysql.createPool({                
                host:MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASSWORD,
                database: MYSQL_DATABASE,
                port: MYSQL_PORT || 3306,
                connectionLimit: 10,
                timezone: 'Z',
            })
        }
        
        return pool;

    } catch (error) {
        console.log('Error al obtener la conexión ⛓️‍💥');
    }
};