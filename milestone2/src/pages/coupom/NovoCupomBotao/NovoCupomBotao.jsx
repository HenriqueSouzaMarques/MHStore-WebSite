import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/system';

const StyledButton = styled(Button)`
    font-size: 14px;
    font-weight: bold;
    margin: auto;
    background-color: #2196f3;
    color: #fff;
    border: 2px solid #2196f3;
    border-radius: 8px;
    padding: 6px 12px;
    margin-top: 20px;

    &:hover {
        background-color: #64b5f6;
        border-color: #64b5f6;
    }
`;

const NovoCupomBotao = ( { setAdicionarCupom } ) => 
{
    return (
        <StyledButton
            onClick={() => setAdicionarCupom(true)}
            endIcon={<AddIcon />}
        >
            Create Coupon
        </StyledButton>
    );
};

export default NovoCupomBotao;
