export async function safeFetch<T>(promise: Promise<T[]>): Promise<T[]> {
  try {
    return await promise;
  } catch (err) {
    console.error("data load error:", err);
    return [];                     // fallback so UI can still render
  }
}
