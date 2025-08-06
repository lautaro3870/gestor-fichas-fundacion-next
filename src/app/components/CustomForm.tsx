'use client';
import {
  FORM_INPUTS_FIFTH_SECTION,
  FORM_INPUTS_FIRST_SECTION,
  FORM_INPUTS_FOURTH_SECTION,
  FORM_INPUTS_SECOND_SECTION,
  FORM_INPUTS_SIXTH_SECTION,
  FORM_INPUTS_THIRD_SECTION,
} from '@/lib/constants';
import {
  Area,
  Column,
  CreateOrUpdateProject,
  CreatePersonal,
  CustomSelectInterface,
  PersonalInterface,
  Project,
} from '@/lib/interfaces';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
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
import CustomSelect from './Filter/CustomSelect';
import Link from 'next/link';

type CustomFormProps = {
  project: Project;
  areas: Area[] | undefined;
  personal: PersonalInterface[] | undefined;
  areasSelect: CustomSelectInterface[];
  handleFormData: (formData: CreateOrUpdateProject) => void;
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
  areasSelect,
  handleFormData,
}: CustomFormProps) {
  const [projectData, setProjectData] = useState<Project>({} as Project);
  const [formData, setFormData] = useState<CreateOrUpdateProject>(
    {} as CreateOrUpdateProject
  );

  const [areasList, setAreasList] = useState<Area[] | undefined>(areas);
  const [personalList, setPersonalList] = useState<
    CreatePersonal[] | undefined
  >(personal);

  const [isProjectReady, setIsProjectReady] = useState(false);
  const [errorSelect, setErrorSelect] = useState('');

  useEffect(() => {
    setFormData(formData);
    setProjectData(project);
    setAreasList(
      areas?.map((a: any) => ({
        id: a.area.id,
        area: a.area.area,
        activo: a.activo,
      }))
    );
    setPersonalList(
      personal?.map((p: any) => ({
        id: p.personal.id,
        nombre: p.personal.nombre,
        consultorAsociado: p.consultorAsociado,
        coordinador: p.coordinador,
        investigador: p.investigador,
        subCoordinador: p.subCoordinador,
      }))
    );
    setIsProjectReady(Boolean(project.fichaLista));
  }, [project, areas, personal]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { areasxProyecto, equipoxProyecto, ...rest } = projectData;
    const projectObject: CreateOrUpdateProject = {
      ...rest,
      areas: areasList?.map((a: any) => ({ idArea: a.id })) || [],
      equipo: personalList || [],
    };
    if (!rest.certificadoPor && rest.fichaLista) {
      setErrorSelect('Seleccione un validador');
      return;
    }
    handleFormData(projectObject);
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
        <FormControl
          fullWidth
          size="small"
          key={index}
          error={name === 'certificadoPor' ? Boolean(errorSelect) : false}
        >
          <InputLabel>{label}</InputLabel>
          <Select
            fullWidth
            size="small"
            name={name}
            label={label}
            value={projectData[name as keyof Project] ?? ''}
            disabled={name === 'certificadoPor' ? !isProjectReady : false}
            onChange={(e) => {
              if (name === 'certificadoPor') {
                setErrorSelect('');
              }
              setProjectData((prev) => ({ ...prev, [name]: e.target.value }));
            }}
          >
            {options.map(({ id, value }, idx) => (
              <MenuItem key={idx} value={id}>
                {value}
              </MenuItem>
            ))}
          </Select>
          {Boolean(errorSelect) ? (
            <FormHelperText>{errorSelect}</FormHelperText>
          ) : null}
        </FormControl>
      );
    }

    if (type === 'checkbox') {
      return (
        <FormControlLabel
          control={
            <Checkbox
              name={name}
              checked={Boolean(projectData[name as keyof Project])}
              onChange={(e) => {
                if (name === 'fichaLista') {
                  setErrorSelect('');
                  setIsProjectReady(e.target.checked);
                  if (!e.target.checked) {
                    setProjectData((prev) => ({
                      ...prev,
                      certificadoPor: -1,
                    }));
                  }
                }
                setProjectData((prev) => ({
                  ...prev,
                  [name]: e.target.checked,
                }));
              }}
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
        value={projectData[name as keyof Project] ?? ''}
        onChange={(e) =>
          setProjectData((prev) => ({ ...prev, [name]: e.target.value }))
        }
      />
    );
  };

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

  const handleDeleteArea = (id: number) => {
    const newList = areasList?.filter((a: any) => a.id !== id);
    setAreasList(newList);
  };

  const onUpdatePersonalList = (personal: any) => {
    setPersonalList(
      personal.map((p: any) => ({
        id: p.personal.id,
        nombre: p.personal.nombre,
        consultorAsociado: p.consultorAsociado,
        coordinador: p.coordinador,
        investigador: p.investigador,
        subCoordinador: p.subCoordinador,
      }))
    );
  };

  const handleSelectChange = (e: any) => {
    if (!e) {
      return;
    }
    const areaSelected = areasSelect?.find((a: any) => a.id === e);
    const areaMapped = {
      id: areaSelected?.id ? +areaSelected.id : 0,
      area: areaSelected?.value || '',
      activo: true,
    };

    const areaFind = areasList?.find((a: any) => a.id === areaMapped.id);
    if (areaFind) {
      return;
    }
    setAreasList(areasList ? [...areasList, areaMapped] : [areaMapped]);
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
              <CustomSelect
                inputLabel="Áreas"
                selectName="areas"
                selectValue={[]}
                selectItems={areasSelect}
                sizes={{ xs: '100%', sm: '20rem', md: '20rem', lg: '30rem' }}
                isFromForm={true}
                handleSelectChange={handleSelectChange}
              />
            </Box>
          </Grid>

          <Grid size={{ xl: 12, lg: 12, md: 12, sm: 12 }}>
            <Box>
              <CustomTable
                loading={false}
                columns={columns}
                data={areasList || []}
                marginTop="0"
              />
            </Box>
          </Grid>

          <Grid size={{ xl: 12, lg: 12, md: 12, sm: 12 }}>
            <hr style={{ border: '0.1rem solid rgba(0,0,0,0.2)' }} />
          </Grid>

          {FORM_INPUTS_SIXTH_SECTION.map(
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

          <Grid
            size={{ xs: 12 }}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Button variant="contained" type="submit">
              Guardar
            </Button>
            <Link href={'/proyectos'}>
              <Button
                variant="contained"
                color="error"
                sx={{ marginLeft: '2rem' }}
                type="button"
              >
                Cancelar
              </Button>
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
