from redis import Redis, exceptions
from upstash_redis import Redis as UpstashRedis
import os

env = os.getenv("ENV")

if env == "developement":
    host = os.getenv("REDIS_HOST")
    port = os.getenv("REDIS_PORT")

    redis_client = Redis(
        host=host,
        port=port,
        db=0,
        decode_responses=True
    )
else:
    redis_url = os.getenv("UPSTASH_REDIS_REST_URL")
    redis_token = os.getenv("UPSTASH_REDIS_REST_TOKEN")

    redis_client = UpstashRedis(
        url=redis_url,
        token=redis_token
        )


def get_redis_client():
    try:
        redis_client.ping()
        return redis_client
    except exceptions.ConnectionError as e:
        print("Redis connection error:", e)
        return None 