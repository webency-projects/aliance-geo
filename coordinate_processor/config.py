import os


class Settings:
    KAFKA_BROKER_URL: str = os.environ.get("KAFKA_BOOTSTRAP_SERVERS")
    INPUT_COORDINATES: str = "input_coordinates"
    OUTPUT_COORDINATES: str = "output_coordinates"


settings = Settings()
