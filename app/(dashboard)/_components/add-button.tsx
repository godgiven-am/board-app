"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export const AddButton = () => {
  return (
    <Dialog>
      <div className="aspect-square w-full h-full flex items-start p-3">
        <DialogTrigger>
          <Button className="bg-black h-10 w-10 rounded-md flex items-center justify-center p-5">
            <Plus className="text-white" />
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
        content
      </DialogContent>
    </Dialog>
  );
};
