import { Area, CustomSelectInterface } from '@/lib/interfaces';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type CustomSelectProps = {
  inputLabel: string;
  selectValue:
    | string
    | number[]
    | CustomSelectInterface[]
    | boolean
    | null
    | undefined
    | Area[];
  selectName: string;
  selectItems: CustomSelectInterface[];
  sizes: { lg: string; md: string; sm: string; xs: string };
  isFromForm: boolean;
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
  sizes,
  isFromForm,
  handleSelectChange,
}: CustomSelectProps) {
  const { lg, md, xs, sm } = sizes;
  return (
    <FormControl size="small">
      <InputLabel>{inputLabel}</InputLabel>
      <Select
        sx={{ width: { xs, sm, md, lg } }}
        size="small"
        name={selectName}
        value={selectValue || ''}
        onChange={(e: any) => handleSelectChange(e.target.value, selectName)}
        label={selectName}
        multiple={isFromForm ? false : selectName === 'areas'}
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
