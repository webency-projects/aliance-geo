from confluent_kafka import Producer, Consumer, KafkaError
from config import settings
import json

INPUT_COORDINATES = "input_coordinates"
OUTPUT_COORDINATES = "output_coordinates"


def kafka_producer():
    conf = {"bootstrap.servers": settings.KAFKA_BROKER_URL}
    producer = Producer(**conf)
    return producer


def send_message(data):
    producer = kafka_producer()
    producer.produce(INPUT_COORDINATES, value=json.dumps(data))
    producer.flush()


def kafka_consumer():
    conf = {
        'bootstrap.servers': settings.KAFKA_BROKER_URL,
        'group.id': "coordinate_processor",
        'auto.offset.reset': 'earliest'
    }
    consumer = Consumer(**conf)
    consumer.subscribe([OUTPUT_COORDINATES])
    return consumer


def consume_messages():
    consumer = kafka_consumer()
    try:
        while True:
            msg = consumer.poll(timeout=1.0)
            if msg is None:
                continue
            if msg.error():
                if msg.error().code() == KafkaError._PARTITION_EOF:
                    continue
                else:
                    print(msg.error())
                    break

            message = json.loads(msg.value().decode('utf-8'))
            print(message)

    finally:
        consumer.close()


