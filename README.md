# Rasa Tech Task

## Overview
This repository contains automated tests for interacting with the FakeStore API and the TaskWarrior CLI application.
The project uses pytest for testing, with configurations to run tests in a Docker container and a GitHub Actions CI pipeline

## Getting Started

### Prerequisites
To run tests in a Docker container:
- [Docker Desktop](https://docs.docker.com/get-docker/)

To run tests locally:
- [Python 3.9](https://www.python.org/downloads/) and above
- [TaskWarrior CLI](https://taskwarrior.org/download/)

### Setup for local run
1. Clone the repository and navigate to the repository root:
    ```bash
    $ git clone https://github.com/BayrakVV/rasa-tech-task.git
    $ cd rasa-tech-task
    ```
2. Create and activate a virtual environment:
    ```bash
    $ python -m venv .env
    $ source .env/bin/activate
    ```
3. Install Dependencies:
    ```bash
    $ pip install --upgrade pip
    $ pip install -r requirements.txt
    ```
4. Initialize TaskWarrior CLI. Run the following command to check its version and set up the cofig file:
    ```bash
    $ task version
    
    A configuration file could not be found in ~

    Would you like a sample /home/alice/.taskrc created, so taskwarrior can
    proceed? (yes/no)
    ```
   When prompted, answer "yes" to create the file

## Running Tests

### Locally in the terminal
- Run all tests:
    ```bash
    $ pytest -v
    ```
- Run Fake Store API suit:
    ```bash
    $ pytest -v fake_store_test
    ```
- Run TaskWarrior suit:
    ```bash
    $ pytest -v task_warrior_test
    ```
- Run specific TaskWarrior test:
    ```bash
    $ pytest -v task_warrior_test/tests/test_task_warrior.py::TestTaskWarrior::test_add_task
    ```

### Inside Docker container
1. Build Docker image:
    ```bash
    $ docker build -t rasa-tech-task .
    ```
2. Run tests:
   - All:
       ```bash
       $ docker run -it --rm rasa-test
       ```
   - Fake Store API suit:
       ```bash
       $ docker run -it --rm rasa-test fake_store_test
       ```
   - Specific TaskWarrior test:
       ```bash
       $ docker run -it --rm rasa-test task_warrior_test/tests/test_task_warrior.py::TestTaskWarrior::test_add_task
       ```

## Test Suit Details

### Fake Store API
Located in fake_store_test/tests/test_carts.py, these tests interact with the FakeStore API,
testing all CRUD operations on the shopping cart endpoint

### TaskWarrior CLI
Located in task_warrior_test/tests/test_task_warrior.py, these tests interact with the TaskWarrior CLI,
testing basic task management operations

## Future Improvements
This section describes potential improvements to the project

### Increase test coverage
Since current suits cover only smoke cases, it is necessary to extend them to reach comprehensive regression coverage

Fake Store API:
- Add json schema validation instead of manually checking it
- Cover error cases (let's imagine that the AUT returns proper responses):
    - `GET /carts/<cart_id>`: Invalid cart id
    - `GET /carts`: Invalid `limit` and `sort` parameter
    - `GET /carts`: Invalid `startdate` and `enddate` parameter
    - `GET /carts/user/<user_id>`: Invalid user id
    - `POST /carts`: Invalid body
    - `PUT /carts`: Invalid body
    - `DELETE /carts/<cart_id>`: Invalid cart id

TaskWarrior CLI:
- Firstly cover the commands with the highest priority
- Then do the same for filters and reports
- Next cover the most critical modifications
- At the end add cases for miscellaneous and helpers

### Miscellaneous
- Add a fixture to the API tests for creating carts and cleanup
(Let's (again) imagine that we can create and delete carts)
- Replace python-html-reporter with Allure. Add annotations to tests
- Integrate tools like pylint, flake8, or black to enforce coding standards and improve code quality
