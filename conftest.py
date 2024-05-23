import pytest

from fake_store_test.client.fake_store_client import FakeStoreClient


def pytest_addoption(parser):
    parser.addoption("--url", action="store", default="https://fakestoreapi.com")


@pytest.fixture(scope="session")
def base_url(request):
    return request.config.getoption("--url")


@pytest.fixture()
def fake_store_client(base_url):
    return FakeStoreClient(base_url)
