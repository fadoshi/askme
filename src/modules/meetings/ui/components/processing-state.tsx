import {EmptyState} from "@/components/empty-state";

export const ProcessingState = () => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/logo.svg"
        title="Meeting completed"
        description="Summury will be accessible soon"
      />
    </div>
  )
}