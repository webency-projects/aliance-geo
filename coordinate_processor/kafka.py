from config import settings
from handler import process_message
from confluent_kafka import Producer, Consumer, KafkaError
import json


def kafka_producer():
    conf = {"bootstrap.servers": settings.KAFKA_BROKER_URL}
    producer = Producer(**conf)
    return producer


def kafka_consumer():
    conf = {
        'bootstrap.servers': settings.KAFKA_BROKER_URL,
        'group.id': "coordinate_processor",
        'auto.offset.reset': 'earliest'
    }
    consumer = Consumer(**conf)
    consumer.subscribe([settings.INPUT_COORDINATES])
    return consumer


def consume_messages():
    consumer = kafka_consumer()
    producer = kafka_producer()
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

            response = process_message(msg)
            producer.produce(settings.OUTPUT_COORDINATES, key=msg.key(), value=json.dumps(response))
            print(f"Обработано сообщение: {msg.value()}, отправлен ответ: {response}")
    finally:
        consumer.close()
