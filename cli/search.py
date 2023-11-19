import argparse
import requests
from tabulate import tabulate


def make_api_request(query, filters, page, pagesize):
    url = 'http://localhost:3000/log/search'
    data = {
        'query': query,
        'filters': filters,
        'page': page,
        'pageSize': pagesize
    }

    response = requests.post(url, json=data)

    if response.status_code == 200:
        result = response.json()
        if result['success']:
            pagination = result['pagination']
            page = pagination['page']
            total_hits = pagination['totalHits']
            total_pages = pagination['totalPages']

            print(
                f"Search Results ->  Current Page: {page} ")
            if result['data']:
                table_data = [{k: v for k, v in item.items()}
                              for item in result['data']]
                print(tabulate(table_data, headers="keys", tablefmt="pretty"))
            else:
                print("No results found.")
            print(f"total {total_hits} hits across {total_pages} pages")
        else:
            print(f"Error: {result.get('error', 'Unknown error')}")
    else:
        print(f"Error: {response.status_code}")
        print(response.text)


def main():
    parser = argparse.ArgumentParser(
        description='Make API request to http://localhost:3000/log/search')
    parser.add_argument('--query', type=str, default="", help='Search query')
    parser.add_argument('--filters', nargs='+', default=[],
                        help='Additional filters')
    parser.add_argument('--page', type=int, default=1, help='Current Page')
    parser.add_argument('--pagesize', type=int, default=10, help='Page Size')

    args = parser.parse_args()

    query = args.query
    page = args.page
    pagesize = args.pagesize

    filters_dict = {}
    for filter_arg in args.filters:
        key, value = filter_arg.split('=')
        filters_dict[key] = value

    make_api_request(query, filters_dict, page, pagesize)


if __name__ == "__main__":
    main()
