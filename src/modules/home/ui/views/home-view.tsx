'use client'

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export const HomeView = () => {
    const trpc = useTRPC();
    const {data}  = useQuery(trpc.hello.queryOptions({text: "Foram"}));
  return (
      <div className="flex flex-col p-4 gap-y-4">
        <div>{data?.greeting}</div>
        <Button >Sign Out</Button>
      </div>
  );
}


