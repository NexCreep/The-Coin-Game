import { Alert, Button, TextField } from '@mui/material'
import Send from '@mui/icons-material/Send'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { DataResponseRoom } from '../@types/api'
import axios from 'axios'
import { ChangeEvent, useState } from 'react'

const Home: NextPage = () => {

  const [roomInput, setRoomInput] = useState<string | undefined>(undefined)
  const [error, setError] = useState<ErrorOnCode>({error: false})

  const verifyAndSave = (event: ChangeEvent<HTMLInputElement>) => {
    
    var temp: string | null = event.target.value

    if (temp == null){
      setError({
        error: true, errorCod: -1, errorDesc: "No code introduced"
      })
      return;
    }

    temp = temp.toUpperCase()
    var tempCharA: string[] = temp.split('')
    var regexMatch: string = "";

    tempCharA.forEach(char => {
      regexMatch += char.match(/[A-Z]/i)?.toString()
    });

    if (temp != regexMatch){
      setError({
        error: true, errorCod: -1, errorDesc: "That's not a correct code."
      })
      return;
    }
    
    setError({error: false})
    setRoomInput(temp)
  }

  const renderAlert = (): JSX.Element | undefined => {
    if(error.error)
      return <Alert severity="error">Error code {error.errorCod}:  <strong>{error.errorDesc}</strong></Alert>
  }

  const getRoom = async () => {
    var res;

    if (roomInput != undefined  && !error.error){
      res = await axios.get(`./api/room/${roomInput}`)
      console.log(res.data); 
      return
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Image src="/assets/coin_240x240.png" height={240} width={240}></Image>
        <input type="text" name="room_code" id="room_code" onChange={e => verifyAndSave(e)} />
        <br />
        <Button variant="contained" endIcon={<Send />} onClick={() => getRoom()}>
          Enviar
        </Button>
        <br />
        {renderAlert()}
      </div>
    </div>
  )
}

export default Home
