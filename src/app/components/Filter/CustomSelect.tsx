import { CustomSelectInterface } from '@/lib/interfaces';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type CustomSelectProps = {
  inputLabel: string;
  selectValue:
    | string
    | number[]
    | CustomSelectInterface[]
    | boolean
    | null
    | undefined;
  selectName: string;
  selectItems: CustomSelectInterface[];
  handleSelectChange: (e: any, selectName: string) => void;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function CustomSelect({
  inputLabel,
  selectItems,
  selectName,
  selectValue,
  handleSelectChange,
}: CustomSelectProps) {
  return (
    <FormControl size="small">
      <InputLabel>{inputLabel}</InputLabel>
      <Select
        sx={{ width: { xs: '100%', sm: '8rem', md: '8rem', lg: '10rem' } }}
        size="small"
        name={selectName}
        value={selectValue || ''}
        onChange={(e: any) => handleSelectChange(e.target.value, selectName)}
        label={selectName}
        multiple={selectName === 'areas'}
        MenuProps={MenuProps}
      >
        <MenuItem key={-1} value="">
          Seleccione
        </MenuItem>
        {selectItems.map((item: CustomSelectInterface, index) => (
          <MenuItem key={index} value={item.id}>
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
