export function jsonResponse(
  data: any = null,
  status: number = 200,
  message: string = ""
) {
  return new Response(
    JSON.stringify({ success: status < 400, message, data }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}
