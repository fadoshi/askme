import { z } from "zod";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentsInsertSchema, agentsUpdateSchema } from "../schema";
import { and, eq,sql, getTableColumns, ilike, desc, count } from "drizzle-orm";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MIN_PAGE_SIZE, MAX_PAGE_SIZE } from "@/constants";

export const agentsRouter = createTRPCRouter({

    remove: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const [removedAgent] = await db
            .delete(agents)
            .where(
                and(
                    eq(agents.id, input.id),
                    eq(agents.userId, ctx.auth.user.id)
                )
            )
            .returning();
        if (!removedAgent) {
            throw new TRPCError({
                code: "NOT_FOUND", 
                message: "Agent not fount",
            })
        }
        return removedAgent;
    }),

    update: protectedProcedure
        .input(agentsUpdateSchema)
        .mutation(async ({ input, ctx }) => {
            const [updatedAgent] = await db
            .update(agents)
            .set(input)
            .where(
                and(
                    eq(agents.id, input.id),
                    eq(agents.userId, ctx.auth.user.id)
                )
            )
            .returning();
        if (!updatedAgent) {
            throw new TRPCError({
                code: "NOT_FOUND", 
                message: "Agent not fount",
            })
        }
        return updatedAgent;
    }),

    getOne: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            const [existingAgent] = await db
                .select({
                    ...getTableColumns(agents),
                    meetingCount: sql<number>`5`,
                })
                .from(agents)
                .where(
                    and(
                        eq(agents.id, input.id),
                        eq(agents.userId, ctx.auth.user.id),
                    )
                )
            if (!existingAgent){
                throw new TRPCError({code: "NOT_FOUND", message: "Agent not found"})
            }
            return existingAgent;
        }),

    getMany: protectedProcedure
        .input(z.object({ 
                page: z.number().default(DEFAULT_PAGE),
                pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
                search: z.string().nullish()
            })
        )
        .query(async ({ input, ctx }) => {
            const {search, page, pageSize } = input;
            const data = await db
                .select({
                    ...getTableColumns(agents),
                    meetingCount: sql<number>`5`,
                })
                .from(agents)
                .where(
                    and(
                        eq(agents.userId, ctx.auth.user.id),
                        search? ilike(agents.name, `%${search}`) :undefined
                    )
                )
                .orderBy(desc(agents.createdAt), desc(agents.id))
                .limit(pageSize)
                .offset((page -1)* pageSize)
                const [total] = await db
                    .select({ count: count()})
                    .from(agents)
                    .where(
                        and(
                            eq(agents.userId, ctx.auth.user.id),
                            search? ilike(agents.name, `%${search}`) :undefined
                        )
                    );
                const totalPages = Math.ceil(total.count / pageSize)

            return {
                items: data,
                total: total.count,
                totalPages,
            };
        }),

    create: protectedProcedure
        .input(agentsInsertSchema)
        .mutation(async ({ input, ctx }) => {
            const [createdAgent] = await db
                .insert(agents)
                .values({
                    ...input,
                    userId: ctx.auth.user.id,
                })
                .returning();

            return createdAgent;
        }),
});