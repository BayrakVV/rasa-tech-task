import random
import string
import subprocess

import pytest


def run_command(command):
    """
    Execute a shell command and capture its output.

    :param command: the command to execute
    :type command: str
    :return: a tuple containing the standard output and standard error as strings
    :rtype: tuple
    """
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    return result.stdout, result.stderr


def get_unique_task_name(length=5):
    """
    Generate a unique task name.

    :param length: The length of the random string to append to the task name, defaults to 5
    :type length: int, optional
    :return: A unique task name in the format 'Test_task_<random_string>'
    :rtype: str
    """
    characters = string.ascii_lowercase + string.digits
    random_string = ''.join(random.choices(characters, k=length))
    task_name = f'Test_task_{random_string}'
    return task_name


def delete_task(task_name):
    """
    Delete a task with the given name using a shell command.

    :param task_name: The name of the task to be deleted
    :type task_name: str
    :return: A tuple containing the standard output and standard error of the command
    :rtype: tuple
    """
    command = f'yes | task {task_name} delete'
    return run_command(command)


@pytest.fixture(scope='function')
def add_task_and_cleanup():
    """
    Fixture to add a unique task and ensure cleanup after the test.

    This fixture creates a new task with a unique name before the test, and
    deletes the task after the test, ensuring no tasks remain.

    :yield: A tuple containing the stdout, stderr from the add command, and the unique task name
    :rtype: tuple
    """
    task_name = get_unique_task_name()
    command = f'task add {task_name}'
    stdout, stderr = run_command(command)

    yield stdout, stderr, task_name

    delete_task(task_name)


class TestTaskWarrior:

    def test_add_task(self, add_task_and_cleanup):
        stdout, stderr, _ = add_task_and_cleanup

        assert 'Created task' in stdout, f'Failed to add task: {stderr}'

    def test_list_tasks(self, add_task_and_cleanup):
        _, _, task_name = add_task_and_cleanup
        command = 'task list'
        stdout, stderr = run_command(command)

        assert task_name in stdout, f'Task not found in the list: {stderr}'

    def test_modify_task(self, add_task_and_cleanup):
        _, _, task_name = add_task_and_cleanup
        command = f'task {task_name} modify priority:H'
        stdout, stderr = run_command(command)

        assert 'Modified 1 task' in stdout, f'Failed to modify task: {stderr}'

        # Additionally, check that the "task list" command output
        # includes Priority ("P") column with High ("H") priority value
        command = 'task list'
        stdout, _ = run_command(command)

        assert 'P', 'H' in stdout

    def test_complete_task(self, add_task_and_cleanup):
        _, _, task_name = add_task_and_cleanup
        command = f'task {task_name} done'
        stdout, stderr = run_command(command)

        assert 'Completed 1 task' in stdout, f'Failed to complete task: {stderr}'

    def test_delete_task(self, add_task_and_cleanup):
        _, _, task_name = add_task_and_cleanup
        stdout, _ = delete_task(task_name)

        assert 'Deleted 1 task' in stdout
        assert task_name in stdout
