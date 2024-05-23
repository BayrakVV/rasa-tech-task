import requests


class FakeStoreClient:
    def __init__(self, base_url):
        self.base_url = base_url

    def get_carts(self, path='', query=''):
        response = requests.get(f'{self.base_url}/carts/{path}?{query}')
        assert response.status_code == 200

        return response.json()
