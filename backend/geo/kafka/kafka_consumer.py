import json

from confluent_kafka import Consumer, KafkaError
from confluent_kafka.admin import AdminClient, NewTopic
from django.conf import settings


class KafkaConsumer:

    def __init__(self):
        self.consumer = Consumer({
            'bootstrap.servers': settings.KAFKA_BOOTSTRAP_SERVERS,
            'group.id': settings.KAFKA_GROUP_ID,
            'auto.offset.reset': 'earliest'
        })
        self.consumer.subscribe([settings.KAFKA_FROM_PROCESS_TOPIC])

    def run(self, handler):
        try:
            while True:
                msg = self.consumer.poll(1.0)

                if msg is None:
                    continue
                if msg.error():
                    if msg.error().code() == KafkaError._PARTITION_EOF:
                        continue
                    else:
                        print(f"Error: {msg.error()}")
                        break
                message = json.loads(msg.value().decode('utf-8'))
                handler(message)
        finally:
            self.consumer.close()

    @staticmethod
    def create_topic(topic_name: str, num_partitions: int, replication_factor: int):
        admin_client = AdminClient({"bootstrap.servers": settings.KAFKA_BOOTSTRAP_SERVERS})
        topic = NewTopic(topic_name, num_partitions=num_partitions, replication_factor=replication_factor)
        response = admin_client.create_topics([topic])
        for topic, f in response.items():
            try:
                f.result()
                print(f"Topic {topic} created")
            except Exception as e:
                print(f"Failed to create topic {topic}: {e}")
