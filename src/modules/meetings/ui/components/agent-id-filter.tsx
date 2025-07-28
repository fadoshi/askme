import { useState } from "react";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { MAX_PAGE_SIZE } from "@/constants";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";


export const AgentIdFilter = () => {
    const [agentSearch, setAgentSearch] = useState("");
    const [filters, setFilters] = useMeetingsFilters();
    const trpc = useTRPC();

    const { data } = useQuery(trpc.agents.getMany.queryOptions({
        search: agentSearch,
        pageSize: MAX_PAGE_SIZE,

    }));

  return (
      <CommandSelect
          className="h-9"
          placeholder="Agent"
          options={(data?.items ?? []).map((agent) => ({
              id: agent.id,
              value: agent.id,
              children: (
                  <div className="flex items-center gap-x-2">
                      <GeneratedAvatar
                          seed={agent.name}
                          variant="botttsNeutral"
                          className="size-4"
                      />
                      {agent.name}
                  </div>
              )
          }))}
          onSelect={(value) => setFilters({ agentId: value })}
          onSearch={setAgentSearch}
          value={filters.agentId ?? ""}
      />
  )
};