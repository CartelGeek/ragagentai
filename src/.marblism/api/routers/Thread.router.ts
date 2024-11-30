/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@zenstackhq/runtime/models';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.ThreadInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).thread.createMany(input as any))),

        create: procedure.input($Schema.ThreadInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).thread.create(input as any))),

        deleteMany: procedure.input($Schema.ThreadInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).thread.deleteMany(input as any))),

        delete: procedure.input($Schema.ThreadInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).thread.delete(input as any))),

        findFirst: procedure.input($Schema.ThreadInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).thread.findFirst(input as any))),

        findMany: procedure.input($Schema.ThreadInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).thread.findMany(input as any))),

        findUnique: procedure.input($Schema.ThreadInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).thread.findUnique(input as any))),

        updateMany: procedure.input($Schema.ThreadInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).thread.updateMany(input as any))),

        update: procedure.input($Schema.ThreadInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).thread.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ThreadCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ThreadCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ThreadCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ThreadCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ThreadCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ThreadCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ThreadGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ThreadGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ThreadCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ThreadCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ThreadGetPayload<T>, Context>) => Promise<Prisma.ThreadGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ThreadDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ThreadDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ThreadDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ThreadDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ThreadDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ThreadDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ThreadGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ThreadGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ThreadDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ThreadDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ThreadGetPayload<T>, Context>) => Promise<Prisma.ThreadGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ThreadFindFirstArgs, TData = Prisma.ThreadGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ThreadFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ThreadGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ThreadFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ThreadFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ThreadGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ThreadGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ThreadFindManyArgs, TData = Array<Prisma.ThreadGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.ThreadFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ThreadGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ThreadFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ThreadFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ThreadGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ThreadGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ThreadFindUniqueArgs, TData = Prisma.ThreadGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ThreadFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ThreadGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ThreadFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ThreadFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ThreadGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ThreadGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ThreadUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ThreadUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ThreadUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ThreadUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ThreadUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ThreadUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ThreadGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ThreadGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ThreadUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ThreadUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ThreadGetPayload<T>, Context>) => Promise<Prisma.ThreadGetPayload<T>>
            };

    };
}
