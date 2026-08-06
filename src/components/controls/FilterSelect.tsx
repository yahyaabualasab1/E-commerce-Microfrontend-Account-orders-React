import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export type SelectOption<TValue extends string> = {
  label: string;
  value: TValue;
};

type FilterSelectProps<TValue extends string> = {
  label: string;
  value: TValue;
  options: SelectOption<TValue>[];
  onChange: (value: TValue) => void;
};

export function FilterSelect<TValue extends string>({
  label,
  value,
  options,
  onChange,
}: FilterSelectProps<TValue>) {
  const labelId = `${label.toLowerCase().replace(/\s+/g, '-')}-filter-label`;

  return (
    <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 180 } }}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        label={label}
        value={value}
        onChange={(event) => onChange(event.target.value as TValue)}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
