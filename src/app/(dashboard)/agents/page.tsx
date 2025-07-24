import { AgentsView, AgentsViewLoading, AgentsViewError  } from "@/modules/agents/ui/views/agents-views";
import { AgentsListHeader } from "@/modules/agents/ui/components/agent-list-header";
import { auth } from "@/lib/auth";
import {headers } from "next/headers";
import { redirect } from "next/navigation";
import {Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { trpc, getQueryClient } from "@/trpc/server";
import type { SearchParams } from "nuqs";
import { loadSearchParams } from "@/modules/agents/params";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
  searchParams: Promise<SearchParams>;

}

const Page = async ({ searchParams }: Props ) => {
  const filters = await loadSearchParams(searchParams);
    const session = await auth.api.getSession({
          headers: await headers(),
        });    
        if (!session) {
          redirect("/sign-in")
        }

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
      ...filters,
    }));

  return (
    <>
    <AgentsListHeader />
    <HydrationBoundary state={dehydrate(queryClient)} >
      <Suspense fallback={<AgentsViewLoading />}>
        <ErrorBoundary fallback={<AgentsViewError />}>          
          <AgentsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
    </>
  );
};

export default Page;