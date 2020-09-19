import React from 'react';

const Rank = ({name, entries}) =>
{
    return(
        <div>
            <div>
            <p className='f2 tc'>{`${name}, your entry count is...`}</p>
            </div>
            <div>
            <p className='f2 tc'>{entries}</p>
            </div>
        </div>
    );
}

export default Rank;