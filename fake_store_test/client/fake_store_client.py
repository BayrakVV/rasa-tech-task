import requests


class FakeStoreClient:
    base_url = 'https://fakestoreapi.com'

    def get_carts(self, path='', query=''):
        response = requests.get(f'{self.base_url}/carts/{path}?{query}')
        assert response.status_code == 200

        return response.json()
