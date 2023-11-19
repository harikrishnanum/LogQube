import json
import random
from datetime import datetime, timedelta
import requests
import sys
from tqdm import tqdm
import uuid


def get_random_log_message():
    messages = [
        "Application started successfully.",
        "Request received and processing initiated.",
        "Task completed successfully.",
        "User logged in.",
        "Disk space running low.",
        "Unusual activity detected.",
        "Invalid input received.",
        "Configuration file not found.",
        "Database connection failed.",
        "File not found.",
        "Unexpected server error.",
        "Authentication failed.",
        "Entering function X.",
        "Value of variable Y: 42.",
        "Debugging information for troubleshooting.",
        "API request received: /api/v1/resource.",
        "Security violation detected.",
        "Unauthorized access attempt.",
        "SSL/TLS handshake failed.",
        "Invalid token received.",
        "User A modified record B.",
        "Configuration settings updated.",
        "Access control list changed.",
        "Critical operation performed.",
        "Database query execution time: 50ms.",
        "Memory usage exceeds threshold.",
        "High CPU usage detected.",
        "Slow response time for request.",
        "Network connection established.",
        "DNS resolution failed.",
        "Packet loss detected.",
        "Firewall rule updated.",
        "External service unreachable.",
        "Dependency version mismatch.",
        "Library X not found.",
        "Failed to connect to third-party API.",
        "Order placed successfully.",
        "Message sent to queue.",
        "Workflow step completed.",
        "Sensor data received."
    ]

    return random.choice(messages)


def get_random_timestamp():
    start_date = datetime.strptime(
        "2023-09-10T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ")
    end_date = datetime.utcnow()

    time_difference = end_date - start_date
    random_days_offset = random.uniform(0, time_difference.days)

    timestamp = (start_date + timedelta(days=random_days_offset)
                 ).replace(microsecond=0).isoformat() + 'Z'
    return timestamp


def get_random_level():
    log_levels = ['info', 'warning', 'error']
    level = random.choice(log_levels)
    return level


def get_id(n=6):
    return str(uuid.uuid4())[:n]


def generate_random_log():

    metadata = {
        'parentResourceId': get_id()
    }

    log = {
        'level': get_random_level(),
        'message': get_random_log_message(),
        'resourceId': get_id(),
        'timestamp': get_random_timestamp(),
        'traceId': get_id(),
        'spanId': get_id(),
        'commit': get_id(),
        'metadata': metadata
    }

    return log


def generate_logs(n=10):
    logs = []
    for _ in tqdm(range(n), desc='Generating Logs', unit='log'):
        logs.append(generate_random_log())
    return logs


def send_logs_to_server(logs):
    url = 'http://localhost:3000/log/ingest'
    headers = {'Content-Type': 'application/json'}
    for log in logs:
        data = json.dumps(log)
        response = requests.post(url, headers=headers, data=data)
        if response.status_code == 200:
            print(response.text)
        else:
            print(
                f'Error ingesting logs. Status code: {response.status_code}\n{response.text}')


if __name__ == "__main__":
    num_logs = 10
    if len(sys.argv) > 1:
        num_logs = int(sys.argv[1])
    logs = generate_logs(num_logs)
    send_logs_to_server(logs)
