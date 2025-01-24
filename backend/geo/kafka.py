from confluent_kafka import Producer, Consumer, KafkaError
from confluent_kafka.admin import AdminClient, NewTopic, NewPartitions
from config import settings
import json
import logging

logger = logging.getLogger(__name__)

TO_PROCESS_TOPIC = "toProcessTopic"
FROM_PROCESS_TOPIC = "fromProcessTopic"

config = {"bootstrap.servers": settings.KAFKA_BROKER_URL}

admin_client = AdminClient(config)


def create_topic(topic_name, num_partitions, replication_factor):
    topic = NewTopic(topic_name, num_partitions=num_partitions, replication_factor=replication_factor)
    response = admin_client.create_topics([topic])
    for topic, f in response.items():
        try:
            f.result()
            logger.info(f"Topic {topic} created")
        except Exception as e:
            logger.error(f"Failed to create topic {topic}: {e}")


def kafka_producer():
    return Producer(**config)


def send_message(data):
    producer = kafka_producer()
    producer.produce(TO_PROCESS_TOPIC, value=json.dumps(data))
    producer.flush()


def kafka_consumer():
    conf = {
        'bootstrap.servers': settings.KAFKA_BROKER_URL,
        'group.id': "coordinate_processor",
        'auto.offset.reset': 'earliest'
    }
    consumer = Consumer(**conf)
    consumer.subscribe([FROM_PROCESS_TOPIC])
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
            logger.info(message)

    finally:
        consumer.close()
