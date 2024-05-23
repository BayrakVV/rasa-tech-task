import requests


class FakeStoreClient:
    def __init__(self, base_url):
        self.url = f'{base_url}/carts'

    def get_carts(self, path='', query=''):
        response = requests.get(f'{self.url}/{path}?{query}')
        assert response.status_code == 200
        return response.json()

    def post_carts(self, request_body):
        response = requests.post(
            f'{self.url}',
            request_body)
        assert response.status_code == 200
        return response.json()

    def put_carts(self, cart_id, request_body):
        response = requests.put(
            f'{self.url}/{cart_id}',
            request_body)
        assert response.status_code == 200
        return response.json()

    def delete_carts(self, cart_id):
        response = requests.delete(f'{self.url}/{cart_id}')
        assert response.status_code == 200
        return response.json()
