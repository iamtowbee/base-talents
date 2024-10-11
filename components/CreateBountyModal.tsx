"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { IoAddOutline } from "react-icons/io5";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function CreateBountyModal() {
  const [date, setDate] = React.useState<Date>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const bountyData = {
      task: formData.get("task") as string,
      rewardAmount: formData.get("reward-amount") as string,
      rewardToken: formData.get("reward-token") as string,
      endsOn: date?.toISOString(),
    };

    try {
      const response = await fetch("/api/bounties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bountyData),
      });

      if (response.ok) {
        toast({
          title: "Bounty created",
          description: "Your bounty has been successfully created.",
        });
        // Reset form or close modal here
      } else {
        throw new Error(`API response not OK: ${response.text()}`);
      }
    } catch (error) {
      console.error("Error creating bounty:", error);
      toast({
        title: "Error",
        description: `Failed to create bounty. Please try again. ${error}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="whitespace-nowrap">
          <IoAddOutline className="mr-2 h-4 w-4" />
          Create Bounty
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Bounty</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="task">Task</Label>
            <Input
              id="task"
              name="task"
              placeholder="Enter task description"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reward-amount">Reward Amount</Label>
            <Input
              id="reward-amount"
              name="reward-amount"
              type="number"
              placeholder="Enter reward amount"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reward-token">Reward Token</Label>
            <Input
              id="reward-token"
              name="reward-token"
              placeholder="Enter reward token"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ends-on">Ends On</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="ends-on"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                <Select
                  onValueChange={(value) =>
                    setDate(addDays(new Date(), parseInt(value)))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="0">Today</SelectItem>
                    <SelectItem value="1">Tomorrow</SelectItem>
                    <SelectItem value="3">In 3 days</SelectItem>
                    <SelectItem value="7">In a week</SelectItem>
                  </SelectContent>
                </Select>
                <div className="rounded-md border">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Submit Bounty"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
