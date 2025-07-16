import { CustomSelectInterface, FilterInterface } from '@/lib/interfaces';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import CustomSelect from './CustomSelect';
import PrintIcon from '@mui/icons-material/Print';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

type FilterProps = {
  filter: FilterInterface | null;
  setFilter: Dispatch<SetStateAction<FilterInterface>>;
  areasMapped: CustomSelectInterface[];
  departamentos: CustomSelectInterface[];
};

export default function Filter({
  filter,
  setFilter,
  areasMapped,
  departamentos,
}: FilterProps) {
  const [departamento, setDepartamento] = useState('');
  const [areas, setAreas] = useState<CustomSelectInterface[]>([]);
  const [pdf, setPdf] = useState('');
  const [link, setLink] = useState('');
  const [errorDates, setErrorDates] = useState('');

  const formRef = useRef<HTMLFormElement>(null);

  const handleSelectChange = (e: any, selectName: string) => {
    if (selectName === 'departamento') {
      setDepartamento(e);
    } else {
      setAreas(e);
    }
  };

  const handleCleanFilters = () => {
    if (formRef.current) {
      formRef.current.reset();
    }

    setErrorDates('');
    setAreas([]);
    setDepartamento('');
    setPdf('');
    setLink('');

    const newFilter: FilterInterface = {
      titulo: null,
      anioFinalizacion: null,
      anioInicio: null,
      areas: null,
      departamento: null,
      link: null,
      pdf: null,
      pais: null,
    };
    setFilter(newFilter);
  };

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const anioInicio = Number(formData.get('anioDesde')) || null;
    const anioFinalizacion = Number(formData.get('anioHasta')) || null;

    if (Number(anioFinalizacion) < Number(anioInicio)) {
      setErrorDates('Error en las fechas');
      return;
    }

    const newFilter: FilterInterface = {
      titulo: formData.get('titulo')?.toString() || null,
      anioFinalizacion,
      anioInicio,
      areas: areas || null,
      departamento: departamento || null,
      link: Boolean(link) || null,
      pdf: Boolean(pdf) || null,
      pais: formData.get('pais')?.toString() || null,
    };
    setFilter(newFilter);
  };

  return (
    <form
      ref={formRef}
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
        className="text-field"
        placeholder="Título"
        size="small"
        name="titulo"
        sx={{
          width: { xs: '8rem', sm: '8rem', md: '8rem', lg: '10rem' },
        }}
      />
      <TextField
        className="text-field"
        placeholder="Año desde"
        size="small"
        name="anioDesde"
        type="number"
        sx={{
          width: { xs: '100%', sm: '8rem', md: '8rem', lg: '10rem' },
        }}
        error={Boolean(errorDates)}
        onChange={() => setErrorDates('')}
        helperText={errorDates}
      />
      <TextField
        className="text-field"
        placeholder="Año hasta"
        size="small"
        name="anioHasta"
        type="number"
        sx={{
          width: { xs: '100%', sm: '8rem', md: '8rem', lg: '10rem' },
        }}
        error={Boolean(errorDates)}
        onChange={() => setErrorDates('')}
        helperText={errorDates}
      />
      <TextField
        className="text-field"
        placeholder="País/Región"
        size="small"
        name="pais"
        sx={{
          width: { xs: '100%', sm: '8rem', md: '8rem', lg: '10rem' },
        }}
      />
      <CustomSelect
        inputLabel="Departamento"
        selectName="departamento"
        selectValue={departamento}
        selectItems={departamentos}
        handleSelectChange={handleSelectChange}
      />
      <CustomSelect
        inputLabel="Áreas"
        selectName="areas"
        selectValue={areas}
        selectItems={areasMapped}
        handleSelectChange={handleSelectChange}
      />
      <FormControl size="small">
        <InputLabel>Pdf</InputLabel>
        <Select
          sx={{ width: { xs: '100%', sm: '8rem', md: '8rem', lg: '6rem' } }}
          size="small"
          name="Pdf"
          value={pdf}
          onChange={(e: any) => setPdf(e.target.value)}
          label="Pdf"
        >
          <MenuItem key={-1} value="" selected>
            Seleccione
          </MenuItem>
          <MenuItem key={0} value="true">
            Tiene pdf
          </MenuItem>
          <MenuItem key={1} value="false">
            No tiene pdf
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small">
        <InputLabel>Link</InputLabel>
        <Select
          sx={{ width: { xs: '100%', sm: '8rem', md: '8rem', lg: '6rem' } }}
          size="small"
          name="Link"
          value={link}
          onChange={(e: any) => setLink(e.target.value)}
          label="Link"
        >
          <MenuItem key={-1} value="" selected>
            Seleccione
          </MenuItem>
          <MenuItem key={0} value="true">
            Tiene link
          </MenuItem>
          <MenuItem key={1} value="false">
            No tiene link
          </MenuItem>
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        sx={{ marginLeft: '0.2rem', height: '2.5rem' }}
      >
        <SearchIcon />
      </Button>
      <Button
        type="button"
        variant="contained"
        color="error"
        sx={{ marginLeft: '0.2rem', height: '2.5rem' }}
        onClick={handleCleanFilters}
      >
        <ClearIcon />
      </Button>
      <Button
        type="button"
        variant="contained"
        color="inherit"
        sx={{ marginLeft: '0.2rem', height: '2.5rem' }}
      >
        <PrintIcon />
      </Button>
    </form>
  );
}
