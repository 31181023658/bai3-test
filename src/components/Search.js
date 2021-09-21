import React, {useState} from 'react';
import {TextField, Button, LinearProgress} from '@material-ui/core';
import shortCode from '../api/shortCode';



const Search = () =>{
    const [link, setLink] = useState('');
    const [short,setShort] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) =>{
        e.preventDefault();
        getLink();
        setLink('');
        setIsLoading(!isLoading);
    };

    const getLink = async () => {
        await shortCode
          .get(`shorten?url=${link}`)
          .then((response) => {
            // setShort(response.data.result.short_link);
            setShort(response.data.result.short_link);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      };

    return (
        <>
            <form onSubmit={(e) =>handleSubmit(e)}
                style ={{display: 'flex', flexDirection: 'column'}}>
                <TextField
                style={{marginBottom: '20px'}}
                label="Input Your Link"
                variant="outlined"
                value={link}
                onChange={(e)=> setLink(e.target.value)}
                />
                {!isLoading && (
                <Button 
                onClick={(e) => handleSubmit(e)}
                variant="container" 
                color="blue">
                    Submit Link
                </Button>
                )}
                 {isLoading && <LinearProgress />}
            </form>
            {short && (
                <div>
                    Short Link: {short}
                </div>
            )}
        </>
    )
};
export default Search;