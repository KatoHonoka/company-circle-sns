import React, { useEffect, useState } from "react";
import { supabase } from "../../createClient";
import { thread } from "../../types/thread";

function FetchEventThreads(id: number, eqName: string) {
  const [threads, setThreads] = useState<thread[]>([]);
  useEffect(() => {
    const fetchThread = async () => {
      let { data: threads, error } = await supabase
        .from("threads")
        .select(`id, threadTitle,  events(*)`)
        .eq(eqName, id);
      setThreads(threads as thread[]);
    };
    fetchThread();
  }, []);
  return threads;
}

export default FetchEventThreads;