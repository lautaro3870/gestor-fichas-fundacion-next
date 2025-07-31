'use client';
import { FORM_INPUTS_FIRST_SECTION } from '@/lib/constants';
import { Project } from '@/lib/interfaces';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

type CustomFormProps = {
  project: Project | {};
};

export default function CustomForm({ project }: CustomFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData.get('titulo'));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{
            width: {
              xl: '60%',
              lg: '80%',
              md: '80%',
            },
            margin: '3rem auto',
          }}
        >
          {FORM_INPUTS_FIRST_SECTION.map(
            (
              {
                id,
                label,
                required,
                name,
                type,
                options,
                sizes: { lg, md, xl, sm },
              },
              index
            ) => (
              <Grid size={{ xl, lg, md, sm }} key={index}>
                {type === 'select' ? (
                  <FormControl fullWidth size="small" key={index}>
                    <InputLabel>{label}</InputLabel>
                    <Select
                      fullWidth
                      size="small"
                      name={name}
                      label={label}
                      defaultValue={
                        (project as Record<string, any>)[name] || ''
                      }
                    >
                      {options.map(({ id, value }, index) => (
                        <MenuItem key={index} value={id}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    fullWidth
                    size="small"
                    id={id}
                    label={label}
                    required={required}
                    key={index}
                    name={name}
                    defaultValue={(project as Record<string, any>)[name] || ''}
                  />
                )}
              </Grid>
            )
          )}

          <Grid size={{ xl: 12, lg: 12, md: 12 }}>
            <hr style={{ border: '0.1rem solid rgba(0,0,0,0.2)' }} />
            <Typography variant="h5">Datos del contrato</Typography>
          </Grid>

          <Grid
            size={{ xs: 12 }}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Button variant="contained" type="submit">
              Guardar
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ marginLeft: '2rem' }}
              type="button"
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
