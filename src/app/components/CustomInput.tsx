import { Button, TextField } from '@mui/material';

type CustomInputProps = {
  label: string;
  value: string;
  setValue: (value: any) => void;
  handleClick: () => void;
  error: boolean;
  setError: (value: boolean) => void;
};

export default function CustomInput({
  label,
  value,
  setValue,
  handleClick,
  error,
  setError,
}: CustomInputProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyItems: 'center',
        alignItems: 'center',
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
          setValue(e);
          setError(false);
        }}
        sx={{ width: '15rem' }}
        error={error}
        size='small'
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
