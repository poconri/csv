

export async function POST(request:Request) {
    const data = await request.json();
    return Response.json({
        "status": 200,
        "data": {
            "message": `Hello from the server!!! ${data.name}`
        }
    })
}