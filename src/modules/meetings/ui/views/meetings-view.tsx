"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState} from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { DataTable } from "@/components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { DataPagination } from "@/components/data-pagination";
import { useRouter } from "next/navigation";


export const MeetingsView = () => {
    const router = useRouter();
    const [filters, setFilters] = useMeetingsFilters();
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({ ...filters }));
     //useQuery can bring undefined data but useSuspenseQuery will already resolved data
     //No need to keep Loadiing state.  

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable 
            data={data.items}
            columns={columns}
            onRowClick={(row) => router.push(`/meetings/${row.id}`)}
            />
            <DataPagination 
            page={filters.page}
            totalPages={data.totalPages}
            onPageChange={(page) => setFilters({page})}
            />
            {data.items.length === 0 && (
                <EmptyState 
                title="Create your first meeting"
                description="Schedual a meeting to collaborate, share ideas, and interact with participants in real time."
                />
            )}
            
        </div>
    );
};

export const MeetingsViewLoading = () => {
    return (
         <LoadingState
            title="Loding Meeting"
            description="This may take a few seconds.."
        />
    );
};
export const MeetingsViewError = () => {
    return (
         <ErrorState
            title=" Error Loding meetings"
            description="Please try again later."
        />
    )

}