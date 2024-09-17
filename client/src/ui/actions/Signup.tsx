import { useCallback, useMemo, useState } from "react";
import { useDojo } from "@/dojo/useDojo";
import { usePlayer } from "@/hooks/usePlayer";
import { Button } from "../elements/button";
import { Input } from "../elements/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/ui/elements/dialog"

export const Signup = () => {
  const {
    account: { account },
    setup: {
      systemCalls: { signup },
    },
  } = useDojo();

  const [name, setName] = useState<string>("");

  const { player } = usePlayer({ playerId: account.address });

  const disabled = useMemo(() => !name, [name]);
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 14) return;
    setName(e.target.value)
  }, [setName]);

  if (!!player) return null;

  return (

    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-xl">Signup</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-3xl">Signup</DialogTitle>
          <DialogDescription className="text-md">
            Create your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Input className="text-xl" value={name} placeholder={"Username"} onChange={handleChange} />
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={disabled} onClick={() => signup({ account, name })}>
              Save
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
