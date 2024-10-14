import {  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
interface Props {
  items: { trigger: string; item: React.ReactNode }[];
}
export function AccordionField({ items }: Props) {
  return (
    <Accordion type="single" collapsible className="w-full py-0">
      {items.map((item, index) => {
        return (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger className="py-0">{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.item}</AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
