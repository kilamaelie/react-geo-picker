/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { type FieldValues } from "react-hook-form";
import { countries } from "@/index";

interface CitiesModalProps<T extends FieldValues> {
  showCitiesModal: boolean;
  setShowCitiesModal: React.Dispatch<React.SetStateAction<boolean>>;
  country: string;
  onChange: (text: string) => void;
}

export const CitiesModal = <T extends FieldValues>({
  showCitiesModal,
  setShowCitiesModal,
  country,
  onChange,
}: CitiesModalProps<T>) => {
  const selectedCountry = countries.find((c:any) => c.name === country);
  const cityList = selectedCountry?.cities || [];

  return (
    <Dialog open={showCitiesModal} onOpenChange={setShowCitiesModal}>
      <DialogContent className="max-w-md max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Select City</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="py-2">
            {cityList.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No cities available for this country
              </p>
            ) : (
              cityList.map((city) => (
                <div
                  key={city}
                  onClick={() => {
                    onChange(city);
                    setShowCitiesModal(false);
                  }}
                  className="px-4 py-3.5 hover:bg-muted rounded-xl cursor-pointer transition-colors"
                >
                  {city}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
