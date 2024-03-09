export const dynamic = '/force-dynamic';

export async function GET(request:Request) {
    return Response.json({
        "status": 200,
        "data": {
            "message": "Hello from the server!!!"
        }
    })
}