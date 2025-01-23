from django.core.management.base import BaseCommand
from geo.kafka import consume_messages


class Command(BaseCommand):
    help = 'Consume messages from Kafka'

    def handle(self, *args, **options):
        consume_messages()