'use client';
import {
  FORM_INPUTS_FIFTH_SECTION,
  FORM_INPUTS_FIRST_SECTION,
  FORM_INPUTS_FOURTH_SECTION,
  FORM_INPUTS_SECOND_SECTION,
  FORM_INPUTS_THIRD_SECTION,
} from '@/lib/constants';
import { Area, Column, PersonalInterface, Project } from '@/lib/interfaces';
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
import CustomTable from './CustomTable';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonalTable from './PersonalTable';
import { useEffect, useState } from 'react';

type CustomFormProps = {
  project: Project;
  areas: Area[] | undefined;
  personal: PersonalInterface[] | undefined;
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

export default function CustomForm({
  project,
  areas,
  personal,
}: CustomFormProps) {
  const [formData, setFormData] = useState<Project>({} as Project);

  useEffect(() => {
    setFormData(project);
  }, [project]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData.get('mesFinalizacion'));
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
            value={formData[name as keyof Project] ?? ''}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, [name]: e.target.value }))
            }
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

    if (type === 'area') {
      return (
        <textarea
          name={name}
          placeholder={label}
          defaultValue={(project as Record<string, any>)[name] || ''}
          style={{
            width: '100%',
            resize: 'vertical',
            minHeight: '100px',
          }}
        ></textarea>
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

  const handleDeleteArea = (id: number) => {};

  const columns: Column[] = [
    {
      field: 'area',
      headerName: 'Área',
      type: 'string',
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      type: 'string',
      renderCell: (params) => {
        return (
          <div>
            <Button
              onClick={() => handleDeleteArea(params.row.id)}
              variant="contained"
              color="error"
            >
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  const areasRows = areas?.map((a: any) => ({
    id: a.area.id,
    area: a.area.area,
    activo: true,
  }));

  const onUpdatePersonalList = (personal: any) => {
    console.log(personal);
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

          <Grid size={{ xl: 12, lg: 12, md: 12, sm: 12 }}>
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
              { id, label, required, name, type, sizes: { lg, md, xl, sm } },
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

          {FORM_INPUTS_FIFTH_SECTION.map(
            (
              { id, label, required, name, type, sizes: { lg, md, xl, sm } },
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

          <Grid size={{ xl: 12, lg: 12, md: 12, sm: 12 }}>
            <hr style={{ border: '0.1rem solid rgba(0,0,0,0.2)' }} />
            <Typography variant="h6">Autores</Typography>
          </Grid>

          <Grid size={{ xl: 12, lg: 12, md: 12 }}>
            <Box>
              <PersonalTable
                personal={personal}
                onUpdatePersonalList={onUpdatePersonalList}
              />
            </Box>
          </Grid>

          <Grid size={{ xl: 12, lg: 12, md: 12, sm: 12 }}>
            <hr style={{ border: '0.1rem solid rgba(0,0,0,0.2)' }} />
            <Typography variant="h6">Áreas</Typography>
          </Grid>

          <Grid size={{ xl: 12, lg: 12, md: 12, sm: 12 }}>
            <Box>
              <CustomTable
                loading={false}
                columns={columns}
                data={areasRows || []}
                marginTop="0"
              />
            </Box>
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
