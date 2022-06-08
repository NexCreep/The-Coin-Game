import { Alert } from '@mui/material'
import Send from '@mui/icons-material/Send'
import AddIcon from '@mui/icons-material/Add';
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import axios from 'axios'
import { ChangeEvent, useEffect, useState } from 'react'
import { DataResponseRoom } from '../@types/api';

const Home: NextPage = () => {

  const [roomInput, setRoomInput] = useState<string | undefined>(undefined)
  const [roomData, setRoomData] = useState<DataResponseRoom | undefined>(undefined)
  const [error, setError] = useState<ErrorOnCode>({error: false})

  useEffect(() => {
    if (roomData != undefined)
      setTimeout(() => setRoomData(undefined), 5000)
  }, [roomData])

  useEffect(() => {
    if (error.error)
      setTimeout(() => setError({error: false}), 5000)
  }, [error])

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
        error: true, errorCod: -1, 
        errorDesc: "You're going in the wrong way 🚫"
      })
      return;
    }
    
    setError({error: false})
    setRoomInput(temp)
  }

  const spawnAlert = (): JSX.Element | undefined => {
    if(error.error)
      return <Alert severity="error" className={styles.alert}>Error code {error.errorCod}:  <strong>{error.errorDesc}</strong></Alert>
    else if (roomData?.room_data.started)
      return <Alert severity="info" className={styles.alert}>Info of room {roomData.id}:  <strong>The game already started. 🕓</strong></Alert>
  }


  const getRoom = async () => {
    var res;

    if(roomInput == undefined || roomInput.length <= 0){
      setError({
        error: true, errorCod: -2,
        errorDesc: "The code field can't be empty. 🕳️"
      })
      return
    }

    if (!error.error){
      res = await axios.get(`./api/room/${roomInput}`)
      console.log(res.data); 

      if (res.data.error){
        setError(res.data)
      }else{
        if (res.data.room_data.started)
          setRoomData(res.data)
        else
          window.open(`./room/${res.data.id}`, "_self");
      }

      return
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <title>TheCoinGame</title>
      </Head>
      <div className={styles.main}>
        <div className={styles.site_title}>
          <div>The</div>
          <div className={styles.site_title_main}>Coin</div>
          <div>Game</div>
        </div>
        <div>
          <input className={styles.input_text} type="text" name="room_code" id="room_code"
            placeholder='Codigo aquí 😄' maxLength={6} onChange={e => verifyAndSave(e)} 
            onDragEnterCapture={() => getRoom()} />
          <button className={styles.button_send} onClick={() => getRoom()}> 
            <Send className={styles.button_icon}/> 
          </button>
          <br />
          <button className={styles.button_create} onClick={() => getRoom()}> 
            <div>Create room</div>
            <AddIcon className={styles.button_icon}/> 
          </button>
        </div>
        
        {spawnAlert()}
      </div>
    </div>
  )
}

export default Home
