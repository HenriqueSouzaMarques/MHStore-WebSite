import React from 'react';
import { Typography, Divider, Grid, Paper, Box } from '@mui/material';
import ProdutoComprado from './ProdutoComprado/ProdutoComprado';

const Compra = ({ compra }) => {
  const { produtos, total } = compra;
  
  return (
    <Box sx={{ marginBottom: '16px' }}>
      <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: 'primary.main', textAlign: 'center' }}>
                
                Total: {total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                
            </Typography>
          </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Products:</Typography>
            {
              produtos.map((produto, index) => (
                <ProdutoComprado
                  produto={produto}
                  key={index}
                />
              ))
            }
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Compra;