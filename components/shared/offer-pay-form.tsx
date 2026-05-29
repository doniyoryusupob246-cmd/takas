import React from 'react';
import { Field, FieldGroup } from '../ui/field';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Banknote } from 'lucide-react';

interface Props {
  className?: string;
  cashAmount: string;
  setCashAmount: (val: string) => void;
  message: string;
  setMessage: (val: string) => void;
}

export const OfferPayForm: React.FC<Props> = ({
  cashAmount,
  setCashAmount,
  message,
  setMessage,
  className,
}) => {
  return (
    <div className="w-full bg-[#f6f6f6] p-8 mt-8 rounded-xl border">
      <h2 className="flex items-center gap-2">
        <Banknote size={20} />
        <span className="text-secondary text-[18px] font-medium">Nakit İlavesi (Opsiyonel)</span>
      </h2>
      <div className="mt-5 ">
        <FieldGroup>
          <Field className="relative">
            <span className=" absolute top-2 left-2.5 text-[16px] text-secondary">₺</span>
            <Input
              type="number"
              onChange={(e) => setCashAmount(e.target.value)}
              placeholder="0"
              value={cashAmount}
              className=" z-50 pl-6 w-full max-w-[200px] h-[40px]"
            />
          </Field>
          <Field className="">
            <Label className="mb-2 block">Mesaj (Opsiyonel)</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Mesaj Yazınız..."
              className="w-full min-h-[100px]"
            />
          </Field>
        </FieldGroup>
      </div>
    </div>
  );
};
