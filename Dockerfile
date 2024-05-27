FROM python:3.12-alpine

WORKDIR /app

# Install and initialize Taskwarrior AUT
RUN apk add --update task
RUN yes | task version

# Install python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy test code into the container
COPY . .
