import './App.css';
import React, { useState, useEffect } from 'react';

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://d9olupt5igjta.cloudfront.net/samples/sample_files/68910/c0045ecd7c3d972664c8d507b0274b00a58fc038/mp3/_hihat_070a.mp3?1617485463'
  }
];



const App = () => {

  const [volume, setVolume] = useState(1);
  const [display, setDisplay] = useState('');
  const [powerCheck, setPowerCheck] = useState(true);

  const togglePower = () => {
    setPowerCheck(!powerCheck);
  }

  return (
    <div id="drum-machine"  className="App">
      <div id="drum-buttons-container" style={powerCheck === false ? {pointerEvents: 'none'} : {pointerEvents: 'auto'}}>
        {bankOne.map((note, key) => (
          <DrumPads
            key={key}
            keyCodeDrum={note.keyCode}
            ID={note.id}
            url={note.url}
            keyTrigger={note.keyTrigger}
            volume={volume}
            setDisplay={setDisplay} />
        ))}
      </div>
      <div id="control-container">
        <div className="control-items" >
          <p>Power</p>
          <label class="switch">
            <input type="checkbox" checked={powerCheck}/>
            <span onClick={togglePower} class="slider"></span>
          </label>
        </div>
        <div className="control-items" id="display" >
          <p>{display}</p>
        </div>
        <div className="control-items" >
          <p>Volume</p>
          <input
            type="range"
            step="0.01"
            value={volume}
            max="1" min="0"
            onChange={e => setVolume(e.target.value)}
            className=""/>
        </div>
      </div>

    </div>
  );
}

const DrumPads = ({ ID, keyTrigger, url, keyCodeDrum, volume, setDisplay }) => {

  const [active, setActive] = useState(false)

  useEffect(() => {
    document.addEventListener("keydown", keyPressHandler);
    return () => {
      document.removeEventListener("keydown", keyPressHandler);
    }
  }, [])

  const keyPressHandler = (e) => {
    if (e.keyCode === keyCodeDrum) {
      audioPlayOnClick();
    }
  }

  const audioPlayOnClick = () => {
    const mp3 = document.getElementById(keyTrigger);
    setActive(true)
    setTimeout(() => {
      setActive(false);
    }, 150);
    mp3.volume = volume;
    mp3.currentTime = 0;
    mp3.play();
    setDisplay(ID);
  };

  return (

    <div onClick={audioPlayOnClick} id={ID} className={`drum-pad ${active ? 'keycode' : ''}`}>
      <audio className="clip" id={keyTrigger} src={url} type="audio/mpeg" />
      <p>{keyTrigger}</p>
    </div>
  )
}


export default App;