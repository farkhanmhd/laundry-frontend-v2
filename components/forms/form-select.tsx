import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SelectOption = {
  label: string;
  value: string;
};

interface Props extends React.ComponentProps<typeof SelectTrigger> {
  label?: string;
  placeholder?: string;
  id: string;
  options: SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
}

export function FormSelect({
  options = [],
  label,
  placeholder = "Select an Item",
  id,
  value,
  onValueChange,
  ...props
}: Props) {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger id={id} {...props}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
