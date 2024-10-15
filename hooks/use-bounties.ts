"use client";

import { NEXT_PUBLIC_URL } from "@/config";
import { Bounty } from "@/models/Bounty";
import { useEffect, useState, useCallback } from "react";

export const useBounties = (id?: string) => {
  const [data, setData] = useState<Bounty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBounties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        id ? `${NEXT_PUBLIC_URL}/api/bounty/${id}` : "/api/bounties"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch bounties");
      }
      const bounties = await response.json();
      setData(bounties);
    } catch (err: any) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBounties();
  }, [fetchBounties]);

  const retry = useCallback(() => {
    fetchBounties();
  }, [fetchBounties]);

  return { data, loading, error, retry };
};
