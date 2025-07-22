"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState} from "@/components/loading-state";
import { ErrorState } from "@/components/error-state copy";

export const AgentsView = () => {
    const trpc = useTRPC();
    const { data, isLoading, isError } = useQuery(trpc.agents.getMany.queryOptions());
         
    if (isLoading) {
        return (
        <div>
            <LoadingState
            title="Loding Agents"
            description="This may take a few seconds.."
             />
        </div>
        )
    }
    if (isError) {
        return (
        <div>
            <ErrorState 
            title="Error Loding Agents"
            description="Please try again later.."
            />
        </div>
        )
    }

    return (
        <div>
            {JSON.stringify(data, null, 2)}
        </div>
    )
}