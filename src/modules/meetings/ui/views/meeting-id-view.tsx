"use client";

import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { LoadingState} from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
//import { GeneratedAvatar } from "@/components/generated-avatar";
//import { Badge } from "@/components/ui/badge";
//import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";
import { UpcomingState } from "../components/upcoming-state";
import { ActiveState } from "../components/active-state";
import { CancelledState } from "../components/cancelled-state";
import { ProcessingState } from "../components/processing-state";
import { CompletedState } from "../components/completed-state";

interface Props {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);
  const { data } = useSuspenseQuery(trpc.meetings.getOne.queryOptions({ id: meetingId }));

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        // Invalidate free tier usage
        /* await queryClient.invalidateQueries(
                    trpc.premium.getFreeUsage.queryOptions(),
                );  */
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }),
  );

  const [RemoveComfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    `The follwing action will remove this meetings. `
  );

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();
    if (!ok) return;
    await removeMeeting.mutateAsync({id: meetingId})
  };

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCancelled = data.status === "cancelled";
  const isCompleted = data.status === "completed";
  const isProcessing = data.status === "processing";

  return (
    <>
    <RemoveComfirmation />
    <UpdateMeetingDialog
      open={updateMeetingDialogOpen}
      onOpenChange={setUpdateMeetingDialogOpen}
      initialValues={data}
    />
    <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
      <MeetingIdViewHeader
        meetingId={meetingId}
        meetingName={data.name}
        onEdit={() => {setUpdateMeetingDialogOpen(true)}}
        onRemove={handleRemoveMeeting}
      />
      {isCancelled && <CancelledState />}
      {isProcessing && <ProcessingState />}
      {isCompleted && <CompletedState data={data} />}
      {isUpcoming && <UpcomingState
      meetingId={meetingId}
      onCancelMeeting={()=> {}} 
      isCancelling={false}
      />}
      {isActive && <ActiveState 
      meetingId={meetingId}
      />}
    </div>
    </>
  );
};

export const MeetingIdViewLoading = () => {
    return (
         <LoadingState
            title="Loding Meeting"
            description="This may take a few seconds.."
        />
    );
};
export const MeetingIdViewError = () => {
    return (
         <ErrorState
            title="Error Loding Meeting"
            description="Please try again later."
        />
    )

}