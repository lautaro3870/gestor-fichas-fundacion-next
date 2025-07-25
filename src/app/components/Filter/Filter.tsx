import { CustomSelectInterface, FilterInterface, Project } from '@/lib/interfaces';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Dispatch, lazy, SetStateAction, useEffect, useRef, useState } from 'react';
import CustomSelect from './CustomSelect';
import PrintIcon from '@mui/icons-material/Print';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import PrintHook from '@/app/proyectos/hooks/PrintHook';

type FilterProps = {
  filter: FilterInterface | null;
  setFilter: Dispatch<SetStateAction<FilterInterface>>;
  areasMapped: CustomSelectInterface[];
  departamentos: CustomSelectInterface[];
  getProjectsFiltered: (filter: FilterInterface) => void;
  projects: Project[];
};

export default function Filter({
  filter,
  setFilter,
  areasMapped,
  departamentos,
  getProjectsFiltered,
  projects
}: FilterProps) {
  const [departamento, setDepartamento] = useState('');
  const [areas, setAreas] = useState<CustomSelectInterface[]>([]);
  const [pdf, setPdf] = useState('');
  const [link, setLink] = useState('');
  const [errorDates, setErrorDates] = useState('');

  const formRef = useRef<HTMLFormElement>(null);

  const { printProjectsHook } = PrintHook();

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
    window.localStorage.setItem('filter', JSON.stringify(newFilter));
    setFilter(newFilter);
    getProjectsFiltered(newFilter);
  };

  const convertBooleanValue = (value: string) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return null;
  };

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const anioInicio = Number(formData.get('anioInicio')) || null;
    const anioFinalizacion = Number(formData.get('anioFinalizacion')) || null;

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
      link: convertBooleanValue(link),
      pdf: convertBooleanValue(pdf),
      pais: formData.get('pais')?.toString() || null,
    };
    window.localStorage.setItem('filter', JSON.stringify(newFilter));
    setFilter(newFilter);
    setDepartamento(newFilter.departamento || '');
    setAreas(newFilter.areas || []);
    setLink(newFilter.link?.toString() || '');
    setPdf(newFilter.pdf?.toString() || '');
    getProjectsFiltered(newFilter);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('filter');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setDepartamento(parsed.departamento || null);
          setAreas(parsed.areas || []);
          setLink(parsed.link?.toString() || '');
          setPdf(parsed.pdf?.toString() || '');
        } catch (e) {
          console.error('Error al parsear filtro desde localStorage', e);
        }
      }
    }
  }, []);

  const printProjects = () => {
    printProjectsHook(projects)
  }

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
        value={filter?.titulo || ''}
        onChange={handleInputChange}
        sx={{
          width: { xs: '8rem', sm: '8rem', md: '8rem', lg: '10rem' },
        }}
      />
      <TextField
        className="text-field"
        placeholder="Año desde"
        size="small"
        name="anioInicio"
        type="number"
        value={filter?.anioInicio || ''}
        sx={{
          width: { xs: '100%', sm: '8rem', md: '8rem', lg: '8rem' },
        }}
        error={Boolean(errorDates)}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          handleInputChange(e);
          setErrorDates('');
        }}
        helperText={errorDates}
      />
      <TextField
        className="text-field"
        placeholder="Año hasta"
        size="small"
        name="anioFinalizacion"
        type="number"
        value={filter?.anioFinalizacion || ''}
        sx={{
          width: { xs: '100%', sm: '8rem', md: '8rem', lg: '8rem' },
        }}
        error={Boolean(errorDates)}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          handleInputChange(e);
          setErrorDates('');
        }}
        helperText={errorDates}
      />
      <TextField
        className="text-field"
        placeholder="País/Región"
        size="small"
        name="pais"
        value={filter?.pais || ''}
        onChange={handleInputChange}
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
        selectValue={areas || []}
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
        onClick={printProjects}
      >
        <PrintIcon />
      </Button>
    </form>
  );
}
