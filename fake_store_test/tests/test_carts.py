from datetime import date

from fake_store_test.data.test_data import cart_data


class TestGetCarts:

    def test_get_all_carts(self, fake_store_client):
        response = fake_store_client.get_carts()

        assert isinstance(response, list)
        assert isinstance(response[0], dict)
        assert 'id' in response[0]
        assert 'userId' in response[0]
        assert 'date' in response[0]
        assert 'products' in response[0]

    def test_get_single_cart(self, fake_store_client):
        path = 1
        response = fake_store_client.get_carts(path=path)

        assert response['id'] == path
        assert 'userId' in response
        assert 'date' in response
        assert 'products' in response

    def test_limit_carts(self, fake_store_client):
        query = 'limit=3'
        response = fake_store_client.get_carts(query=query)

        assert isinstance(response, list)
        assert len(response) == 3

    def test_sort_carts(self, fake_store_client):
        query = 'sort=desc'
        response = fake_store_client.get_carts(query=query)
        ids = [cart['id'] for cart in response]

        assert ids == sorted(ids, reverse=True)

    def test_get_cart_in_date_range(self, fake_store_client):
        start_date = '2020-01-01'
        end_date = '2020-01-10'

        response = fake_store_client.get_carts(
            query=f'startdate={start_date}&enddate={end_date}')

        start_date = date.fromisoformat(start_date)
        end_date = date.fromisoformat(end_date)

        for cart in response:
            cart_date = date.fromisoformat(cart['date'][:10])
            assert start_date <= cart_date <= end_date

    def test_get_user_cart(self, fake_store_client):
        user_id = 1
        response = fake_store_client.get_carts(path=f'user/{user_id}')

        for cart in response:
            assert cart['userId'] == user_id

    def test_add_new_cart(self, fake_store_client):
        response = fake_store_client.post_carts(cart_data)

        assert 'id' in response
        assert response['userId'] == cart_data['userId']
        assert response['date'] == cart_data['date']

    def test_update_cart(self, fake_store_client):
        cart_id = 7
        response = fake_store_client.put_carts(cart_id, cart_data)

        assert response['id'] == cart_id
        assert response['userId'] == cart_data['userId']
        assert response['date'] == cart_data['date']

    def test_delete_cart(self, fake_store_client):
        cart_id = 7
        response = fake_store_client.delete_carts(cart_id)

        assert response['id'] == cart_id
