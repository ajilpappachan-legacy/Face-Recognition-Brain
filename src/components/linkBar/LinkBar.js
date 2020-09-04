import React from 'react';
import './LinkBar.css'

const LinkBar = () =>
{
    return(
        <div>
            <p className='f3 white tc'>{'This web app detects face in images. Try it out using a url below!'}</p>
            <div className='center pa4 br-3 shadow-5 mw7 pattern'>
                <input className='f4 pa2 w-70 center' type='text'/>
                <button className='f4 w-30 grow link ph3 pv2 dib white bg-black-50 tc'>Detect</button>
            </div>
        </div>
    );
}

export default LinkBar;