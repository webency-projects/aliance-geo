import os


class Settings:
    KAFKA_BROKER_URL: str = os.environ.get("KAFKA_BOOTSTRAP_SERVERS")
    TO_PROCESS_TOPIC: str = "toProcessTopic"
    FROM_PROCESS_TOPIC: str = "fromProcessTopic"


settings = Settings()
