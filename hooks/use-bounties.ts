"use client";

import { useEffect, useState } from "react";

export const useBounties = (id?: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBounties = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          id ? `/api/bounties/${id}` : "/api/bounties"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch bounties");
        }
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBounties();
  }, [id]);

  return { data, loading, error };
};
