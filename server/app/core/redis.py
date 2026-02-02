from redis import Redis, exceptions

redis_client = Redis(
    host="localhost",
    port=6379,
    db=0,
    decode_responses=True
)

def get_redis_client():
    try:
        redis_client.ping()
        return redis_client
    except exceptions.ConnectionError as e:
        print("Redis connection error:", e)
        return None 