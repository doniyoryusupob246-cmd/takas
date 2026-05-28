'use client';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface Category {
  id: number;
  name: string;
}

interface Props {
  className?: string;
  onValueChange: (value: string) => void;
  value: string;
  items: Category[];
  title: string;
}

export const SelectCategory: React.FC<Props> = ({
  title,
  items,
  value,
  onValueChange,
  className,
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Seçiniz" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          {items?.map((item) => (
            <SelectItem key={item.id} value={item.id.toString()}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
