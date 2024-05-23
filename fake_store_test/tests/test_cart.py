from datetime import date

from fake_store_test.client.fake_store_client import FakeStoreClient

fake_store_client = FakeStoreClient()


class TestCart:

    def test_get_all_carts(self):
        response = fake_store_client.get_carts()

        assert isinstance(response, list)
        assert isinstance(response[0], dict)
        assert 'id' in response[0]
        assert 'userId' in response[0]
        assert 'date' in response[0]
        assert 'products' in response[0]

    def test_get_single_cart(self):
        response = fake_store_client.get_carts(path='1')

        assert response['id'] == 1
        assert response['userId'] == 1

    def test_limit_carts(self):
        response = fake_store_client.get_carts(query='limit=3')

        assert len(response) == 3

    def test_sort_carts(self):
        response = fake_store_client.get_carts(query='sort=desc')
        ids = [cart['id'] for cart in response]

        assert ids == sorted(ids, reverse=True)

    def test_get_cart_in_date_range(self):
        start_date = '2020-01-01'
        end_date = '2020-01-10'

        response = fake_store_client.get_carts(
            query=f'startdate={start_date}&enddate={end_date}')

        start_date = date.fromisoformat(start_date)
        end_date = date.fromisoformat(end_date)

        for cart in response:
            cart_date = date.fromisoformat(cart['date'][:10])
            assert start_date <= cart_date <= end_date

    def test_get_user_cart(self):
        response = fake_store_client.get_carts(path='user/1')

        for cart in response:
            assert cart['userId'] == 1
