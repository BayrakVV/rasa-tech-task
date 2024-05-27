import subprocess


def run_command(command):
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    return result.stdout, result.stderr


class TestTaskWarrior:

    def test_add_task(self):
        command = 'task add Test task'
        stdout, stderr = run_command(command)
        assert 'Created task' in stdout, f'Failed to add task: {stderr}'

    def test_list_tasks(self):
        command = 'task list'
        stdout, _ = run_command(command)
        assert 'Test task' in stdout, 'Task not found in the list'

    def test_modify_task(self):
        command = 'task 1 modify priority:H'
        stdout, stderr = run_command(command)
        assert 'Modified 1 task' in stdout, f'Failed to modify task: {stderr}'

    def test_complete_task(self):
        command = 'task 1 done'
        stdout, stderr = run_command(command)
        assert 'Completed task 1' in stdout, f'Failed to complete task: {stderr}'

    def test_delete_task(self):
        command = 'yes | task 1 delete'
        stdout, stderr = run_command(command)
        assert 'Deleted task 1' in stdout, f'Failed to delete task: {stderr}'
