export interface CheckboxGroupProps {
  label: string;
  children: React.ReactNode;
  values: string[];
  onChange: (values: string[]) => void;
}

export interface CheckboxProps {
  onChange?: () => void;
  children: React.ReactNode;
  id: string;
  value: string;
  checked?: any;
}
