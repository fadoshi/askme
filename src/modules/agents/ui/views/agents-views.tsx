"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState} from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { columns } from "../components/columns";
import { DataTable } from "../components/data-table";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { DataPagination } from "../components/data-pagination";
import { useRouter } from "next/navigation";


export const AgentsView = () => {
    const router = useRouter();
    const [filters, setFilters] = useAgentsFilters();
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters
    }));
     //useQuery can bring undefined data but useSuspenseQuery will already resolved data
     //No need to keep Loadiing state.  

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable 
            columns={columns} 
            data={data.items}
            onRowClick={(row) => router.push(`/agents/${row.id}`)} />
            <DataPagination 
            page={filters.page}
            totalPages={data.totalPages}
            onPageChange={(page) => setFilters({page})}
            />
            {data.items.length === 0 && (
                <EmptyState 
                title="Create your first agents"
                description="Create an agent to start your meetinng. Agent will fullfil its role to provide you appropriate guidence."
                />
            )}
        </div>
    );
};

export const AgentsViewLoading = () => {
    return (
         <LoadingState
            title="Loding Agents"
            description="This may take a few seconds.."
        />
    );
};
export const AgentsViewError = () => {
    return (
         <ErrorState
            title=" Error Loding Agents"
            description="Please try again later."
        />
    )

}