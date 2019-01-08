FROM python:2.7
WORKDIR /app
ADD ./backend .
ADD ./frontend/build ./assets
RUN pip --no-cache-dir install -r requirements.txt
EXPOSE 5000
CMD python app.py
