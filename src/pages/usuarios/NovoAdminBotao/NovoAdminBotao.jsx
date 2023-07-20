import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled(Button)`
    font-size: 14px;
    font-weight: bold;
    margin: auto;
    background-color: #2196f3;
    color: #fff;
    border: 2px solid #2196f3;
    border-radius: 8px;
    padding: 6px 12px;
    margin-bottom: 10px;

    &:hover {
        background-color: #64b5f6;
        border-color: #64b5f6;
    }
`;

const NovoAdminBotao = () => 
{
    const navigate = useNavigate();
    const handleClick = () =>
    {
        navigate('/login');
    }

    return (
        <StyledButton
            onClick={handleClick}
            endIcon={<AddIcon />}
        >
            Create Admin
        </StyledButton>
    );
};

export default NovoAdminBotao;
