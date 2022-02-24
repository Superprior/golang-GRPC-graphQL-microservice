FROM python:3.8.12-slim-buster

ENV APP_HOME=/usr/src/post-service/

RUN mkdir -p $APP_HOME

WORKDIR $APP_HOME

COPY requirements.txt $APP_HOME

RUN pip install --upgrade -r  /usr/src/post-service/requirements.txt

# RUN pip install --no-cache-dir --upgrade -r  /usr/src/comment_service/requirements.txt

COPY . $APP_HOME

# EXPOSE 9003

CMD ["python3", "main.py"]
