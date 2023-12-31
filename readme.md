# Log Ingestor and Query Interface

## Project Overview

This project provides a log ingestor system that efficiently handles vast volumes of log data and offers a simple interface for querying this data using full-text search or specific field filters.

![System architecture](./images/design.jpg)

## Run Instructions

1. Copy the `.env.sample` file to `.env`:

    ```bash
    cp .env.sample .env
    ```

2. Start the project using Docker:

    ```bash
    docker-compose up -d --build
    ```

3. Navigate to the `cli` directory and set up the Python environment:

    ```bash
    cd cli
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```

4. To seed dummy data, run the following command:

    ```bash
    python3 ingest.py
    ```

    Optionally, you can pass the number of logs to generate. For example:

    ```bash
    python3 ingest.py 100  # Generates 100 logs
    ```
    ![Data ingestion](./images/ingest.jpg)
## Searching

- Basic search without any filters:

    ```bash
    python3 search.py
    ```
![Search](./images/search.jpg)
- Find all logs with the level set to "error":

    ```bash
    python3 search.py --filter "level=error"
    ```

- Search for logs with the message containing the term "Failed to connect":

    ```bash
    python3 search.py --query "Failed to connect"
    ```

- Retrieve all logs related to resourceId "server-1234":

    ```bash
    python3 search.py --filter "resourceId=server-1234"
    ```

- Filter logs between the timestamp "2023-09-10T00:00:00Z" and "2023-09-15T23:59:59Z":

    ```bash
    python3 search.py --filter "startDate=2023-09-10T00:00:00Z" "endDate=2023-09-15T23:59:59Z"
    ```

## Video

[![Watch the video](https://img.youtube.com/vi/th5P4kVbNZQ/0.jpg)](https://www.youtube.com/watch?v=th5P4kVbNZQ)

## Identified Issues

- Search for logs with the message containing the term "Failed to connect":
Here thre results are not Exact match - it's fuzzy search
