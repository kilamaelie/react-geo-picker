/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { type FieldValues } from "react-hook-form";
import { countries } from "@/index";

interface CountryModalProps<T extends FieldValues> {
  showCountryModal: boolean;
  setShowCountryModal: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (text: string) => void;
}

export const CountryModal = <T extends FieldValues>({
  showCountryModal,
  setShowCountryModal,
  onChange,
}: CountryModalProps<T>) => {
  return (
    <Dialog open={showCountryModal} onOpenChange={setShowCountryModal}>
     
      <DialogContent className="max-w-md max-h-[80vh] h-[550px] flex flex-col min-h-0 overflow-y-hidden bg-card p-6 gap-0">
        <DialogHeader className="flex-shrink-0 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl tracking-tight font-semibold">
              Select Country
            </DialogTitle>
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        <ScrollArea className="h-[1px] min-h-0 flex-grow pr-4 -mr-4 border border-border/60 rounded-xl bg-background/40">
          <div className="divide-y divide-border/40 p-1">
            {countries.map((country) => (
              <div
                key={country.name}
                onClick={() => {
                  onChange(country.name);
                  setShowCountryModal(false);
                }}
                className="group flex items-center gap-4 px-4 py-3.5 hover:bg-muted/70 cursor-pointer transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                {/* Flag Canvas */}
                <div className="w-10 h-10 rounded-lg bg-muted group-hover:bg-background border border-border/40 flex items-center justify-center text-xl select-none transition-colors flex-shrink-0">
                  {country.flag}
                </div>

                {/* Text Metadata */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground tracking-tight truncate">
                    {country.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Code: {country.code}
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
