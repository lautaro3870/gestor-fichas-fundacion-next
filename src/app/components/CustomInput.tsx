import { ErrorInput } from '@/lib/interfaces';
import { Button, TextField } from '@mui/material';

type CustomInputProps = {
  label: string;
  value: string;
  handleClick: () => void;
  error: ErrorInput;
  handleChange: (value: any) => void;
};

export default function CustomInput({
  label,
  value,
  handleClick,
  error,
  handleChange,
}: CustomInputProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyItems: 'center',
        alignItems: 'flex-start',
        marginTop: '3rem',
        backgroundColor: '#f8f8f8',
        padding: '1.5rem',
        borderRadius: '1rem',
        border: '1px solid',
      }}
    >
      <TextField
        id="custom-input"
        label={label}
        variant="outlined"
        value={value}
        onChange={(e) => {

          handleChange(e);
        }}
        sx={{ width: '15rem' }}
        error={error.errorInput}
        size="small"
        helperText={error.errorMessage}
      />
      <Button
        variant="outlined"
        sx={{ marginLeft: '1rem', height: '2.5rem' }}
        onClick={handleClick}
      >
        Añadir
      </Button>
    </div>
  );
}
