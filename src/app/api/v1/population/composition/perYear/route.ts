export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prefCode = searchParams.get('prefCode');
  const res = await fetch(
    `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.TOKEN!,
      },
    },
  );
  const data = await res.json();

  return Response.json({ data });
}
