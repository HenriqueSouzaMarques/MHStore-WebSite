import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/system';

const StyledButton = styled(Button)`
    width: 20%;
    font-size: 14px;
    font-weight: bold;
    margin: auto;
    background-color: #2196f3;
    color: #fff;
    border: 2px solid #2196f3;
    border-radius: 8px;
    padding: 6px 12px;

    &:hover {
        background-color: #64b5f6;
        border-color: #64b5f6;
    }
`;

const BotaoCatalogoAdicionar = ( { adicionarProduto } ) => 
{
    return (
        <StyledButton
            onClick={() => adicionarProduto(true)}
            endIcon={<AddIcon />}
        >
            Add Product
        </StyledButton>
    );
};

export default BotaoCatalogoAdicionar;