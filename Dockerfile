FROM httpd:2.4

COPY ./codice/ /usr/local/apache2/htdocs/
COPY ./dati  /usr/local/apache2/htdocs/dati