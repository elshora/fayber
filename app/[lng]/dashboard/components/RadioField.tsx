import React from "react";
import { Controller, Control } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupFieldProps {
  name: string;
  control: Control<any>;
  options: RadioOption[];
  label: string;
}

const RadioGroupField: React.FC<RadioGroupFieldProps> = ({
  name,
  control,
  options,
  label,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <Label className="font-bold text-[24px]">{label}</Label>
          <RadioGroup
            className="flex items-center justify-start gap-x-10 mb-5 mt-3"
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}
    />
  );
};

export default RadioGroupField;
