// 必要無くなった：headers の型エラーが起きたので、以下を参考に2行目を絞り込み
// 参考：https://qiita.com/does_not_exist/items/5de462705805f39fa963
export async function GET() {
  const res = await fetch(
    'https://opendata.resas-portal.go.jp/api/v1/prefectures',
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
