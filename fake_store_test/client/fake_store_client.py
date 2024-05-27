import logging

import requests

logger = logging.getLogger(__name__)


def handle_error_response(response, method):
    if response.status_code != 200:
        logger.error(f'Failed to {method} carts: {response.text}')
        response.raise_for_status()


class FakeStoreClient:
    def __init__(self, base_url):
        self.url = f'{base_url}/carts'

    def get_carts(self, path='', query=''):
        response = requests.get(f'{self.url}/{path}?{query}')

        # Common error handler
        handle_error_response(response, 'get')

        # Handle specific Fake Store API error case
        if response.text == 'null':
            logger.error(f'Failed to get carts: response={response.text}')

        return response.json()

    def post_carts(self, request_body):
        response = requests.post(
            f'{self.url}',
            request_body)
        handle_error_response(response, 'post')
        return response.json()

    def put_carts(self, cart_id, request_body):
        response = requests.put(
            f'{self.url}/{cart_id}',
            request_body)
        handle_error_response(response, 'put')
        return response.json()

    def delete_carts(self, cart_id):
        response = requests.delete(f'{self.url}/{cart_id}')
        handle_error_response(response, 'delete')
        return response.json()
