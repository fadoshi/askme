import { MeetingsView, MeetingsViewLoading, MeetingsViewError  } from "@/modules/meetings/ui/views/meetings-view";
import {Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { trpc, getQueryClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { MeetingsListHeader } from "@/modules/meetings/ui/components/meeting-list-header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { loadSearchParams } from "@/modules/meetings/params";
import type { SearchParams } from "nuqs/server";

interface Props {
    searchParams: Promise<SearchParams>
;}

const Page = async ({searchParams}: Props) => {
    const filters = await loadSearchParams(searchParams);
    //make route protected
    const session = await auth.api.getSession({
              headers: await headers(),
            });    
            if (!session) {
              redirect("/sign-in")
            }
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({ ...filters }));

    return (
        <>
        <MeetingsListHeader />
        <HydrationBoundary state={dehydrate(queryClient)} >
            <Suspense fallback={<MeetingsViewLoading />}>
                <ErrorBoundary fallback={<MeetingsViewError />}>
                    <MeetingsView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
        </>

    );
};

export default Page;