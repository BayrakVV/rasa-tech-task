import requests


class TestCart:
    def test_get_all_carts(self):
        response = requests.get('https://fakestoreapi.com/carts')
        assert response.status_code == 200
        assert response.json()[0]['id'] == 1
