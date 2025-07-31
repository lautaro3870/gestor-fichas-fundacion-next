'use client';
import {
  FORM_INPUTS_FIRST_SECTION,
  FORM_INPUTS_FOURTH_SECTION,
  FORM_INPUTS_SECOND_SECTION,
  FORM_INPUTS_THIRD_SECTION,
} from '@/lib/constants';
import { Project } from '@/lib/interfaces';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
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

type OptionType = { id: string | number; value: string };

type InputProps = {
  type: string | undefined;
  label: string;
  index: number;
  name: string;
  options?: OptionType[];
  id?: string;
  required?: boolean;
};

export default function CustomForm({ project }: CustomFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData.get('mesInicio'));
  };

  const _getInputType = ({
    type,
    label,
    index,
    name,
    options = [],
    id,
    required,
  }: InputProps) => {
    if (type === 'select') {
      return (
        <FormControl fullWidth size="small" key={index}>
          <InputLabel>{label}</InputLabel>
          <Select
            fullWidth
            size="small"
            name={name}
            label={label}
            defaultValue={(project as Record<string, any>)[name] || ''}
          >
            {options.map(({ id, value }, idx) => (
              <MenuItem key={idx} value={id}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    if (type === 'checkbox') {
      return (
        <FormControlLabel
          control={
            <Checkbox
              name={name}
              defaultChecked={(project as Record<string, any>)[name] || false}
            />
          }
          label={label}
        />
      );
    }

    return (
      <TextField
        fullWidth
        sx={{ input: { color: type === 'url' ? 'blue' : '' } }}
        size="small"
        id={id}
        label={label}
        required={required}
        key={index}
        name={name}
        type={type}
        onDoubleClick={(e: any) => {
          if (type === 'url') {
            window.open(e.target.value, '_blank');
          }
        }}
        defaultValue={(project as Record<string, any>)[name] || ''}
      />
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={4}
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
                {_getInputType({
                  type,
                  index,
                  label,
                  name,
                  id,
                  options,
                  required,
                })}
              </Grid>
            )
          )}

          <Grid size={{ xl: 12, lg: 12, md: 12 }}>
            <hr style={{ border: '0.1rem solid rgba(0,0,0,0.2)' }} />
            <Typography variant="h5">Datos del contrato</Typography>
          </Grid>

          {FORM_INPUTS_SECOND_SECTION.map(
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
                {_getInputType({
                  type,
                  index,
                  label,
                  name,
                  id,
                  options,
                  required,
                })}
              </Grid>
            )
          )}

          {FORM_INPUTS_THIRD_SECTION.map(
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
                {_getInputType({
                  type,
                  index,
                  label,
                  name,
                  id,
                  options,
                  required,
                })}
              </Grid>
            )
          )}

          {FORM_INPUTS_FOURTH_SECTION.map(
            (
              {
                id,
                label,
                required,
                name,
                type,
                sizes: { lg, md, xl, sm },
              },
              index
            ) => (
              <Grid size={{ xl, lg, md, sm }} key={index}>
                {_getInputType({
                  type,
                  index,
                  label,
                  name,
                  id,
                  options: [],
                  required,
                })}
              </Grid>
            )
          )}

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
