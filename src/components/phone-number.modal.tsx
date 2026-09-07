/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
}  from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { type FieldValues } from "react-hook-form";
import { countries } from "@/index";



interface PhoneNumberModalProps<T extends FieldValues> {
  showPhoneNumberModal: boolean;
  setShowPhoneNumberModal: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (text: string) => void;
}

export const PhoneNumberModal = <T extends FieldValues>({
  showPhoneNumberModal,
  setShowPhoneNumberModal,
  onChange,
}: PhoneNumberModalProps<T>) => {
  return (
    <Dialog open={showPhoneNumberModal} onOpenChange={setShowPhoneNumberModal}>
      <DialogContent className="max-w-md max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Select Country Code</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="py-2">
            {countries.map((country) => (
              <div
                key={country.name}
                onClick={() => {
                  onChange(country.code);
                  setShowPhoneNumberModal(false);
                }}
                className="flex items-center gap-4 px-4 py-3.5 hover:bg-muted rounded-xl cursor-pointer transition-colors"
              >
                <span className="text-2xl">{country.flag}</span>
                <div className="flex-1">
                  <p className="font-medium">{country.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {country.code}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
