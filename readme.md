### Run instructions

```
cp .env.sample .env
docker-compose up -d
```

```
cd cli
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

```
python3 ingest.py 
python3 search.py
```
