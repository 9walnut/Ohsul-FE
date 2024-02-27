export interface CheckboxGroupProps {
  label: string;
  children: React.ReactNode;
  values: number[];
  onChange: (values: number[]) => void;
  disabled?: boolean;
}

export interface CheckboxProps {
  onChange?: () => void;
  children: React.ReactNode;
  id: string;
  value: number;
  checked?: any;
  disabled?: boolean;
}
