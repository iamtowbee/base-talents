"use client";

import { NEXT_PUBLIC_URL } from "@/config";
import { Bounty } from "@/models/Bounty";
import { useEffect, useState, useCallback } from "react";

type FetchType = "all" | "single" | "user";

interface UseBountiesOptions {
  type: FetchType;
  id?: string;
  userId?: string;
}

type BountiesResult<T extends FetchType> = T extends "all" | "user"
  ? Bounty[]
  : T extends "single"
    ? Bounty
    : never;

export const useBounties = <T extends FetchType>({
  type,
  id,
  userId,
}: UseBountiesOptions) => {
  const [data, setData] = useState<BountiesResult<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBounties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${NEXT_PUBLIC_URL}/api/bounties`;

      switch (type) {
        case "single":
          if (!id)
            throw new Error("ID is required for fetching a single bounty");
          url += `/single/${id}`;
          break;
        case "user":
          if (!userId)
            throw new Error("User ID is required for fetching user bounties");
          url += `/user/${userId}`;
          break;
        case "all":
          // URL remains as is
          break;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch bounties");
      }
      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  }, [type, id, userId]);

  useEffect(() => {
    fetchBounties();
  }, [fetchBounties]);

  const retry = useCallback(() => {
    fetchBounties();
  }, [fetchBounties]);

  return { data, loading, error, retry };
};