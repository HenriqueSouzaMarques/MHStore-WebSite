import React, { useContext, useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveIcon from '@mui/icons-material/Save';
import { UserContext } from '../../../UserContext';

const cupomDataStyle = {
  container: {
    backgroundColor: '#eee',
    borderRadius: '4px',
    padding: '16px',
    margin: '16px auto',
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonRemove: {
    borderColor: 'red',
    marginRight: '4px', // Adjust the margin right value as desired
    color: '#f44336',
  },
  buttonSave: {
    borderColor: 'blue',
    marginLeft: '4px', // Adjust the margin right value as desired
  },
  updateButton: {
    backgroundColor: '#2196f3',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#1976d2',
    },
  },
  textField: {
    marginLeft: '8px', // Adjust the margin left value as desired
    marginBottom: '8px', // Adjust the margin bottom value as desired
  },
};

const CupomData = ({ index, coupons, setCupons }) => {
  const [name, setName] = useState(coupons[index].nome);
  const [discount, setDiscount] = useState(coupons[index].desconto);
  const [quantity, setQuantity] = useState(coupons[index].quantidade);

  const { updateCoupon, deleteCoupon } = useContext(UserContext);

  useEffect(() =>
  {
    setName(coupons[index].nome);
    setDiscount(coupons[index].desconto);
    setQuantity(coupons[index].quantidade)

  }, [coupons[index]._id]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDiscountChange = (event) => {
    setDiscount(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSave = async () =>
  {
    if(discount <= 0 || discount >= 100)
    {
        alert("Discount should be greater than 0 and lower than 100!");

        return;
    }
    else if(quantity <= 0)
    {
        alert("Quantity should be greater than 0!");

        return;
    }

    const newCoupon =
    {
        nome: name, 
        desconto: discount, 
        quantidade: quantity
    }

    try
    {
        const newCoupons = [...coupons];
        newCoupons[index] = newCoupon;

        await updateCoupon(coupons[index]._id, newCoupon);
        
        alert("Update done successfully!");

        setCupons(newCoupons);
    }
    catch(error)
    {
        alert("Error while updating: each coupon must have a unique name! ");
        setName(coupons[index].nome);
    }
  };

  const handleRemove = async () =>
  {  
    await deleteCoupon(coupons[index]._id);
  }

  return (
    <div style={cupomDataStyle.container}>
      <div style={cupomDataStyle.buttonContainer}>
        <Button
          color="primary"
          variant='outlined'
          size="large"
          startIcon={<DeleteOutlineIcon />}
          style={cupomDataStyle.buttonRemove}
          onClick={handleRemove}
        >
            Remove
        </Button>
      </div>
      <div>
        <TextField
          label="Name"
          value={name}
          onChange={handleNameChange}
          fullWidth
          style={cupomDataStyle.textField}
        />
        <TextField
          label="Discount (%)"
          type="number"
          value={discount}
          onChange={handleDiscountChange}
          fullWidth
          style={cupomDataStyle.textField}
          inputProps=
          {
              {
                  min: 0,
                  max: 100,
              }
          }
        />
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          fullWidth
          style={cupomDataStyle.textField}
          inputProps=
          {
              {
                  min: 0,
              }
          }
        />
      </div>
      <div style={cupomDataStyle.buttonContainer}>
            <Button 
                color="primary" 
                size="large" 
                variant='outlined'
                startIcon={<SaveIcon />} 
                style={cupomDataStyle.buttonSave}
                onClick={handleSave}>
                Save
            </Button>
      </div>
    </div>
  );
};

export default CupomData;
