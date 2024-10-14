import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
export const InputField = ({
  inputName,
  control,
  textLabel,
  placeholder,
  className = "",
  inputType = "input",
  type = "text",
  ...props
}: any) => {
  return (
    <FormField
      control={control}
      name={inputName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{textLabel}</FormLabel>
          <FormControl>
            {inputType === "textArea" ? (
              <Textarea
                rows={10}
                className={className}
                placeholder={placeholder}
                {...field}
                {...props}
              />
            ) : (
              <Input
                type={type}
                className={className}
                placeholder={placeholder}
                {...field}
                {...props}
              />
            )}
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};
