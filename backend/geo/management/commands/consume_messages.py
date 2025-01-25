from django.core.management.base import BaseCommand
from geo.kafka import consume_messages, create_topic, TO_PROCESS_TOPIC, FROM_PROCESS_TOPIC


class Command(BaseCommand):
    help = 'Consume messages from Kafka'

    def handle(self, *args, **options):
        create_topic(TO_PROCESS_TOPIC, 1, 1)
        create_topic(FROM_PROCESS_TOPIC, 1, 1)
        consume_messages()