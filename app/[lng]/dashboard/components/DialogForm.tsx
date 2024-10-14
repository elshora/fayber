import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { closeDialog, openDialog } from "@/lib/features/dialog/dialogSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export function DialogForm({
  title,
  Icon,
  FormComponent,
  type = "add",
}: any) {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.dialog.open);

  const handleDialogOpen = () => {
    dispatch(openDialog());
  };

  const handleDialogClose = () => {
    dispatch(closeDialog());
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (open ? handleDialogOpen() : handleDialogClose())}>
      <DialogTrigger asChild>
        {type === "add" ? (
          <Button
            variant="default"
            className="ps-5 py-2 pe-8"
            onClick={handleDialogOpen}
          >
            <Icon size={20} strokeWidth={1.5} className="me-2" /> {title}
          </Button>
        ) : (
          <Button variant={"ghost"} onClick={handleDialogOpen}>
            <Icon size={20} strokeWidth={1.5} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-scroll grid gap-4 py-4">
          {FormComponent}
        </div>
      </DialogContent>
    </Dialog>
  );
}
