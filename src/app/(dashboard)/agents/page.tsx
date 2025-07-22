import { AgentsView } from "@/modules/agents/ui/views/agents-views";
//import { trpc, getQueryClient } from "@/trpc/server";
//import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

const Page = async () => {
    //const queryClient = getQueryClient();
    //void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

    return (
        <AgentsView />
        /* <HydrationBoundary state={dehydrate(queryClient)} >
             
        </HydrationBoundary> */
   
    )
};

export default Page;