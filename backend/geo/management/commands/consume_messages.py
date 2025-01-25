from django.core.management.base import BaseCommand
from geo.kafka.kafka_consumer import KafkaConsumer
from django.conf import settings
from geo.service import save_polygon


class Command(BaseCommand):
    help = 'Consume messages from Kafka'

    def handle(self, *args, **options):
        kafka = KafkaConsumer()
        kafka.create_topic(settings.KAFKA_FROM_PROCESS_TOPIC, 1, 1)
        kafka.create_topic(settings.KAFKA_TO_PROCESS_TOPIC, 1, 1)
        kafka.run(save_polygon)
