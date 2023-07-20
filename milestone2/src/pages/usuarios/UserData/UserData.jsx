import React, { useContext, useState } from 'react';
import { TextField, Button, Grid, Typography, RadioGroup, FormControl, FormControlLabel, Radio, Box, FormLabel } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { UserContext } from '../../../UserContext';
import { useNavigate } from 'react-router-dom';

const UserData = ({ user, setHistory }) =>
{
  const { userData, updateUserData, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [type, setType] = useState(user.type);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [gender, setGender] = useState(user.gender);
  const [street, setStreet] = useState(user.street);
  const [number, setNumber] = useState(user.number);
  const [zipCode, setZipCode] = useState(user.zipCode);
  const [phone, setPhone] = useState(user.phone);

  const handleTypeChange = (e) =>
  {
    setType(e.target.value);
  };

  const handleUsernameChange = (e) =>
  {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) =>
  {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) =>
  {
    setName(e.target.value);
  };

  const handleGenderChange = (e) =>
  {
    setGender(e.target.value);
  };

  const handleStreetChange = (e) =>
  {
    setStreet(e.target.value);
  };

  const handleNumberChange = (e) =>
  {
    setNumber(e.target.value);
  };

  const handleZipCodeChange = (e) => 
  {
    setZipCode(e.target.value);
  };

  const handlePhoneChange = (e) => 
  {
    setPhone(e.target.value);
  };

  const handleSave = async () =>
  {
    const fullAddress = street + " " + number + " " + zipCode;

    const updatedUser =
    {
      ...user,
      type,
      username,
      email,
      name,
      gender,
      street,
      number,
      zipCode,
      phone,
      fullAddress
    };

    alert("User updated!");
    
    if(updatedUser._id === userData._id)
    {
      updateUserData(updatedUser);

      if(updatedUser.type === 'cliente') navigate('/');
    }

    await updateUser(updatedUser);
  };

  const handleOpenPopUp = () =>
  {
    setHistory(user.purchaseHistory);
  }

  return (
    <Box sx={{ bgcolor: '#f5f5f5f5', borderRadius: '10px', padding: '20px', border: '1px solid #ccc', my: 3, width: '100%', marginBottom: '30px'}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">User ID: {user.id}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ bgcolor: '#ddd', borderRadius: '10px', p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Account Info</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Username" value={username} onChange={handleUsernameChange} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Email" value={email} onChange={handleEmailChange} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Type</FormLabel>
                  <RadioGroup value={type} row onChange={handleTypeChange}>
                    <FormControlLabel value="cliente" control={<Radio />} label="Client" />
                    <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ bgcolor: '#ddd', borderRadius: '10px', p: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>User Info</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Name" value={name} onChange={handleNameChange} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Phone" value={phone} onChange={handlePhoneChange} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup value={gender} row onChange={handleGenderChange}>
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ bgcolor: '#ddd', borderRadius: '10px', p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Location Info</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Street" value={street} onChange={handleStreetChange} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Number" value={number} onChange={handleNumberChange} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Zip Code" value={zipCode} onChange={handleZipCodeChange} fullWidth />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" size="large" startIcon={<SaveIcon />} onClick={handleSave}>
              Save
            </Button>

            {
              (user.purchaseHistory).length > 0 &&
              <Button variant="contained" color="primary" size="large" startIcon={<MenuBookIcon />} onClick={handleOpenPopUp}>
                Purchase History
              </Button>
            }
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserData;
