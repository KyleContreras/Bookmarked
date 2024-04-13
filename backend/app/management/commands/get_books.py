import os
from dotenv import load_dotenv
import requests
import urllib.parse
from django.core.management.base import BaseCommand
from django.conf import settings
from app.models.book import Book
from .books_for_database import books_for_database
import datetime


# Genres: sci-fi, fantasy, horror, romance, mystery, crime, young adult, dystopian, action and adventure, graphic novel
# To run: python manage.py get_books

load_dotenv()

class Command(BaseCommand):
    help = 'Fetch book data from Google Books API and store in database'

    def handle(self, *args, **options):
        api_key = os.getenv('GOOGLE_BOOKS_API_KEY')

        for book_title, book_author in books_for_database:  # Iterate over the books tuple
            query = f"{book_title}+inauthor:{book_author}"
            encoded_query = urllib.parse.quote(query)

            url = f'https://www.googleapis.com/books/v1/volumes?q={encoded_query}&key={api_key}'

            response = requests.get(url)
            if response.status_code != 200:
                self.stdout.write(self.style.ERROR('Failed to fetch data from Google Books API'))
                continue

            data = response.json()

            for item in data.get('items', []):
                volume_info = item.get('volumeInfo', {})
                if book_author.lower() in [a.lower() for a in volume_info.get('authors', [])]:
                    # Check if publication_date is a valid date or contains only the year
                    publication_date = volume_info.get('publishedDate', '')
                    if publication_date and len(publication_date) <= 4:
                        # If publication_date contains only the year, modify it to include the default day and month
                        publication_date += '-01-01'
                    elif publication_date:
                        # If publication_date is provided but not a valid date format, use the current date
                        try:
                            datetime.datetime.strptime(publication_date, '%Y-%m-%d')
                        except ValueError:
                            publication_date = datetime.date.today().strftime('%Y-%m-%d')

                    book, created = Book.objects.update_or_create(
                        isbn=next((x['identifier'] for x in
                                   volume_info.get('industryIdentifiers', []) if x['type'] == 'ISBN_13'), ''),
                        defaults={
                            'title': volume_info.get('title', ''),
                            'author': ', '.join(volume_info.get('authors', [])),
                            'publication_date': publication_date,
                            'genre': ', '.join(volume_info.get('categories', [])),
                            'synopsis': volume_info.get('description', ''),
                            'cover_image_url': volume_info.get('imageLinks', {}).get('thumbnail', ''),
                            'price': volume_info.get('retailPrice', {}).get('amount', 0.00),
                            'page_count': volume_info.get('pageCount', 0),
                        }
                    )
                    if created:
                        self.stdout.write(self.style.SUCCESS(f'Added new book: {book.title} by {book.author}'))
                    else:
                        self.stdout.write(self.style.SUCCESS(f'Updated book: {book.title} by {book.author}'))
                    break

        self.stdout.write(self.style.SUCCESS('Data fetch and store operation completed successfully.'))
