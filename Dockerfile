FROM node:10

WORKDIR /app

COPY . /app/

ENV NODE_ENV=development

EXPOSE 80

CMD ['npm', 'run', 'start']
