import json

from confluent_kafka import Producer
from django.conf import settings


class KafkaProducer:
    config = {"bootstrap.servers": settings.KAFKA_BOOTSTRAP_SERVERS}

    @staticmethod
    def _producer():
        return Producer(**KafkaProducer.config)

    @staticmethod
    def send(message):
        producer = KafkaProducer._producer()
        producer.produce(settings.KAFKA_TO_PROCESS_TOPIC, value=json.dumps(message))
        producer.flush()
