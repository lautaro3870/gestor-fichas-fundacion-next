'use client';
import { FilterInterface } from '@/lib/interfaces';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';

type FilterProps = {
  filter: FilterInterface | null;
  setFilter: Dispatch<SetStateAction<FilterInterface | null>>;
};

export default function Filter({ filter, setFilter }: FilterProps) {
  const [departamento, setDepartamento] = useState('');
  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    console.log(departamento);
  };
  return (
    <form
      style={{
        marginTop: '3rem',
        marginBottom: '2rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        maxWidth: '90rem',
      }}
      onSubmit={handleFilter}
    >
      <TextField
        size="small"
        name="titulo"
        sx={{
          width: { xs: '8rem', sm: '8rem', md: '8rem', lg: '12rem' },
        }}
      />
      <TextField
        size="small"
        name="anioDesde"
        sx={{
          width: { xs: '100%', sm: '8rem', md: '8rem', lg: '12rem' },
        }}
      />
      <TextField
        size="small"
        name="anioHasta"
        sx={{
          width: { xs: '100%', sm: '8rem', md: '8rem', lg: '12rem' },
        }}
      />
      <Select
        sx={{ width: { xs: '100%', sm: '8rem', md: '8rem', lg: '12rem' } }}
        size="small"
        name="departamento"
        value={departamento}
        onChange={(e: any) => setDepartamento(e.target.value)}
      >
        <MenuItem key={1} value="energia">
          Energía
        </MenuItem>
        <MenuItem key={2} value="made">
          MADE
        </MenuItem>
        <MenuItem key={3} value="asc">
          ASC
        </MenuItem>
      </Select>
      <TextField
        size="small"
        name="areas"
        sx={{ width: { xs: '100%', sm: '8rem', md: '8rem', lg: '12rem' } }}
      />
      <TextField
        size="small"
        name="link"
        sx={{ width: { xs: '100%', sm: '8rem', md: '8rem', lg: '12rem' } }}
      />
      <Button type="submit">Enviar</Button>
    </form>
  );
}
