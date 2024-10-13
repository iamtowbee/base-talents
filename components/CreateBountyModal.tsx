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
import { FundAccountButton } "./FundAccountButton";
import { SubmitButton } "./SubmitButton";

export default function CreateBountyModal() {
  const [date, setDate] = React.useState<Date>();
  //const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const { toast } = useToast();

  //TODO
  // So I want to add the bounty data that are stored in caled in handleSubmit in the components: <FundAccountButton> and  <SubmitButton/> that are in the return statements
  //Please help me provide them and pass it to the those components. They are 3 variables: reward token (address), reward amount (number) and number of claims (number).

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const bountyData = {
      title: formData.get("title") as string,
      details: formData.get("details") as string,
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
        setDate(undefined); // Reset date
        setModalOpen(false); // Close modal
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

  const handleError = (err: TransactionError) => {
    console.error('Transaction error:', err);
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log('Transaction successful', response);
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
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
            <Label htmlFor="task">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter task description"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="task">Bounty Details</Label>
            <Input
              id="details"
              name="details"
              placeholder="Enter task description"
              required
            />
          </div>
          <div className="space-y-0 flex items-center justify-between gap-4">
            <div>
              <Label htmlFor="reward-amount">Reward Amount</Label>
              <Input
                id="reward-amount"
                name="reward-amount"
                type="number"
                placeholder="Enter reward amount"
                required
              />
            </div>
            <div>
              <Label htmlFor="reward-token">Reward Token</Label>
              <Input
                id="reward-token"
                name="reward-token"
                placeholder="Enter reward token"
                className="placeholder:normal-case uppercase"
                required
              />
            </div>
          </div>
          {/* <div className="space-y-2">
            
          </div> */}
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
          {/* Include the variables from TODO here
            <FundAccountButton amount= />
            <SubmitButton token=  amount=  claims= />
            */}
        </form>
      </DialogContent>
    </Dialog>
  );
}
